// ProductStore.jsx
import React, { useState, useEffect } from 'react';
import Product from './Home/Product';
import Cart from './Cart';
import { fetchProducts, updateCartItem, checkLoginStatus, getCart } from '../utils/auth';
import '../styles/ProductStore.css';
import LoadingSpinner from './LoadingSpinner'; //חדש - טעינה לחנות

const ProductStore = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authStatus, setAuthStatus] = useState({ isLoggedIn: false, user: null });
    const [cartItems, setCartItems] = useState({});
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOrder, setSortOrder] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [showSaleOnly, setShowSaleOnly] = useState(false);

    // Predefined categories from your model
    const categories = [
        'all',
        'ראשי הסרה',
        'ראשי מניקור',
        'כלי מניקור',
        'בייסים',
        'טופים',
        'גלים',
        'בנייה והשלמה',
        'מכחולים',
        'קישוטים',
        'חד פעמי',
        'אקסטרה'
    ];

    // Filter and sort products
    useEffect(() => {
        let result = [...products];

        // Search filter
        if (searchTerm) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(product => 
                product.categories.includes(selectedCategory)
            );
        }

        // Sale filter
        if (showSaleOnly) {
            result = result.filter(product => product.discount > 0);
        }

        // Sort
        switch (sortOrder) {
            case 'price-asc':
                result.sort((a, b) => {
                    const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
                    const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
                    return priceA - priceB;
                });
                break;
            case 'price-desc':
                result.sort((a, b) => {
                    const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
                    const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
                    return priceB - priceA;
                });
                break;
            default:
                break;
        }

        setFilteredProducts(result);
    }, [products, searchTerm, selectedCategory, sortOrder, showSaleOnly]);

    // Function to fetch cart data
    const fetchCartData = async () => {
        if (authStatus.isLoggedIn && authStatus.user) {
            try {
                const cartData = await getCart(authStatus.user._id);
                if (cartData && cartData.items) {
                    const cartQuantities = {};
                    cartData.items.forEach(item => {
                        if (item.productId && item.productId._id) {
                            cartQuantities[item.productId._id] = item.quantity;
                        }
                    });
                    setCartItems(cartQuantities);
                }
            } catch (err) {
                console.error('Error fetching cart:', err);
            }
        }
    };

    // Add a new useEffect specifically for cart updates
    useEffect(() => {
        if (authStatus.isLoggedIn && authStatus.user) {
            fetchCartData();
        }
    }, [authStatus.isLoggedIn, authStatus.user?._id]);

    // Initial load of products and cart
    useEffect(() => {
        const initialize = async () => {
            try {
                setLoading(true);
                const loginStatus = await checkLoginStatus();
                setAuthStatus(loginStatus);

                const productsData = await fetchProducts();
                setProducts(productsData);
                
                if (loginStatus.isLoggedIn) {
                    await fetchCartData();
                }
            } catch (err) {
                setError('Failed to load store data');
                console.error('Error loading store data:', err);
            } finally {
                setLoading(false);
            }
        };

        initialize();
    }, []); // Empty dependency array for initial load

    const handleUpdateCart = async (productId, quantity) => {
        if (!authStatus.isLoggedIn) {
            alert('Please log in to add items to cart');
            return;
        }

        try {
            await updateCartItem(authStatus.user._id, productId, quantity);
            await fetchCartData();
            // Dispatch cartUpdated event after successful cart update
            window.dispatchEvent(new CustomEvent('cartUpdated'));
        } catch (error) {
            console.error('Error updating cart:', error);
            alert('Failed to update cart. Please try again.');
        }
    };

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // הוסף useEffect חדש לטיפול בגלילה
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentPage]); // יופעל בכל פעם שהעמוד הנוכחי משתנה

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <LoadingSpinner />;  // הצגת האנימציה כאשר המידע נטען
    if (error) return <div>{error}</div>;

    // if (loading) return <div>Loading products...</div>;
    // if (error) return <div>{error}</div>;

    return (
        <div className="store-container">
            <h1 className="store-title">חנות</h1>

            <div className="store-filters">
                {/* Search Bar */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="חיפוש מוצרים..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                {/* Category Filter */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="category-select"
                >
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category === 'all' ? 'כל הקטגוריות' : category}
                        </option>
                    ))}
                </select>

                {/* Sort Order */}
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="sort-select"
                    dir="rtl"
                >
                    <option value="default">מיון לפי</option>
                    <option value="price-asc">מחיר: מהנמוך לגבוה</option>
                    <option value="price-desc">מחיר: מהגבוה לנמוך</option>
                </select>

                <button 
                    className={`sale-filter ${showSaleOnly ? 'active' : ''}`}
                    onClick={() => setShowSaleOnly(!showSaleOnly)}
                >
                    {showSaleOnly ? 'הצג הכל' : 'מבצעים בלבד'}
                </button>
            </div>
            

            {!authStatus.isLoggedIn && (
                <div className="login-prompt">
                    אנא התחבר/י כדי להוסיף פריטים לעגלה
                </div>
            )}

            <div className="product-grid">
                {currentItems.map(product => (
                    <Product 
                        key={product._id}
                        image={product.imageUrl}
                        price={product.price}
                        description={product.description}
                        name={product.name}
                        stock={product.stock}
                        discount={product.discount}
                        onUpdateCart={(quantity) => handleUpdateCart(product._id, quantity)}
                        isLoggedIn={authStatus.isLoggedIn}
                        initialQuantity={cartItems[product._id] || 0}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button 
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-button"
                    aria-label="Previous page"
                >
                    ‹
                </button>
                
                <span className="page-info">
                    {currentPage} / {totalPages}
                </span>

                <button 
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                    aria-label="Next page"
                >
                    ›
                </button>
            </div>

            <Cart 
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                user={authStatus.user}
                onCartUpdate={fetchCartData}
            />
        </div>
    );
};

export default ProductStore;
