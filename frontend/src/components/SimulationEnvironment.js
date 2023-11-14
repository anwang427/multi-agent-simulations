import React, { useContext } from 'react';
import { SimulationContext } from '../context/SimulationContext';
import ProductList from './ProductList';
import SearchBar from './SearchBar';

function SimulationEnvironment() {
  const { searchTerm, setSearchTerm } = useContext(SimulationContext);

  return (
    <div>
      <h1>Simulation Environment</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProductList />
    </div>
  );
}

export default SimulationEnvironment;