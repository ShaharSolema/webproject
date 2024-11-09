import React, { useState } from 'react';
import '../styles/Order.css';

const Order = ({ order, onStatusChange, statusOptions, showCancelButton, onCancelOrder }) => {
    const [isExpanded, setIsExpanded] = useState(false);

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
            <div className="order-summary" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="order-basic-info">
                    <h3>הזמנה #{order.purchaseNumber}</h3>
                    <span className="order-date">{formatDate(order.createdAt)}</span>
                </div>
                <div className="order-preview-details">
                    <span className="total-amount">₪{order.totalAmount.toLocaleString()}</span>
                    <span className={`status-${order.status}`}>
                        {statusOptions[order.status]}
                    </span>
                    <span className="expand-icon">{isExpanded ? 'הסתר פרטים ▼' : ' לחץ לפרטים נוספים ▶'}</span>
                </div>
            </div>

            {isExpanded && (
                <div className="order-details">
                    <div className="customer-info">
                        <h4>פרטי לקוח</h4>
                        {order.userDetails ? (
                            <>
                                <p><strong>שם מלא:</strong> {order.userDetails.firstname} {order.userDetails.lastname}</p>
                                <p><strong>טלפון:</strong> {order.userDetails.telephone}</p>
                                <p><strong>אימייל:</strong> {order.userDetails.email}</p>
                                {order.userDetails.isDeleted && (
                                    <p className="deleted-user-note">
                                        <em>* משתמש זה נמחק מהמערכת בתאריך {new Intl.DateTimeFormat('he-IL').format(new Date(order.userDetails.deletedAt))}</em>
                                    </p>
                                )}
                            </>
                        ) : (
                            <p>פרטי המשתמש אינם זמינים</p>
                        )}
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
            )}

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