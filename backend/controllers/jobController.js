// backend/controllers/jobController.js
const Job = require('../models/Job');

// Create a new job
exports.createJob = async (req, res) => {
    try {
        const newJob = new Job({
            title: req.body.title,
            description: req.body.description,
            company: req.body.company,
            location: req.body.location,
            postedBy: req.body.postedBy,
        });

        const job = await newJob.save();
        res.status(201).json(job);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong while creating the job' });
    }
};

// Get all jobs
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve jobs' });
    }
};

// Get a single job by ID
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve the job' });
    }
};

// Update a job by ID
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update the job' });
    }
};

// Delete a job by ID
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete the job' });
    }
};
