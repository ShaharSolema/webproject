import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/OrderSuccess.css';

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { purchaseNumber } = location.state || {};

    useEffect(() => {
        // If no purchase number is provided, redirect to home
        if (!purchaseNumber) {
            navigate('/');
        }
    }, [purchaseNumber, navigate]);

    if (!purchaseNumber) {
        return null; // Don't render anything while redirecting
    }

    return (
        <div className="order-success-container">
            <div className="order-success-content">
                <div className="success-icon">✓</div>
                <h1>תודה על הזמנתך!</h1>
                <div className="order-number">
                    <p>מספר ההזמנה שלך:</p>
                    <strong>{purchaseNumber}</strong>
                </div>
                <p>אישור על ההזמנה נשלח לכתובת המייל שלך</p>
                <button 
                    onClick={() => navigate('/')} 
                    className="back-to-shop-btn"
                >
                    חזרה לחנות
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess; 