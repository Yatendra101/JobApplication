const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cv: { type: String, required: true }, // Path to the CV file
    details: { type: String, required: true },
    name: { type: String, required: true },
    qualification: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    jobRole: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Under Review', 'Approved', 'Rejected'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
