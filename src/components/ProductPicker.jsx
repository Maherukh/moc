import useApi from "./useApi";
import React, { useState, useEffect } from 'react';
import "../App.css";

function ProductPicker({ onClose, onProductSelect, selectedProducts, setSelectedProducts }) {
  const [searchTerm, setSearchTerm] = useState('Hat');
  const { data, loading, error } = useApi('https://stageapi.monkcommerce.app/task/products/search', { search: searchTerm, page: 1, limit: 10 });

  const handleVariantSelect = (variantId, isSelected, product) => {
    // setSelectedProducts(selectedProducts.filter(product => product.id !== 6805249130));
    const selectedVariant = product.variants.find(variant => variant.id === variantId);
    if (isSelected) {
      setSelectedProducts(prevSelectedProducts => {
        const updatedProducts = [...prevSelectedProducts];
        const existingProductIndex = updatedProducts.findIndex(item => item.id === product.id);
        if (existingProductIndex !== -1) {
          updatedProducts[existingProductIndex].variants.push({
            id: variantId,
            title: selectedVariant.title,
            price: selectedVariant.price
          });
        } else {
          updatedProducts.push({
            id: product.id,
            name: product.title,
            variants: [{
              id: variantId,
              title: selectedVariant.title,
              price: selectedVariant.price
            }]
          });
        }
        return updatedProducts;
      });
    } else {
      setSelectedProducts(prevSelectedProducts => {
        const updatedProducts = prevSelectedProducts.map(item => {
          if (item.id === product.id) {
            return {
              ...item,
              variants: item.variants.filter(variant => variant.id !== variantId)
            };
          }
          return item;
        });
        // Check if all variants of the product are deselected
        const allVariantsDeselected = updatedProducts.some(item => item.id === product.id && item.variants.length === 0);
        if (allVariantsDeselected) {
          // Remove the entire product from selectedProducts
          return updatedProducts.filter(item => item.id !== product.id);
        }
        return updatedProducts;
      });
    }
  };  

  const isVariantSelected = (variantId) => {
    return selectedProducts.some(product => product.variants.some(variant => variant.id === variantId));
  };

  // When the product selection changes, call the onProductSelect prop
  useEffect(() => {
    onProductSelect(selectedProducts);
  }, [selectedProducts, onProductSelect]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="ProductPicker">
      <div className="padding">
      <div className="flex padding-1rem">
        <h2 className="Product-header">Select Products</h2>
        <span className="Delete-Btn" onClick={onClose}>X</span>
      </div>
      <hr className="line" />
      <div className="search-bar padding-1rem">
        <span className="Search">&#128270;</span>
        <input className="Product-Search" placeholder="Search Product" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <hr className="line" />
      {data && data.map(product => (
        <div key={product.id} className="Product">
          <div className="flex-start-prd">
            <img className="Product-Image" src={product.image.src} alt={product.title} />
            <p>{product.title}</p>
          </div>
          <hr className="line"/>
          {product.variants.map(variant => (
            <div key={variant.id} className="Product-variants">
              <div>
                <input
                  className="variant-checkbox"
                  type="checkbox"
                  id={variant.id}
                  onChange={(event) => handleVariantSelect(variant.id, event.target.checked, product)}
                  checked={isVariantSelected(variant.id)}
                />
                <label htmlFor={variant.id}>{variant.title}</label>
              </div>
              <p className="Product-Price">Price: {variant.price}</p>
            </div>
          ))}
          <hr className="line"/>
        </div>
      ))}
      </div>
      <div className="span-section">
        <span className="cancel-btn" onClick={onClose}>Cancel</span>
        <span className="add-btn" onClick={onClose}>Add</span>
      </div>
    </div>
  );
}

export default ProductPicker;