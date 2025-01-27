const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Company = require('../models/Company');

// Register Company
exports.registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if company already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ msg: 'Company already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new company
    const company = new Company({
      name,
      email,
      password: hashedPassword,
      verified: false,  // Initially unverified
    });

    // Save company to DB
    await company.save();

    // Send verification email
    sendVerificationEmail(company, res);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Send verification email
const sendVerificationEmail = (company, res) => {
  const verificationToken = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: 'noreply@example.com',
    to: company.email,
    subject: 'Account Verification',
    text: `Click the link to verify your email: http://your-domain.com/verify-email/${verificationToken}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending verification email:', err);
      return res.status(500).json({ msg: 'Failed to send verification email' });
    }

    res.status(200).json({ msg: 'Registration successful, please check your email to verify your account' });
  });
};

// Verify Email
exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const company = await Company.findById(decoded.id);

    if (!company) {
      return res.status(400).json({ msg: 'Invalid token or company not found' });
    }

    // Mark as verified
    company.verified = true;
    await company.save();

    res.status(200).json({ msg: 'Email verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Company Login
exports.loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ msg: 'Company not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and send JWT
    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('auth-token', token, { httpOnly: true }); // Using cookie for JWT
    res.status(200).json({ msg: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie('auth-token'); // Clears the JWT cookie
  res.status(200).json({ msg: 'Logged out successfully' });
};
