import React, { useState } from 'react';
import '../styles/Order.css';

const Order = ({ order, statusOptions, showCancelButton, onCancelOrder }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="order-card">
            <div className="order-header" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="order-basic-info">
                    <span>מספר הזמנה: {order.purchaseNumber}</span>
                    <span>סטטוס: {statusOptions[order.status]}</span>
                    <span>תאריך: {new Date(order.createdAt).toLocaleDateString('he-IL')}</span>
                    <span>סה"כ: ₪{order.totalAmount}</span>
                </div>
                <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>▼</span>
            </div>

            {isExpanded && (
                <div className="order-details">
                    <div className="customer-info">
                        <h4>פרטי לקוח</h4>
                        {order.userDetails && (
                            <div className="user-details">
                                <p><strong>שם מלא:</strong> {order.userDetails.firstname} {order.userDetails.lastname}</p>
                                <p><strong>טלפון:</strong> {order.userDetails.telephone}</p>
                                <p><strong>אימייל:</strong> {order.userDetails.email}</p>
                                {order.userDetails.isDeleted && (
                                    <p className="deleted-user-note">
                                        <em>* משתמש זה נמחק מהמערכת בתאריך {new Intl.DateTimeFormat('he-IL').format(new Date(order.userDetails.deletedAt))}</em>
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="order-items">
                        <h4>פרטי ההזמנה</h4>
                        <table className="order-items-table">
                            <thead>
                                <tr>
                                    <th>תמונה</th>
                                    <th>שם המוצר</th>
                                    <th>מחיר ליחידה</th>
                                    <th>כמות</th>
                                    <th>סה"כ</th>
                                    <th>סטטוס</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item, index) => (
                                    <tr key={index} className={item.productDetails.isDeleted ? 'deleted-product' : ''}>
                                        <td>
                                            <img 
                                                src={item.productDetails.imageUrl} 
                                                alt={item.productDetails.name} 
                                                className="product-image"
                                            />
                                        </td>
                                        <td>
                                            {item.productDetails.name}
                                            {item.productDetails.isDeleted && (
                                                <div className="deleted-product-note">
                                                    <em>מוצר לא זמין</em>
                                                </div>
                                            )}
                                        </td>
                                        <td>₪{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>₪{item.price * item.quantity}</td>
                                        <td>
                                            {item.productDetails.isDeleted ? (
                                                <span className="deleted-status">
                                                    נמחק מהמערכת
                                                    <br />
                                                    <small>
                                                        {new Date(item.productDetails.deletedAt).toLocaleDateString('he-IL')}
                                                    </small>
                                                </span>
                                            ) : (
                                                <span className="active-status">פעיל</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="4" className="text-left"><strong>משלוח:</strong></td>
                                    <td colSpan="2">₪{order.shippingCost}</td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="text-left"><strong>סה"כ כולל משלוח:</strong></td>
                                    <td colSpan="2">₪{order.totalAmount}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {showCancelButton && (
                        <div className="order-actions">
                            <button 
                                className="cancel-order-btn" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onCancelOrder();
                                }}
                            >
                                בטל הזמנה
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Order; 