const express = require('express');
const { 
    submitApplication, 
    getApplicationById, 
    reviewApplication, 
    getUserApplications, 
    getRemarksByApplicationId 
} = require('../controllers/applicationController');
const { authenticate } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Ensure to set up your uploads directory

const router = express.Router();

// Apply the middleware for authentication where needed
router.post('/', authenticate, upload.single('cv'), submitApplication);
router.get('/:id', authenticate, getApplicationById);
router.put('/:id/review', authenticate, reviewApplication);
router.get('/user/:userId', authenticate, getUserApplications);
router.get('/:applicationId/remarks', authenticate, getRemarksByApplicationId);

module.exports = router;
