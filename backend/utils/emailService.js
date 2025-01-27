const nodemailer = require('nodemailer');

const sendJobAlertEmail = (candidateEmail, jobDetails) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: candidateEmail,
    subject: `New Job Alert: ${jobDetails.jobTitle}`,
    html: `
      <h3>${jobDetails.jobTitle}</h3>
      <p>${jobDetails.jobDescription}</p>
      <p>Experience Level: ${jobDetails.experienceLevel}</p>
      <p>End Date: ${jobDetails.endDate}</p>
      <p>Best regards,</p>
      <p>Your Company</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendJobAlertEmail;
