const mongoose = require('mongoose');

const remarkSchema = new mongoose.Schema({
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    remark: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Remark', remarkSchema);
