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
      errors.name = "השם חייב להכיל בין 2 ל-20 אותיות";
    }

    if (newProduct.description && !validator.isLength(newProduct.description, { min: 2, max: 60 })) {
      errors.description = "תיאור חייב להכיל בין 2 ל-60 אותיות";
    }

    if (newProduct.price <= 0) {
      errors.price = "מחיר חייב להיות גדול מ-0";
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
      resetForm();
      await reloadProducts();
    }
  };

  const handleEditProduct = (product) => {
    setNewProduct(product);
    setEditMode(true);
    setCurrentProductId(product.id);
  };

  const handleUpdateProduct = async () => {
    if (validateProduct()) {
      await updateProduct(currentProductId, newProduct);
      resetForm();
      await reloadProducts();
      setEditMode(false);
      setCurrentProductId(null);
    }
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    await reloadProducts();
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      price: '',
      description: '',
      stock: '',
      discount: '',
      categories: [],
      imageUrl: ''
    });
    setValidationErrors({}); // ניקוי הודעות השגיאה
  };

  const reloadProducts = async () => {
    const updatedProducts = await fetchProducts();
    setProducts(updatedProducts);
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
                <button onClick={() => handleEditProduct(product)}>עריכה</button>
                <button onClick={() => handleDeleteProduct(product.id)}>מחיקה</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>הוספת/עדכון מוצר</h3>
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
              {validationErrors.name && <span className="error">{validationErrors.name}</span>}
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
              {validationErrors.price && <span className="error">{validationErrors.price}</span>}
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
              {validationErrors.description && <span className="error">{validationErrors.description}</span>}
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
              {validationErrors.discount && <span className="error">{validationErrors.discount}</span>}
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
              {editMode ? (
                <button onClick={handleUpdateProduct}>עדכן מוצר</button>
              ) : (
                <button onClick={handleAddProduct}>הוסף מוצר</button>
              )}
              <button onClick={resetForm}>איפוס</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductsManagement;
