// src/ProductStore.jsx
import React, { createContext, useContext, useState } from 'react';
import '../styles/Store.css'; 

// יצירת הקונטקסט
const ProductContext = createContext();

// יצירת הוק לגישה לחנות
export const useProductStore = () => useContext(ProductContext);

// ספק המוצרים והעגלה
export function ProductProvider({ children }) {
  const [products] = useState([
    { id: 1, name: "Product 1", price: 100, description: "Description of Product 1" },
    { id: 2, name: "Product 2", price: 150, description: "Description of Product 2" },
    { id: 3, name: "Product 3", price: 200, description: "Description of Product 3" },
  ]);

  const [cart, setCart] = useState([]);

  // פונקציה להוספה לעגלה
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <ProductContext.Provider value={{ products, cart, addToCart }}>
      {children}
    </ProductContext.Provider>
  );
}

// קומפוננטה המציגה את רשימת המוצרים
export function ProductList() {
  const { products, addToCart } = useProductStore();

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

// קומפוננטה המציגה את עגלת הקניות
export function Cart() {
  const { cart } = useProductStore();

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// קומפוננטת החנות
const ProductStore = () => {
  return (
    <div>
      <h1>Product Store</h1>
      <ProductList />
      <Cart />
    </div>
  );
};

export default ProductStore;
