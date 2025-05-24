import React, { useState } from 'react';

const FilterBar = () => {
  const [filters, setFilters] = useState({
    category: 'Football',
    sort: 'Best Match',
    size: '',
    condition: '',
    price: '',
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-wrap gap-2 p-4 ">
      <button className="px-4 py-2 bg-white text-black border rounded-full ">
        {filters.category}
      </button>

      <select
        className="flex wrap border rounded-full"
        onChange={e => handleFilterChange('sort', e.target.value)}
        value={filters.sort}
      >
        <option>Best Match</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
      </select>

      <select className="flex wrap border rounded-full" onChange={e => handleFilterChange('brand', e.target.value)}>
        <option>Brand</option>
        <option>Nike</option>
        <option>Adidas</option>
      </select>

      <select className="flex wrap border rounded-full" onChange={e => handleFilterChange('size', e.target.value)}>
        <option>Size</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
      </select>

      <select className="flex wrap border rounded-full" onChange={e => handleFilterChange('condition', e.target.value)}>
        <option>Condition</option>
        <option>New</option>
        <option>Used</option>
      </select>

      <select className="px-4 py-2 border rounded-full" onChange={e => handleFilterChange('price', e.target.value)}>
        <option>Price</option>
        <option>$0 - $50</option>
        <option>$50 - $100</option>
      </select>
      
    </div>
  );
};

export default FilterBar;
