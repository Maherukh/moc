import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ProductPicker from './ProductPicker';
import "../App.css";

const discountOptions = [
    { value: 'flat', label: 'flat off' },
    { value: 'percentage', label: '% off' },
];

function ProductList({ selectedProducts, onRemove, setSelectedProducts, onProductSelect }) {
    const [discountTypes, setDiscountTypes] = useState({});
    const [discountValues, setDiscountValues] = useState({});
    const [editingProductId, setEditingProductId] = useState(null);
    const [isProductPickerOpen, setIsProductPickerOpen] = useState(false);
    const [showVariants, setShowVariants] = useState(null); // Change to null to indicate no product selected for showing variants
    const [totalPrices, setTotalPrices] = useState({});

    useEffect(() => {
        // Recalculate total price for each product whenever selectedProducts or discountValues change
        const newTotalPrices = {};
        selectedProducts.forEach(product => {
            const totalPrice = calculateTotalPrice(product);
            newTotalPrices[product.id] = totalPrice;
        });
        setTotalPrices(newTotalPrices);
    }, [selectedProducts, discountValues]);

    const applyDiscount = (selectedOption, productId, variantId) => {
        const discountType = selectedOption.value;
        setDiscountTypes(prevTypes => ({
            ...prevTypes,
            [productId]: {
                ...prevTypes[productId],
                [variantId]: discountType,
            },
        }));
        // Reset discount value when discount type is changed
        setDiscountValues(prevValues => ({
            ...prevValues,
            [productId]: {
                ...prevValues[productId],
                [variantId]: "",
            },
        }));
    };

    const handleDiscountChange = (e, productId, variantId) => {
        const value = e.target.value.trim();
        setDiscountValues(prevValues => ({
            ...prevValues,
            [productId]: {
                ...prevValues[productId],
                [variantId]: value,
            },
        }));
    };

    const calculateTotalPrice = (product) => {
        const totalPrice = product.variants.reduce((acc, variant) => Number(acc) + Number(calculateDiscountedPrice(product, variant.id)), 0);
        return totalPrice;
    };

    const handleRemoveProduct = (productId) => {
        const updatedProducts = selectedProducts.filter(product => product.id !== productId);
        onRemove(updatedProducts);
        setSelectedProducts(updatedProducts);
        onProductSelect(updatedProducts); // Call onProductSelect when a product is removed
    };

    const handleRemoveVariant = (productId, variantId) => {
        const updatedProducts = selectedProducts.map(product => {
            if (product.id === productId) {
                return {
                    ...product,
                    variants: product.variants.filter(variant => variant.id !== variantId),
                };
            }
            return product;
        });
        setSelectedProducts(updatedProducts);
        onProductSelect(updatedProducts); // Call onProductSelect when a variant is removed
    };

    const handleEditProduct = (productId) => {
        setEditingProductId(productId);
        setIsProductPickerOpen(true);
    };

    const calculateDiscountedPrice = (product, variantId) => {
        const productId = product.id;
        const discountType = discountTypes[productId]?.[variantId];
        const discountValue = parseFloat(discountValues[productId]?.[variantId]);

        let price = variantId ? product.variants.find(variant => variant.id === variantId).price : calculateProductPrice(product);

        // Apply discount for the specified variant
        if (discountType === 'flat' || discountType === 'percentage') {
            if (!isNaN(discountValue)) {
                if (discountType === 'flat') {
                    price -= discountValue;
                } else {
                    const discountAmount = (price * discountValue) / 100;
                    price -= discountAmount;
                }
            }
        }

        if (price < 0 && !product.alertShown) {
            product.alertShown = true; // Set flag to true to indicate that alert has been shown
            alert("Discount value exceeds the total product price or makes the product price negative.");
            // Clear the input value for discount element after alert
            setDiscountValues(prevValues => ({
                ...prevValues,
                [productId]: {
                  ...prevValues[productId],
                  [variantId]: "",
                },
            }));
            return 0;
        } else if (price >= 0) {
            product.alertShown = false; // Reset flag when price is non-negative
        }

        return price;
    };

    const calculateProductPrice = (product, variantId) => {
        let totalPrice = 0;
        if (product.variants && product.variants.length > 0) {
            totalPrice = product.variants.reduce((acc, variant) => acc + variant.price, 0);
        } else {
            totalPrice = product.price;
        }
        return totalPrice;
    };

    return (
        <div className='Product-List'>
            {selectedProducts && selectedProducts.map((product, index) => (
                <div key={product.id} className={`Product-Item ${showVariants === product.id ? 'show-variants' : ''}`}>
                    <div className='Product-Flex'>
                        <div className='Product-Text'>
                            <p >{product.name}</p>
                            {/* <p>Total Price: {totalPrices[product.id]}</p> {/* Update total price here */}
                            {/* <p>Variants: {product.variants.map(variant => variant.title).join(', ')}</p> */}
                            <span className='Normal-Btn' onClick={() => handleEditProduct(product.id)}><span>&#9998;</span></span>
                        </div>
                            {/* <button className='Delete-Btn' onClick={() => handleRemoveProduct(product.id)}><span>&#x58;</span></button> */}
                            {/* <button className='Normal-Btn' onClick={() => handleEditProduct(product.id)}><span>&#9998;</span></button> */}
                            {/* {product.variants && product.variants.length > 0 && (
                            <button className="show-variants-button" onClick={() => setShowVariants(showVariants === product.id ? null : product.id)}>
                                {showVariants === product.id ? 'Hide Variants ▲' : 'Show Variants ▼'}
                            </button>
                            )} */}
                        <span className='Delete-Btn' onClick={() => handleRemoveProduct(product.id)}><span>&#x58;</span></span>
                    </div>
                    <div className='flex'>
                        <span>Variants: {product.variants.map(variant => variant.title).join(', ')}</span>
                        <span>Total Price: {totalPrices[product.id]}</span>
                    </div>
                    {product.variants && product.variants.length > 0 && (
                        <div className='show-variants-button'>
                            { product.variants.length === 1 ? 
                                <span className="show-variants-span" onClick={() => setShowVariants(showVariants === product.id ? null : product.id)}>
                                    {showVariants === product.id ? 'Hide Discount ▲' : 'Show Discount ▼'}
                                </span> 
                                : 
                                <span className="show-variants-span" onClick={() => setShowVariants(showVariants === product.id ? null : product.id)}>
                                    {showVariants === product.id ? 'Hide Variants ▲' : 'Show Variants ▼'}
                                </span>
                            }  
                            {/* <span className="show-variants-span" onClick={() => setShowVariants(showVariants === product.id ? null : product.id)}>
                                {showVariants === product.id ? 'Hide Variants ▲' : 'Show Variants ▼'}
                            </span>  */}
                        </div>
                    )}
                    {showVariants === product.id && product.variants && (
                        <ul className="variants-list">
                            {product.variants.map(variant => (
                                <li className='Variant-List-Item' key={variant.id}>
                                    <div className='Variant-Text'>
                                        <p>{variant.title}</p>
                                        <p>Price: {calculateDiscountedPrice(product, variant.id)}</p>
                                    </div>
                                    {/* {product.variants.length > 1 ? <span className='Delete-var-Btn' onClick={() => handleRemoveVariant(product.id, variant.id)}>x</span> : null} */}
                                    <input 
                                        className='Discount-Input'
                                        type="text"
                                        value={(discountValues[product.id]?.[variant.id]) || ""}
                                        onChange={(e) => handleDiscountChange(e, product.id, variant.id)}
                                    />
                                    <Select
                                        className='Discount-Select'
                                        style={{border: 'none', outline: 'none', boxShadow: 'none'}}
                                        options={discountOptions}
                                        onChange={(selectedOption) => applyDiscount(selectedOption, product.id, variant.id)}
                                    />
                                    {/* <input
                                        type="text"
                                        value={(discountValues[product.id]?.[variant.id]) || ""}
                                        onChange={(e) => handleDiscountChange(e, product.id, variant.id)}
                                    /> */}
                                    {product.variants.length > 1 ? <span className='Delete-var-Btn' onClick={() => handleRemoveVariant(product.id, variant.id)}>x</span> : null}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
            {isProductPickerOpen && (
                <ProductPicker
                    onClose={() => setIsProductPickerOpen(false)}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    productId={editingProductId}
                    onProductSelect={onProductSelect} // Pass onProductSelect to the ProductPicker
                />
            )}
        </div>
    );
}

export default ProductList;
