import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginPopup from './Constant/LoginPopup';
import Cart from './Cart';
import { checkLoginStatus, getCart } from '../utils/auth';
import '../styles/ButtonGroup.css';

const ButtonGroup = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch user data when component mounts
  const checkAuth = async () => {
    const status = await checkLoginStatus();
    if (status.isLoggedIn) {
      setUser(status.user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Add this effect to listen for cart updates
  useEffect(() => {
    const updateCartCount = async () => {
      if (user) {
        const cart = await getCart(user._id);
        const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        
        // Trigger animation when count changes
        if (totalItems !== cartItemsCount) {
          setIsUpdating(true);
          setTimeout(() => setIsUpdating(false), 500);
        }
        
        setCartItemsCount(totalItems);
      } else {
        setCartItemsCount(0);
      }
    };

    updateCartCount();
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, [user, cartItemsCount]);

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };

  const closeLoginPopup = async () => {
    setShowLoginPopup(false);
    // Refresh user status when login popup closes
    await checkAuth();
  };

  const toggleCartPopup = () => {
    setShowCartPopup(prev => !prev);
  };

  const closeCartPopup = () => {
    setShowCartPopup(false);
  };

  const buttonStyle = {
    width: '60px', // רוחב הכפתור
    height: '60px', // גובה הכפתור
    padding: '10px', // מרווח פנימי
    fontSize: '10px', // גודל טקסט קטן יותר
  };
  
  return (
    <>
      <button style={buttonStyle} className="btn btn-light me-2" onClick={toggleLoginPopup}>
        <i className="bi bi-person-fill"></i> {/* User icon */}
      </button>  

      {showLoginPopup && <LoginPopup onClose={closeLoginPopup} setGlobalUser={setUser} />}

      <div className="cart-button-container">
        <button style={buttonStyle} className="btn btn-light me-2" onClick={toggleCartPopup}>
          <i className="bi bi-bag-heart"></i>
          {cartItemsCount > 0 && (
            <div className={`cart-badge ${isUpdating ? 'updating' : ''}`}>
              <span>{cartItemsCount}</span>
            </div>
          )}
        </button>
      </div>

      <Cart 
        isOpen={showCartPopup}
        onClose={closeCartPopup}
        user={user}
        key={user ? user._id : 'no-user'} // Force re-render when user changes
      />
    </>
  );
};

export default ButtonGroup;