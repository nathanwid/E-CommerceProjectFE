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

  // Construct the current value for the select input
  const currentValue = currentOrderBy && currentOrderState ? `${currentOrderBy}:${currentOrderState}` : '';

  return (
    <div className="form-control">
      <label htmlFor="sort" className="label">
        <span className="label-text">Sort By:</span>
      </label>
      <select
        id="sort"
        className="select select-bordered w-full max-w-xs"
        value={currentValue}
        onChange={handleSortChange}
      >
        <option value=":">None</option>
        <option value="productName:asc">Name (A-Z)</option>
        <option value="productName:desc">Name (Z-A)</option>
        <option value="price:asc">Price (Low to High)</option>
        <option value="price:desc">Price (High to Low)</option>
        <option value="stock:asc">Stock (Low to High)</option>
        <option value="stock:desc">Stock (High to Low)</option>
        {/* You can add more sorting options based on your API */}
      </select>
    </div>
  );
};

export default SortOptions;