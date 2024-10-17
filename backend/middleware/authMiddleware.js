const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    // Check if token is provided
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ensure decoded object contains the expected user ID
        if (!decoded.id) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Find user by ID from the decoded token
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach user to request object
        req.user = user;
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        // Handle token verification errors
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
