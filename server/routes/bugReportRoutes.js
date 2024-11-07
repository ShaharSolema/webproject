const express = require('express');
const router = express.Router();
const bugReportController = require('../controllers/bugReportController');
const authenticate = require('../Middleware/authMiddleware');
const isManager = require('../Middleware/isManager');

// Create new bug report (public access)
router.post('/create', bugReportController.createBugReport);

// Admin routes (protected)
router.get('/all', authenticate, isManager, bugReportController.getAllBugReports);
router.patch('/:id/status', authenticate, isManager, bugReportController.updateBugStatus);
router.get('/user/:userId', authenticate, bugReportController.getUserBugReports);

module.exports = router; 