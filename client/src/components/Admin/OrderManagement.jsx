import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../../utils/auth';
import Order from '../Order';
import '../../styles/OrderManagement.css';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedDays, setSelectedDays] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const statusOptions = {
        'received': 'התקבלה',
        'packed': 'נארזה',
        'shipped': 'נשלחה',
        'delivered': 'נמסרה'
    };

    const daysOptions = [
        { value: 1, label: 'יום אחרון' },
        { value: 2, label: 'יומיים אחרונים' },
        { value: 7, label: 'שבוע אחרון' },
        { value: 30, label: 'חודש אחרון' },
        { value: 0, label: 'הכל' }
    ];

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        filterOrders();
    }, [selectedStatus, selectedDays, orders]);

    const fetchOrders = async () => {
        try {
            const fetchedOrders = await getAllOrders();
            setOrders(fetchedOrders);
            setLoading(false);
        } catch (err) {
            setError('שגיאה בטעינת ההזמנות');
            setLoading(false);
        }
    };

    const filterOrders = () => {
        let filtered = [...orders];

        if (selectedStatus !== 'all') {
            filtered = filtered.filter(order => order.status === selectedStatus);
        }

        if (selectedDays > 0) {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - selectedDays);
            filtered = filtered.filter(order => new Date(order.createdAt) >= cutoffDate);
        }

        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setFilteredOrders(filtered);
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            setOrders(orders.map(order => 
                order._id === orderId 
                    ? { ...order, status: newStatus }
                    : order
            ));
        } catch (err) {
            setError('שגיאה בעדכון סטטוס ההזמנה');
        }
    };

    const renderStatusUpdateButton = (order) => {
        return (
            <select 
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="status-dropdown"
            >
                {Object.entries(statusOptions).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </select>
        );
    };

    if (loading) return <div className="loading">טוען...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="order-management" dir="rtl">
            <div className="page-header">
                <h2>ניהול הזמנות</h2>
                <div className="order-stats">
                    <div className="stat-box">
                        <span className="stat-label">סה"כ הזמנות</span>
                        <span className="stat-value">{filteredOrders.length}</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">ממתינות לטיפול</span>
                        <span className="stat-value">
                            {filteredOrders.filter(order => 
                                order.status === 'received' || order.status === 'packed').length}
                        </span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">
                            {selectedDays === 0 ? 'סה"כ מכירות' : `סה"כ מכירות ${daysOptions.find(opt => opt.value === selectedDays)?.label}`}
                        </span>
                        <span className="stat-value">
                            ₪{filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0).toLocaleString()}
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
                    <label>הצג הזמנות מ:</label>
                    <select
                        value={selectedDays}
                        onChange={(e) => setSelectedDays(Number(e.target.value))}
                    >
                        {daysOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="orders-list">
                {filteredOrders.length === 0 ? (
                    <div className="no-orders">לא נמצאו הזמנות</div>
                ) : (
                    filteredOrders.map(order => (
                        <div key={order._id} className="order-item">
                            <div className="order-status-dropdown">
                                {renderStatusUpdateButton(order)} {/* התפריט הנפתח לעדכון סטטוס */}
                            </div>
                            <Order
                                order={order}
                                onStatusChange={handleStatusChange}
                                statusOptions={statusOptions}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderManagement;
