import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../utils/auth';
import Order from './Order';
import '../styles/OrderHistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [orderToCancel, setOrderToCancel] = useState(null);

    const statusOptions = {
        'received': 'התקבלה',
        'packed': 'נארזה',
        'shipped': 'נשלחה',
        'delivered': 'נמסרה',
        'cancelled': 'בוטלה'
    };

    useEffect(() => {
        fetchUserOrders();
    }, []);

    const fetchUserOrders = async () => {
        try {
            const fetchedOrders = await getAllOrders();
            // Sort orders by date (newest first)
            const sortedOrders = fetchedOrders.sort((a, b) => 
                new Date(b.createdAt) - new Date(a.createdAt)
            );
            setOrders(sortedOrders);
            setLoading(false);
        } catch (err) {
            setError('שגיאה בטעינת ההזמנות');
            setLoading(false);
        }
    };

    const handleCancelClick = (orderId) => {
        setOrderToCancel(orderId);
        setShowConfirmation(true);
    };

    const handleConfirmCancel = async () => {
        try {
            await updateOrderStatus(orderToCancel, 'cancelled');
            setOrders(orders.map(order => 
                order._id === orderToCancel 
                    ? { ...order, status: 'cancelled' }
                    : order
            ));
            setShowConfirmation(false);
            setOrderToCancel(null);
        } catch (err) {
            setError('שגיאה בביטול ההזמנה');
        }
    };

    const handleCancelConfirmation = () => {
        setShowConfirmation(false);
        setOrderToCancel(null);
    };

    if (loading) return <div className="loading">טוען...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="order-history" dir="rtl">
            <div className="page-header">
                <h2>היסטוריית הזמנות</h2>
            </div>
            
            <div className="orders-list">
                {orders.length === 0 ? (
                    <div className="no-orders">לא נמצאו הזמנות</div>
                ) : (
                    orders.map(order => (
                        <Order
                            key={order._id}
                            order={order}
                            statusOptions={statusOptions}
                            showCancelButton={order.status === 'received'}
                            onCancelOrder={() => handleCancelClick(order._id)}
                        />
                    ))
                )}
            </div>

            {/* Confirmation Dialog */}
            {showConfirmation && (
                <div className="confirmation-overlay">
                    <div className="confirmation-dialog">
                        <h3>אישור ביטול הזמנה</h3>
                        <p>האם אתה בטוח שברצונך לבטל את ההזמנה?</p>
                        <p>לא ניתן לבטל פעולה זו לאחר אישור.</p>
                        <div className="confirmation-buttons">
                            <button 
                                className="btn btn-danger"
                                onClick={handleConfirmCancel}
                            >
                                כן, בטל הזמנה
                            </button>
                            <button 
                                className="btn btn-secondary"
                                onClick={handleCancelConfirmation}
                            >
                                לא, השאר הזמנה
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderHistory; 