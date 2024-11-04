import React, { useState, useEffect } from 'react';
import { fetchProducts, updateProduct, deleteProduct, addProduct } from '../../utils/auth';
import validator from 'validator';

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

    // Validate name
    if (!newProduct.name) {
      errors.name = "Product name is required.";
    } else if (!validator.isLength(newProduct.name, { min: 2, max: 20 })) {
      errors.name = "Product name must be between 2 and 20 characters.";
    } else if (!validator.isAlpha(newProduct.name.replace(/\s/g, ''), 'en-US', { ignore: ' ' }) && !validator.isAlpha(newProduct.name.replace(/\s/g, ''), 'he', { ignore: ' ' })) {
      errors.name = "Product name can only contain letters from the Hebrew or English alphabet.";
    }

    // Validate description
    if (newProduct.description && !validator.isLength(newProduct.description, { min: 2, max: 60 })) {
      errors.description = "Description must be between 2 and 60 characters.";
    } else if (newProduct.description && !validator.isAlpha(newProduct.description.replace(/\s/g, ''), 'en-US', { ignore: ' ' }) && !validator.isAlpha(newProduct.description.replace(/\s/g, ''), 'he', { ignore: ' ' })) {
      errors.description = "Description can only contain letters from the Hebrew or English alphabet.";
    }

    // Validate price
    if (newProduct.price <= 0) {
      errors.price = "Price must be greater than zero.";
    }

    // Validate discount
    if (newProduct.discount < 0 || newProduct.discount > 100) {
      errors.discount = "Discount must be between 0 and 100.";
    } else if (newProduct.discount && !validator.isNumeric(newProduct.discount.toString(), { no_symbols: true })) {
      errors.discount = "Discount must be a number.";
    }

    // Validate categories
    if (newProduct.categories.length === 0) {
      errors.categories = "At least one category is required.";
    }

    // Validate stock
    if (newProduct.stock < 0) {
      errors.stock = "Stock cannot be negative.";
    } else if (newProduct.stock && !validator.isNumeric(newProduct.stock.toString(), { no_symbols: true })) {
      errors.stock = "Stock must be a number.";
    }

    

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleAddOrUpdateProduct = async () => {
    setError(null);
    if (!validateProduct()) return; // Validate product before proceeding
    try {
      if (editMode) {
        const updatedProduct = await updateProduct(currentProductId, newProduct);
        if (updatedProduct) {
          setProducts(products.map(product => (product._id === currentProductId ? updatedProduct : product)));
          resetForm();
        }
      } else {
        const addedProduct = await addProduct(newProduct);
        if (addedProduct) {
          setProducts(prevProducts => [...prevProducts, addedProduct]);
          resetForm();
        }
      }
    } catch (error) {
      setError(error.message || "An error occurred while saving the product.");
    }
  };

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      const isDeleted = await deleteProduct(id);
      if (isDeleted) {
        setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditMode(true);
    setCurrentProductId(product._id);
    setNewProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
      discount: product.discount,
      categories: product.categories,
      imageUrl: product.imageUrl
    });
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
    setEditMode(false);
    setCurrentProductId(null);
    setValidationErrors({}); // Reset validation errors
  };

  const handleCategoryChange = (category) => {
    setNewProduct(prevProduct => {
      const categories = prevProduct.categories.includes(category)
        ? prevProduct.categories.filter(cat => cat !== category) // Remove category if already selected
        : [...prevProduct.categories, category]; // Add category if not selected
      return { ...prevProduct, categories };
    });
    validateProduct(); // Validate on change
  };

  return (
    <div>
      <h1>Products Management</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Discount</th>
            <th>Categories</th>
            <th>Image URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.stock}</td>
              <td>{product.discount || 0}%</td>
              <td>{product.categories.join(', ')}</td>
              <td>{product.imageUrl}</td>
              <td>
                <button onClick={() => handleEditProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{editMode ? 'Edit Product' : 'Add New Product'}</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) => {
          setNewProduct({ ...newProduct, name: e.target.value });
          validateProduct(); // Validate on change
        }}
      />
      {validationErrors.name && <div style={{ color: 'red' }}>{validationErrors.name}</div>} {/* Name error */}

      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) => {
          setNewProduct({ ...newProduct, price: e.target.value });
          validateProduct(); // Validate on change
        }}
      />
      {validationErrors.price && <div style={{ color: 'red' }}>{validationErrors.price}</div>} {/* Price error */}

      <input
        type="text"
        placeholder="Description"
        value={newProduct.description}
        onChange={(e) => {
          setNewProduct({ ...newProduct, description: e.target.value });
          validateProduct(); // Validate on change
        }}
      />
      {validationErrors.description && <div style={{ color: 'red' }}>{validationErrors.description}</div>} {/* Description error */}

      <input
        type="number"
        placeholder="Stock"
        value={newProduct.stock}
        onChange={(e) => {
          setNewProduct({ ...newProduct, stock: e.target.value });
          validateProduct(); // Validate on change
        }}
      />
      {validationErrors.stock && <div style={{ color: 'red' }}>{validationErrors.stock}</div>} {/* Stock error */}

      <input
        type="number"
        placeholder="Discount (%)"
        value={newProduct.discount}
        onChange={(e) => {
          setNewProduct({ ...newProduct, discount: e.target.value });
          validateProduct(); // Validate on change
        }}
      />
      {validationErrors.discount && <div style={{ color: 'red' }}>{validationErrors.discount}</div>} {/* Discount error */}

      <div>
        <h3>Select Categories:</h3>
        {categoryOptions.map((category) => (
          <div key={category}>
            <label>
              <input
                type="checkbox"
                checked={newProduct.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          </div>
        ))}
        {validationErrors.categories && <div style={{ color: 'red' }}>{validationErrors.categories}</div>} {/* Categories error */}
      </div>

      <input
        type="text"
        placeholder="Image URL"
        value={newProduct.imageUrl}
        onChange={(e) => {
          setNewProduct({ ...newProduct, imageUrl: e.target.value });
          validateProduct(); // Validate on change
        }}
      />
      {validationErrors.imageUrl && <div style={{ color: 'red' }}>{validationErrors.imageUrl}</div>} {/* Image URL error */}

      <button onClick={handleAddOrUpdateProduct}>{editMode ? 'Update Product' : 'Add Product'}</button>
      <button onClick={resetForm}>Reset</button>
    </div>
  );
};

export default ProductsManagement;
