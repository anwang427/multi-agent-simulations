import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SimulationContext = createContext(null);

export const SimulationProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products from the backend API
  useEffect(() => {
    axios.get('/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Function to fetch product details
  const fetchProductDetails = (productId) => {
    // Assuming product details are at /api/products/:id
    axios.get(`/api/products/${productId}`)
      .then(response => {
        setSelectedProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  };

  // Function to handle product selection
  const selectProduct = (product) => {
    setSelectedProduct(product);
    // Optionally fetch more details here by calling fetchProductDetails
    // fetchProductDetails(product.id);
  };

  // Search functionality
  const searchProducts = (term) => {
    // If the searchTerm is empty, reset the list to the original products
    if (!term.trim()) {
      fetchProducts();
      return;
    }

    // Filter products based on the search term
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  // Function to fetch all products (used for resetting search)
  const fetchProducts = () => {
    axios.get('/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  return (
    <SimulationContext.Provider value={{
      products,
      selectedProduct,
      searchTerm,
      setSearchTerm,
      selectProduct,
      searchProducts
    }}>
      {children}
    </SimulationContext.Provider>
  );
};
