import React, { useState } from 'react';
import '../App.css';
import ProductPicker from "./ProductPicker";
import ProductList from "./ProductList";

function Main({ selectedProducts, setSelectedProducts }) {
  const [products, setProducts] = useState([]);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleShowPicker = () => {
    setPickerVisible(true);
  };

  const handleHidePicker = () => {
    setPickerVisible(false);
  };

  const handleProductSelect = (selectedProductIds) => {
    setSelectedProducts(selectedProductIds);
  };

  const handleAddProduct = (product) => {
    setProducts(prevProducts => [...prevProducts, product]);
  };

  const handleRemoveProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  };

  const handleReorderProducts = (startIndex, endIndex) => {
    const result = Array.from(products);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setProducts(result);
  };

  return (
    <div className="Main">
      {isPickerVisible ? (
        <ProductPicker 
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
          onAddProduct={handleAddProduct} 
          onClose={handleHidePicker} 
          onProductSelect={handleProductSelect} />
      ) : (
        <button onClick={handleShowPicker}>Add Product</button>
      )}
      <ProductList 
        selectedProducts={selectedProducts} 
        setSelectedProducts={setSelectedProducts} 
        products={products} 
        onRemove={handleRemoveProduct} 
        onReorder={handleReorderProducts} 
        onProductSelect={handleProductSelect} />
    </div>
  );
}

export default Main;