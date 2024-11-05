import React, { useState, useEffect } from 'react';
import { fetchProducts, updateProduct, deleteProduct, addProduct } from '../../utils/auth';
import validator from 'validator';
import '../../styles/ProductsManagement.css';

const categoryOptions = [
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

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    discount: '',
    categories: [],
    imageUrl: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };
    loadProducts();
  }, []);

  const validateProduct = () => {
    const errors = {};

    if (!newProduct.name) {
      errors.name = "חובה שם מוצר";
    } else if (!validator.isLength(newProduct.name, { min: 2, max: 20 })) {
      errors.name = "השם חייב להכיל בין 2 ל20 אותיות";
    }

    if (newProduct.description && !validator.isLength(newProduct.description, { min: 2, max: 60 })) {
      errors.description = "תיאור חייב להכיל בין 2 ל60 אותיות";
    }

    if (newProduct.price <= 0) {
      errors.price = "מחיר חייב להיות גדול מ0";
    }

    if (newProduct.discount < 0 || newProduct.discount > 100) {
      errors.discount = "הנחה חייבת להיות בין 0 ל-100 אחוזים";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCategoryChange = (category) => {
    setNewProduct((prevProduct) => {
      const { categories } = prevProduct;
      if (categories.includes(category)) {
        return {
          ...prevProduct,
          categories: categories.filter((cat) => cat !== category)
        };
      } else {
        return {
          ...prevProduct,
          categories: [...categories, category]
        };
      }
    });
  };

  const handleAddProduct = async () => {
    if (validateProduct()) {
      await addProduct(newProduct);
      setNewProduct({
        name: '',
        price: '',
        description: '',
        stock: '',
        discount: '',
        categories: [],
        imageUrl: ''
      });
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
    }
  };

  return (
    <div className="products-management">
      <h2>ניהול מוצרים</h2>

      <table className="products-table">
        <thead>
          <tr>
            <th>שם מוצר</th>
            <th>מחיר</th>
            <th>תיאור</th>
            <th>מלאי</th>
            <th>הנחה</th>
            <th>קטגוריות</th>
            <th>תמונה</th>
            <th>עריכה</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.stock}</td>
              <td>{product.discount}</td>
              <td>{product.categories.join(', ')}</td>
              <td><img src={product.imageUrl} alt={product.name} style={{ width: '50px' }} /></td>
              <td>
                {/* כפתורי עריכה ומחיקה */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>הוספת מוצר חדש</h3>
      <table className="new-product-table">
        <tbody>
          <tr>
            <td>שם:</td>
            <td>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>מחיר:</td>
            <td>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>תיאור:</td>
            <td>
              <input
                type="text"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>מלאי:</td>
            <td>
              <input
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>הנחה (%):</td>
            <td>
              <input
                type="number"
                value={newProduct.discount}
                onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>קטגוריות:</td>
            <td>
              <div className="checkbox-group">
                {categoryOptions.map((category) => (
                  <label key={category}>
                    <input
                      type="checkbox"
                      checked={newProduct.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    {category}
                  </label>
                ))}
              </div>
            </td>
          </tr>
          <tr>
            <td>תמונה (URL):</td>
            <td>
              <input
                type="text"
                value={newProduct.imageUrl}
                onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button onClick={handleAddProduct}>הוסף מוצר</button>
              <button
                onClick={() => setNewProduct({
                  name: '',
                  price: '',
                  description: '',
                  stock: '',
                  discount: '',
                  categories: [],
                  imageUrl: ''
                })}
              >
                איפוס
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductsManagement;
