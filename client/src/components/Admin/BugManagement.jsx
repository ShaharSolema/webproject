import React, { useState, useEffect } from 'react';
import axiosInstanse from '../../utils/axiosConfig';
import { API_ROUTES } from '../../utils/apiRoutes';
import '../../styles/BugManagement.css';

const BugManagement = () => {
    const [bugs, setBugs] = useState([]);
    const [filteredBugs, setFilteredBugs] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedPriority, setSelectedPriority] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const statusOptions = {
        'new': 'חדש',
        'in-progress': 'בטיפול',
        'resolved': 'טופל',
        'closed': 'סגור'
    };

    const priorityOptions = {
        'low': 'נמוכה',
        'medium': 'בינונית',
        'high': 'גבוהה',
        'critical': 'קריטית'
    };

    useEffect(() => {
        fetchBugs();
    }, []);

    useEffect(() => {
        filterBugs();
    }, [selectedStatus, selectedPriority, bugs]);

    const fetchBugs = async () => {
        try {
            const response = await axiosInstanse.get(API_ROUTES.BUGS.GET_ALL);
            setBugs(response.data);
            setLoading(false);
        } catch (err) {
            setError('שגיאה בטעינת הדיווחים');
            setLoading(false);
        }
    };

    const filterBugs = () => {
        let filtered = [...bugs];
        
        if (selectedStatus !== 'all') {
            filtered = filtered.filter(bug => bug.status === selectedStatus);
        }
        
        if (selectedPriority !== 'all') {
            filtered = filtered.filter(bug => bug.priority === selectedPriority);
        }

        setFilteredBugs(filtered);
    };

    const handleStatusUpdate = async (bugId, newStatus, adminNotes) => {
        try {
            await axiosInstanse.patch(API_ROUTES.BUGS.UPDATE_STATUS(bugId), {
                status: newStatus,
                adminNotes
            });
            
            setBugs(bugs.map(bug => 
                bug._id === bugId 
                    ? { ...bug, status: newStatus, adminNotes }
                    : bug
            ));
        } catch (err) {
            setError('שגיאה בעדכון הסטטוס');
        }
    };

    if (loading) return <div className="loading">טוען...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="bug-management">
            <div className="page-header">
                <h2>ניהול דיווחי באגים</h2>
                <div className="bug-stats">
                    <div className="stat-box">
                        <span className="stat-label">סה"כ דיווחים</span>
                        <span className="stat-value">{bugs.length}</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">דיווחים פתוחים</span>
                        <span className="stat-value">
                            {bugs.filter(bug => bug.status === 'new').length}
                        </span>
                    </div>
                </div>
            </div>

            <div className="filter-section">
                <div className="filter-group">
                    <label>סנן לפי סטטוס:</label>
                    <select 
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="all">הכל</option>
                        {Object.entries(statusOptions).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label>סנן לפי דחיפות:</label>
                    <select
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                    >
                        <option value="all">הכל</option>
                        {Object.entries(priorityOptions).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bugs-list">
                {filteredBugs.length === 0 ? (
                    <div className="no-bugs">לא נמצאו דיווחים</div>
                ) : (
                    filteredBugs.map(bug => (
                        <div key={bug._id} className={`bug-item priority-${bug.priority}`}>
                            <div className="bug-header">
                                <h3>{bug.title}</h3>
                                <span className={`status-badge status-${bug.status}`}>
                                    {statusOptions[bug.status]}
                                </span>
                            </div>
                            
                            <div className="bug-details">
                                <p className="description">{bug.description}</p>
                                <div className="meta-info">
                                    <span>דווח ע"י: {
                                        bug.reportedBy ? 
                                            bug.reportedBy.username : 
                                            (bug.reporterInfo?.name || 'אנונימי')
                                    }</span>
                                    {bug.reporterInfo?.email && (
                                        <span>אימייל: {bug.reporterInfo.email}</span>
                                    )}
                                    <span>תאריך: {new Date(bug.createdAt).toLocaleDateString('he-IL')}</span>
                                </div>
                            </div>

                            <div className="bug-actions">
                                <select
                                    value={bug.status}
                                    onChange={(e) => handleStatusUpdate(bug._id, e.target.value, bug.adminNotes)}
                                >
                                    {Object.entries(statusOptions).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                                
                                <textarea
                                    placeholder="הערות מנהל"
                                    value={bug.adminNotes || ''}
                                    onChange={(e) => handleStatusUpdate(bug._id, bug.status, e.target.value)}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BugManagement; 