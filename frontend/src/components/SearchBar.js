import React, { useContext } from 'react';
import { SimulationContext } from '../context/SimulationContext';

function SearchBar() {
  const { searchTerm, setSearchTerm, searchProducts } = useContext(SimulationContext);

  const handleSearch = (event) => {
    event.preventDefault();
    searchProducts(searchTerm);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search Marketplace"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
