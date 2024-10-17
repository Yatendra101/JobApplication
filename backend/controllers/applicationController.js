const Application = require('../models/Application');
const Remark = require('../models/Remark');

exports.submitApplication = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(403).json({ message: 'User not authenticated' });
        }

        // Create the application
        const application = new Application({
            userId: req.user.id,
            cv: req.file.path, // Ensure req.file is defined
            details: req.body.details,
            name: req.body.name,
            qualification: req.body.qualification,
            age: req.body.age,
            gender: req.body.gender,
            jobRole: req.body.jobRole,
        });

        await application.save();
        res.status(201).json(application);
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id).populate('userId');
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json(application);
    } catch (error) {
        console.error('Error fetching application:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.reviewApplication = async (req, res) => {
    try {
        const { status, remark } = req.body;
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.status = status;
        application.updatedAt = Date.now();
        await application.save();

        if (remark) {
            const newRemark = new Remark({
                applicationId: application._id,
                userId: req.user.id,
                remark
            });
            await newRemark.save();
        }

        res.json(application);
    } catch (error) {
        console.error('Error reviewing application:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getUserApplications = async (req, res) => {
    try {
        const applications = await Application.find({ userId: req.params.userId });
        res.json(applications);
    } catch (error) {
        console.error('Error fetching user applications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getRemarksByApplicationId = async (req, res) => {
    try {
        const remarks = await Remark.find({ applicationId: req.params.applicationId }).populate('userId');
        res.json(remarks);
    } catch (error) {
        console.error('Error fetching remarks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
