import React, { useContext } from 'react';
import { SimulationContext } from '../context/SimulationContext';

function ProductList() {
  const { products, selectProduct } = useContext(SimulationContext);

  return (
    <div>
      {products.map(product => (
        <div key={product.id} onClick={() => selectProduct(product)}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Price: {product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
