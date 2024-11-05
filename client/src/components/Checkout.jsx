import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 };
    const [shippingMethod, setShippingMethod] = useState('pickup');

    const getShippingCost = () => {
        switch(shippingMethod) {
            case 'pickup':
                return 0;
            case 'israel-post':
                return 20;
            case 'courier':
                return 50;
            default:
                return 0;
        }
    };

    const shippingCost = getShippingCost();
    const finalTotal = totalAmount + shippingCost;

    const [formData, setFormData] = useState({
        shipping: {
            fullName: '',
            street: '',
            city: '',
            zipCode: '',
            phone: ''
        },
        payment: {
            cardHolder: '',
            cardNumber: '',
            expiry: '',
            cvv: ''
        }
    });

    if (!cartItems.length) {
        navigate('/');
        return null;
    }

    const handleInputChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        try {
            // Create order object
            const orderData = {
                items: cartItems,
                totalAmount: finalTotal,
                shippingAddress: formData.shipping,
                paymentDetails: {
                    ...formData.payment,
                    cardNumber: formData.payment.cardNumber.slice(-4) // Only store last 4 digits
                },
                status: 'received',
                createdAt: new Date()
            };

            // Send order to backend
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                alert('ההזמנה התקבלה בהצלחה!');
                navigate('/');
            } else {
                throw new Error('Failed to create order');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('אירעה שגיאה בביצוע ההזמנה');
        }
    };

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <h2>סיכום הזמנה</h2>
                
                <div className="order-summary">
                    <h3>פריטים בהזמנה</h3>
                    <div className="order-items-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>מוצר</th>
                                    <th>פרטים</th>
                                    <th>כמות</th>
                                    <th>מחיר</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.productId._id}>
                                        <td>
                                            <img 
                                                src={item.productId.imageUrl} 
                                                alt={item.productId.name}
                                                className="product-thumbnail"
                                            />
                                        </td>
                                        <td>{item.productId.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>₪{(item.productId.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="order-totals">
                        <div className="subtotal">
                            <span>סכום ביניים:</span>
                            <span>₪{totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="shipping-cost">
                            <span>דמי משלוח:</span>
                            <span>₪{shippingCost.toFixed(2)}</span>
                        </div>
                        <div className="final-total">
                            <strong>סה"כ לתשלום:</strong>
                            <strong>₪{finalTotal.toFixed(2)}</strong>
                        </div>
                    </div>
                </div>

                <div className="form-section shipping-method">
                    <h3>בחירת שיטת משלוח</h3>
                    <div className="shipping-options">
                        <label className="shipping-option">
                            <input
                                type="radio"
                                name="shipping"
                                value="pickup"
                                checked={shippingMethod === 'pickup'}
                                onChange={(e) => setShippingMethod(e.target.value)}
                            />
                            <span className="option-details">
                                <span className="option-name">איסוף עצמי</span>
                                <span className="option-price">חינם</span>
                            </span>
                        </label>
                        
                        <label className="shipping-option">
                            <input
                                type="radio"
                                name="shipping"
                                value="israel-post"
                                checked={shippingMethod === 'israel-post'}
                                onChange={(e) => setShippingMethod(e.target.value)}
                            />
                            <span className="option-details">
                                <span className="option-name">משלוח בדואר ישראל</span>
                                <span className="option-price">₪20.00</span>
                            </span>
                        </label>
                        
                        <label className="shipping-option">
                            <input
                                type="radio"
                                name="shipping"
                                value="courier"
                                checked={shippingMethod === 'courier'}
                                onChange={(e) => setShippingMethod(e.target.value)}
                            />
                            <span className="option-details">
                                <span className="option-name">משלוח עם שליח</span>
                                <span className="option-price">₪50.00</span>
                            </span>
                        </label>
                    </div>
                </div>

                {shippingMethod !== 'pickup' && (
                    <div className="form-section shipping-details">
                        <h3>פרטי משלוח</h3>
                        <div className="form-grid">
                            <input
                                type="text"
                                placeholder="שם מלא"
                                value={formData.shipping.fullName}
                                onChange={(e) => handleInputChange('shipping', 'fullName', e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="רחוב ומספר"
                                value={formData.shipping.street}
                                onChange={(e) => handleInputChange('shipping', 'street', e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="עיר"
                                value={formData.shipping.city}
                                onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="מיקוד"
                                value={formData.shipping.zipCode}
                                onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                                required
                            />
                            <input
                                type="tel"
                                placeholder="טלפון"
                                value={formData.shipping.phone}
                                onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmitOrder} className="checkout-form">
                    <div className="form-section payment-details">
                        <h3>פרטי תשלום</h3>
                        <div className="form-grid">
                            <input
                                type="text"
                                placeholder="שם בעל הכרטיס"
                                value={formData.payment.cardHolder}
                                onChange={(e) => handleInputChange('payment', 'cardHolder', e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="מספר כרטיס"
                                value={formData.payment.cardNumber}
                                onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                                required
                                maxLength="16"
                            />
                            <input
                                type="text"
                                placeholder="MM/YY"
                                value={formData.payment.expiry}
                                onChange={(e) => handleInputChange('payment', 'expiry', e.target.value)}
                                required
                                maxLength="5"
                            />
                            <input
                                type="text"
                                placeholder="CVV"
                                value={formData.payment.cvv}
                                onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                                required
                                maxLength="3"
                            />
                        </div>
                    </div>

                    <div className="checkout-actions">
                        <button type="button" onClick={() => navigate('/')} className="cancel-btn">
                            ביטול
                        </button>
                        <button type="submit" className="confirm-btn">
                            אישור הזמנה
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout; 