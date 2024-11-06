import React from 'react';
import '../styles/Order.css';

const Order = ({ order, onStatusChange, statusOptions, showCancelButton, onCancelOrder }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('he-IL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <div className="order-card">
            <div className="order-header">
                <div className="order-title">
                    <h3>הזמנה #{order.purchaseNumber}</h3>
                    <span className="order-date">{formatDate(order.createdAt)}</span>
                </div>
                <div className="order-status">
                    {showCancelButton ? (
                        <button 
                            onClick={onCancelOrder}
                            className="btn btn-danger btn-sm"
                        >
                            ביטול הזמנה
                        </button>
                    ) : (
                        <span className={`status-${order.status}`}>
                            {statusOptions[order.status]}
                        </span>
                    )}
                </div>
            </div>

            <div className="order-details">
                <div className="customer-info">
                    <h4>פרטי לקוח</h4>
                    <p><strong>שם מלא:</strong> {order.user.firstname} {order.user.lastname}</p>
                    <p><strong>טלפון:</strong> {order.user.telephone}</p>
                    <p><strong>אימייל:</strong> {order.user.email}</p>
                </div>

                {order.shippingAddress && (
                    <div className="shipping-info">
                        <h4>פרטי משלוח</h4>
                        <p><strong>כתובת:</strong> {order.shippingAddress.street}</p>
                        <p><strong>עיר:</strong> {order.shippingAddress.city}</p>
                        <p><strong>מיקוד:</strong> {order.shippingAddress.zipCode}</p>
                    </div>
                )}

                <div className="order-items">
                    <h4>פריטים בהזמנה</h4>
                    <table className="items-table">
                        <thead>
                            <tr>
                                <th>מוצר</th>
                                <th>כמות</th>
                                <th>מחיר ליחידה</th>
                                <th>סה"כ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.productId.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>₪{item.price.toLocaleString()}</td>
                                    <td>₪{(item.price * item.quantity).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="order-footer">
                <div className="order-total">
                    <span>סה"כ לתשלום: </span>
                    <span className="total-amount">₪{order.totalAmount.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
};

export default Order; 