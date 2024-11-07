import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';
import { validateIsraeliCreditCard, formatIsraeliCreditCard } from '../utils/creditCardValidation';
import { createOrder } from '../utils/auth';

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

    // Add new state for validation errors
    const [validationErrors, setValidationErrors] = useState({
        cardNumber: '',
        expiry: ''
    });

    const validateExpiryDate = (value) => {
        // Check format MM-YY
        if (!/^\d{2}-\d{2}$/.test(value)) {
            return 'פורמט לא תקין (MM-YY)';
        }
        
        const [month, year] = value.split('-').map(num => parseInt(num, 10));
        
        // Validate month (1-12)
        if (month < 1 || month > 12) {
            return 'חודש לא תקין';
        }
        
        const now = new Date();
        const currentYear = now.getFullYear() % 100; // Get last 2 digits
        const currentMonth = now.getMonth() + 1; // 1-12
        
        // Check if card is expired
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            return 'כרטיס האשראי פג תוקף';
        }
        
        return ''; // No error
    };

    if (!cartItems.length) {
        navigate('/');
        return null;
    }

    const handleInputChange = (section, field, value) => {
        if (section === 'payment') {
            if (field === 'cardNumber') {
                const formattedValue = formatIsraeliCreditCard(value);
                setFormData(prev => ({
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [field]: formattedValue
                    }
                }));

                // Validate credit card when user finishes typing
                if (value.replace(/\D/g, '').length === 16) {
                    const isValid = validateIsraeliCreditCard(value);
                    setValidationErrors(prev => ({
                        ...prev,
                        cardNumber: isValid ? '' : 'מספר כרטיס האשראי אינו תקין'
                    }));
                } else {
                    setValidationErrors(prev => ({
                        ...prev,
                        cardNumber: ''
                    }));
                }
            } else if (field === 'expiry') {
                // Format expiry date as MM-YY
                const cleanValue = value.replace(/\D/g, '');
                let formattedValue = cleanValue;
                
                if (cleanValue.length >= 2) {
                    formattedValue = cleanValue.slice(0, 2) + '-' + cleanValue.slice(2);
                }
                
                // Ensure month is between 01-12
                const month = parseInt(cleanValue.slice(0, 2));
                if (month > 12) {
                    formattedValue = '12' + (formattedValue.slice(2) || '');
                }
                
                setFormData(prev => ({
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [field]: formattedValue
                    }
                }));

                // Validate expiry when full date is entered
                if (formattedValue.length === 5) {
                    const error = validateExpiryDate(formattedValue);
                    setValidationErrors(prev => ({
                        ...prev,
                        expiry: error
                    }));
                } else {
                    setValidationErrors(prev => ({
                        ...prev,
                        expiry: ''
                    }));
                }
            } else {
                setFormData(prev => ({
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [field]: value
                    }
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            }));
        }
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        
        // Validate credit card
        const cleanCardNumber = formData.payment.cardNumber.replace(/\D/g, '');
        const cardError = !validateIsraeliCreditCard(cleanCardNumber);
        
        // Validate expiry
        const expiryError = validateExpiryDate(formData.payment.expiry);
        
        // Update validation errors
        setValidationErrors({
            cardNumber: cardError ? 'מספר כרטיס האשראי אינו תקין' : '',
            expiry: expiryError
        });

        // If there are any validation errors, stop submission
        if (cardError || expiryError) {
            return;
        }

        try {
            // Create order object
            const orderData = {
                items: cartItems,
                totalAmount: finalTotal,
                shippingMethod: shippingMethod,
                shippingAddress: shippingMethod === 'pickup' ? {} : formData.shipping,
                paymentDetails: {
                    ...formData.payment,
                    cardNumber: cleanCardNumber,
                    lastFourDigits: cleanCardNumber.slice(-4)
                },
                status: 'received',
                shippingCost: getShippingCost(),
                createdAt: new Date()
            };

            const result = await createOrder(orderData);

            if (result.success) {
                // Clear local cart state by triggering a cart refresh
                window.dispatchEvent(new CustomEvent('cartUpdated'));
                
                // Navigate to success page
                navigate('/order-success', { 
                    state: { 
                        purchaseNumber: result.purchaseNumber 
                    },
                    replace: true
                });
            } else if (result.error.includes('כמות לא מספיקה')) {
                // Handle specific error for insufficient quantity
                alert(result.error);
            } else {
                // General error alert
                alert('אנא נסה שוב מאוחר יותר, אנו מצטערים על אי הנוחות');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('אנא נסה שוב מאוחר יותר, אנו מצטערים על אי הנוחות');
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
                                    <th>תמונה</th>
                                    <th>שם מוצר</th>
                                    <th>כמות</th>
                                    <th>מחיר</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => {
                                    const discountedPrice = item.productId.discount 
                                        ? item.productId.price * (1 - item.productId.discount / 100) 
                                        : item.productId.price;
                                    
                                    return (
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
                                            <td>
                                                {item.productId.discount > 0 ? (
                                                    <>
                                                        <span className="original-price">₪{(item.productId.price * item.quantity).toFixed(2)}</span>
                                                        <span className="discounted-price">₪{(discountedPrice * item.quantity).toFixed(2)}</span>
                                                    </>
                                                ) : (
                                                    <>₪{(discountedPrice * item.quantity).toFixed(2)}</>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
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
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="שם מלא"
                                    value={formData.shipping.fullName}
                                    onChange={(e) => handleInputChange('shipping', 'fullName', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="רחוב ומספר"
                                    value={formData.shipping.street}
                                    onChange={(e) => handleInputChange('shipping', 'street', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="עיר"
                                    value={formData.shipping.city}
                                    onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="מיקוד"
                                    value={formData.shipping.zipCode}
                                    onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="tel"
                                    placeholder="טלפון"
                                    value={formData.shipping.phone}
                                    onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmitOrder} className="checkout-form">
                    <div className="form-section payment-details">
                        <h3>פרטי תשלום</h3>
                        <div className="form-grid">
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="שם בעל הכרטיס"
                                    value={formData.payment.cardHolder}
                                    onChange={(e) => handleInputChange('payment', 'cardHolder', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="מספר כרטיס"
                                    value={formData.payment.cardNumber}
                                    onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                                    required
                                    maxLength="19"
                                    pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                                    className={validationErrors.cardNumber ? 'error' : ''}
                                />
                                {validationErrors.cardNumber && (
                                    <span className="error-message">{validationErrors.cardNumber}</span>
                                )}
                            </div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="MM-YY"
                                    value={formData.payment.expiry}
                                    onChange={(e) => handleInputChange('payment', 'expiry', e.target.value)}
                                    required
                                    maxLength="5"
                                    pattern="\d{2}-\d{2}"
                                    className={validationErrors.expiry ? 'error' : ''}
                                />
                                {validationErrors.expiry && (
                                    <span className="error-message">{validationErrors.expiry}</span>
                                )}
                            </div>
                            <div className="input-group">
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