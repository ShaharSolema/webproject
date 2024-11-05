import React, { useState, useRef, useEffect } from 'react';
import { getCart, updateCartItem, removeCartItem } from '../utils/auth';
import logo from '../styles/Michal.jpg';
import '../styles/Cart.css';
import '../styles/LoginPopup.css';

const Cart = ({ isOpen, onClose, user }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cartRef = useRef();

  // Reset isExiting when isOpen changes
  useEffect(() => {
    if (isOpen) {
      setIsExiting(false);
    }
  }, [isOpen]);

  // Fetch cart data when component mounts and when cart is opened
  useEffect(() => {
    const fetchCartData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      if (isOpen) {
        try {
          setIsLoading(true);
          console.log('Fetching cart for user:', user._id); // Debug log
          const cartData = await getCart(user._id);
          console.log('Cart data received:', cartData); // Debug log
          setCartItems(cartData?.items || []);
        } catch (err) {
          console.error('Error fetching cart:', err);
          setCartItems([]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCartData();
  }, [user, isOpen]);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      await updateCartItem(user._id, productId, newQuantity);
      // Refresh cart data after update
      const updatedCart = await getCart(user._id);
      setCartItems(updatedCart?.items || []);
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeCartItem(user._id, productId);
      // Refresh cart data after removal
      const updatedCart = await getCart(user._id);
      setCartItems(updatedCart?.items || []);
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

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

  if (!isOpen) return null;

  return (
    <div className={`login-popup-overlay ${isExiting ? 'exit' : ''}`}>
      <div className="login-popup" ref={cartRef}>
        <h1>
          <img src={logo} alt="Logo" className="logo" />
        </h1>
        <hr className="divider" />
        <h3>Your Shopping Cart</h3>
        
        <div className="cart-items">
          {!user ? (
            <p className="login-message">Please log in to view your shopping cart</p>
          ) : isLoading ? (
            <p>Loading cart items...</p>
          ) : cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.productId._id} className="cart-item">
                <img src={item.productId.image} alt={item.productId.name} className="product-image" />
                <div className="item-details">
                  <h3>{item.productId.name}</h3>
                  <p>${item.productId.price}</p>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleUpdateQuantity(item.productId._id, Math.max(0, item.quantity - 1))}
                      disabled={item.quantity <= 1}
                      className="btn btn-secondary"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}
                      className="btn btn-secondary"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    className="btn btn-danger mb-2"
                    onClick={() => handleRemoveItem(item.productId._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-cart-message">Your cart is empty</p>
          )}
        </div>

        {user && cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="total mb-2">
              Total: ${cartItems.reduce((sum, item) => 
                sum + (item.productId.price * item.quantity), 0
              ).toFixed(2)}
            </div>
            <button className="btn btn-primary mb-2">Checkout</button>
          </div>
        )}
      </div>
      <div className="arrow-up"></div>
    </div>
  );
};

export default Cart;