const express = require('express');
const router = express.Router();
const bugReportController = require('../controllers/bugReportController');
const authenticate = require('../Middleware/authMiddleware');
const isManager = require('../Middleware/isManager');

// Public route
router.post('/create', bugReportController.createBugReport);

// Protected routes (admin only)
router.get('/all', authenticate, isManager, bugReportController.getAllBugReports);
router.patch('/:id', authenticate, isManager, bugReportController.updateBugReport);
router.get('/user/:userId', authenticate, bugReportController.getUserBugReports);

module.exports = router; 