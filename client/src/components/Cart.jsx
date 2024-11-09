import React, { useState, useRef, useEffect } from 'react';
import { getCart, updateCartItem, removeCartItem } from '../utils/auth';
import logo from '../styles/Michal.jpg';
import '../styles/Cart.css';
import '../styles/LoginPopup.css';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const Cart = ({ isOpen, onClose, user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const cartRef = useRef();
  const navigate = useNavigate();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Match this with the CSS transition duration
  };

  // Fetch cart data when component mounts or when cart is opened
  useEffect(() => {
    const fetchCartData = async () => {
      if (!user || !isOpen) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const cartData = await getCart(user._id);
        setCartItems(cartData?.items || []);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setCartItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchCartData();
    }
  }, [user, isOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCheckoutClick = () => {
    const total = calculateTotal();

    handleClose();
    navigate('/checkout', { 
      state: { 
        cartItems: cartItems,
        totalAmount: total
      }
    });
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const item = cartItems.find(item => item.productId._id === productId);
      
      if (newQuantity > item.productId.stock) {
        alert('לא ניתן להוסיף יותר פריטים מהכמות במלאי');
        return;
      }

      if (newQuantity <= 0) {
        await updateCartItem(user._id, productId, 0);
        setCartItems(prev => prev.filter(item => item.productId._id !== productId));
      } else {
        await updateCartItem(user._id, productId, newQuantity);
        setCartItems(prev => prev.map(item => 
          item.productId._id === productId 
            ? { ...item, quantity: newQuantity }
            : item
        ));
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      alert('אירעה שגיאה בעדכון הכמות');
    }
  };

  // Add event listener for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      if (user) {
        // Refresh cart data
        getCart(user._id)
          .then(cartData => setCartItems(cartData?.items || []))
          .catch(err => {
            console.error('Error fetching cart:', err);
            setCartItems([]);
          });
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [user]);

  const calculateItemPrice = (item) => {
    const originalPrice = item.productId.price;
    const discount = item.productId.discount;
    return discount ? originalPrice * (1 - discount / 100) : originalPrice;
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => 
      sum + (calculateItemPrice(item) * item.quantity), 0
    );
  };

  if (!isOpen) return null;

  return (
    <div className={`login-popup-overlay ${isClosing ? 'closing' : ''}`}>
      <div className={`login-popup cart-popup ${isClosing ? 'closing' : ''}`} ref={cartRef}>
        <h1>
          <img src={logo} alt="Logo" className="logo" />
        </h1>
        <hr className="divider" />
        <h3 className="cart-title">העגלה שלך</h3>
        
        <div className="cart-items-container">
          {!user ? (
            <p className="login-message">אנא התחבר/י כדי לצפות בעגלת הקניות</p>
          ) : isLoading ? (
            <div className="loading-container">
              <LoadingSpinner /> {/* הצגת קומפוננטת האנימציה */}
              <p>טוען את עגלת הקניות שלך...</p> {/* טקסט מתחת לאנימציה */}
            </div>
          ) : cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.productId._id} className="cart-item">
                <div className="cart-item-image-container">
                  <img 
                    src={item.productId.imageUrl}
                    alt={item.productId.name} 
                    className="cart-item-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                  {item.productId.discount > 0 && (
                    <div className="cart-item-discount-badge">
                      {item.productId.discount}% הנחה
                    </div>
                  )}
                </div>
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.productId.name}</h4>
                  <div className="cart-item-price">
                    {item.productId.discount > 0 ? (
                      <>
                        <span className="original-price">₪{item.productId.price.toFixed(2)}</span>
                        <span className="discounted-price">
                          ₪{calculateItemPrice(item).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span>₪{item.productId.price.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="quantity-control">
                    <button 
                      onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}
                      className="quantity-btn decrease"
                      aria-label="Decrease quantity"
                    >
                      <span className="quantity-btn-text">-</span>
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}
                      className="quantity-btn increase"
                      aria-label="Increase quantity"
                      disabled={item.quantity >= item.productId.stock}
                    >
                      <span className="quantity-btn-text">+</span>
                    </button>
                  </div>
                </div>
                <div className="cart-item-total">
                  ₪{(calculateItemPrice(item) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <p className="empty-cart-message">העגלה ריקה</p>
          )}
        </div>

        {user && cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>סה"כ לתשלום:</span>
              <span className="total-amount">
                ₪{calculateTotal().toFixed(2)}
              </span>
            </div>
            <button 
              className="checkout-btn"
              onClick={handleCheckoutClick}
            >
              המשך לתשלום
            </button>
          </div>
        )}
      </div>
      <div className="arrow-up"></div>
    </div>
  );
};

export default Cart;