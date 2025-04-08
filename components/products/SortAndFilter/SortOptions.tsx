

import React from 'react';

interface SortOptionsProps {
  onSortChange: (orderBy: string, orderState: string) => void;
  currentOrderBy: string | null;
  currentOrderState: string | null;
}

const SortOptions: React.FC<SortOptionsProps> = ({ onSortChange, currentOrderBy, currentOrderState }) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [orderBy, orderState] = event.target.value.split(':');
    onSortChange(orderBy, orderState);
  };

  return (
    <div className="form-control">
      <label htmlFor="sort" className="label">
        <span className="label-text">Sort By:</span>
      </label>
      <select
        id="sort"
        className="select select-bordered w-full max-w-xs"
        value={`<span class="math-inline">\{currentOrderBy \|\| ''\}\:</span>{currentOrderState || ''}`}
        onChange={handleSortChange}
      >
        <option value="">None</option>
        <option value="productName:asc">Name (A-Z)</option>
        <option value="productName:desc">Name (Z-A)</option>
        <option value="productPrice:asc">Price (Low to High)</option>
        <option value="productPrice:desc">Price (High to Low)</option>
        <option value="productStock:asc">Stock (Low to High)</option>
        <option value="productStock:desc">Stock (High to Low)</option>
        {/* You can add more sorting options based on your API */}
      </select>
    </div>
  );
};

export default SortOptions;