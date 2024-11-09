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
    const [fontFamily, setFontFamily] = useState('Calibri, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif');
    const [tempChanges, setTempChanges] = useState({});
    const [stats, setStats] = useState({
        total: 0,
        openBugs: 0
    });

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
    }, [selectedStatus, selectedPriority, bugs, tempChanges]);

    useEffect(() => {
        // Detect if running on macOS
        const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
        if (isMac) {
            setFontFamily('Gisha, -apple-system, system-ui, sans-serif');
        }
    }, []);

    useEffect(() => {
        setStats({
            total: bugs.length,
            openBugs: bugs.filter(bug => bug.status === 'new').length
        });
    }, [bugs]);

    const fetchBugs = async () => {
        try {
            const response = await axiosInstanse.get(API_ROUTES.BUGS.GET_ALL, {
                withCredentials: true
            });
            setBugs(response.data);
            setFilteredBugs(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching bugs:', err);
            setError('שגיאה בטעינת הדיווחים');
            setLoading(false);
        }
    };

    const filterBugs = () => {
        let filtered = [...bugs];
        
        if (selectedStatus !== 'all') {
            filtered = filtered.filter(bug => {
                const currentStatus = tempChanges[bug._id]?.status || bug.status;
                return currentStatus === selectedStatus;
            });
        }
        
        if (selectedPriority !== 'all') {
            filtered = filtered.filter(bug => {
                const currentPriority = tempChanges[bug._id]?.priority || bug.priority;
                return currentPriority === selectedPriority;
            });
        }

        setFilteredBugs(filtered);
    };

    const handleTempChange = (bugId, updates) => {
        setTempChanges(prev => ({
            ...prev,
            [bugId]: {
                ...(prev[bugId] || {}),
                ...updates
            }
        }));
    };

    const handleUpdate = async (bugId) => {
        if (!tempChanges[bugId]) return;

        try {
            const response = await axiosInstanse.patch(
                API_ROUTES.BUGS.UPDATE(bugId),
                tempChanges[bugId],
                { withCredentials: true }
            );
            
            setBugs(bugs.map(bug => 
                bug._id === bugId 
                    ? { ...bug, ...response.data }
                    : bug
            ));

            // ניקוי השינויים הזמניים לאחר עדכון מוצלח
            setTempChanges(prev => {
                const newChanges = { ...prev };
                delete newChanges[bugId];
                return newChanges;
            });
        } catch (err) {
            console.error('Error updating bug:', err);
            setError('שגיאה בעדכון הדיווח');
        }
    };

    if (loading) return <div className="loading">טוען...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="bug-management" style={{ fontFamily }}>
            <div className="page-header">
                <h2>ניהול דיווחי באגים</h2>
                <div className="bug-stats">
                    <div className="stat-box">
                        <span className="stat-label">סה"כ דיווחים</span>
                        <span className="stat-value">{stats.total}</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">דיווחים פתוחים</span>
                        <span className="stat-value">{stats.openBugs}</span>
                    </div>
                </div>
            </div>

            <div className="filter-section">
                <div className="filter-group">
                <select
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                    >
                        <option value="all">הכל</option>
                        {Object.entries(priorityOptions).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                    <label>:סנן לפי דחיפות</label>
                </div>

                <div className="filter-group">
                    <select 
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="all">הכל</option>
                        {Object.entries(statusOptions).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                    <label>:סנן לפי סטטוס</label>
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
                                <div className="bug-status-controls">
                                    <div className="control-group">
                                        <label>:סטטוס</label>
                                        <select
                                            value={(tempChanges[bug._id]?.status || bug.status)}
                                            onChange={(e) => handleTempChange(bug._id, { status: e.target.value })}
                                            className={`status-${tempChanges[bug._id]?.status || bug.status}`}
                                        >
                                            {Object.entries(statusOptions).map(([value, label]) => (
                                                <option key={value} value={value}>{label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="control-group">
                                        <label>:דחיפות</label>
                                        <select
                                            value={(tempChanges[bug._id]?.priority || bug.priority)}
                                            onChange={(e) => handleTempChange(bug._id, { priority: e.target.value })}
                                            className={`priority-${tempChanges[bug._id]?.priority || bug.priority}`}
                                        >
                                            {Object.entries(priorityOptions).map(([value, label]) => (
                                                <option key={value} value={value}>{label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
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
                                <textarea
                                    placeholder="הערות מנהל"
                                    value={tempChanges[bug._id]?.adminNotes ?? bug.adminNotes ?? ''}
                                    onChange={(e) => handleTempChange(bug._id, { adminNotes: e.target.value })}
                                />
                                {tempChanges[bug._id] && (
                                    <button 
                                        className="update-button"
                                        onClick={() => handleUpdate(bug._id)}
                                    >
                                        עדכן
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BugManagement; 