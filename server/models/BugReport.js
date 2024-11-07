const mongoose = require('mongoose');
const validator = require('validator');

const bugReportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
        validate: {
            validator: function(v) {
                // Allow Hebrew and English letters, numbers, and basic punctuation
                return /^[\u0590-\u05FFa-zA-Z0-9\s.,!?()-]{3,100}$/.test(v);
            },
            message: 'Title contains invalid characters or length'
        }
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 1000,
        validate: {
            validator: function(v) {
                // Allow Hebrew and English letters, numbers, and basic punctuation
                return /^[\u0590-\u05FFa-zA-Z0-9\s.,!?()-]{10,1000}$/.test(v);
            },
            message: 'Description contains invalid characters or length'
        }
    },
    status: {
        type: String,
        enum: ['new', 'in-progress', 'resolved', 'closed'],
        default: 'new'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'low'
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    reporterInfo: {
        name: {
            type: String,
            trim: true,
            maxlength: 100,
            default: 'אנונימי'
        },
        email: {
            type: String,
            trim: true,
            maxlength: 100,
            validate: {
                validator: function(v) {
                    return !v || validator.isEmail(v); // Optional but must be valid if provided
                },
                message: 'Invalid email format'
            }
        }
    },
    adminNotes: {
        type: String,
        maxlength: 500,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
bugReportSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const BugReport = mongoose.model('BugReport', bugReportSchema);
module.exports = BugReport; 