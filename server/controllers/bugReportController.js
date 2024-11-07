const BugReport = require('../models/BugReport');

exports.createBugReport = async (req, res) => {
    try {
        const { title, description, priority, reporterInfo } = req.body;
        
        const bugReport = new BugReport({
            title,
            description,
            priority: priority || 'low',
            reporterInfo: {
                name: reporterInfo?.name || 'אנונימי',
                email: reporterInfo?.email || ''
            },
            ...(req.body.userId && { reportedBy: req.body.userId })
        });

        await bugReport.save();
        res.status(201).json({ success: true, bugReport });
    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};

exports.getAllBugReports = async (req, res) => {
    try {
        const bugReports = await BugReport.find()
            .populate('reportedBy', 'username firstname lastname')
            .sort({ createdAt: -1 });
        res.json(bugReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBugReport = async (req, res) => {
    try {
        const { status, priority, adminNotes } = req.body;
        const bugReport = await BugReport.findByIdAndUpdate(
            req.params.id,
            { 
                ...(status && { status }),
                ...(priority && { priority }),
                ...(adminNotes !== undefined && { adminNotes }),
                updatedAt: Date.now()
            },
            { new: true }
        );
        
        if (!bugReport) {
            return res.status(404).json({ message: 'Bug report not found' });
        }
        
        res.json(bugReport);
    } catch (error) {
        console.error('Error updating bug report:', error);
        res.status(400).json({ message: error.message });
    }
};

exports.getUserBugReports = async (req, res) => {
    try {
        const bugReports = await BugReport.find({ reportedBy: req.params.userId })
            .sort({ createdAt: -1 });
        res.json(bugReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 