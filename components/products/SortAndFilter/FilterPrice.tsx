

import React, { useState } from 'react';

interface FilterPriceProps {
  onPriceFilterChange: (minPrice: number | null, maxPrice: number | null) => void;
  currentMinPrice: number | null;
  currentMaxPrice: number | null;
}

const FilterPrice: React.FC<FilterPriceProps> = ({ onPriceFilterChange, currentMinPrice, currentMaxPrice }) => {
  const [minPrice, setMinPrice] = useState<number | null>(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState<number | null>(currentMaxPrice);

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value === '' ? null : parseInt(event.target.value, 10));
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value === '' ? null : parseInt(event.target.value, 10));
  };

  const handleApplyPriceFilter = () => {
    onPriceFilterChange(minPrice, maxPrice);
  };

  const handleClearPriceFilter = () => {
    setMinPrice(null);
    setMaxPrice(null);
    onPriceFilterChange(null, null);
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Filter by Price:</span>
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min Price"
          className="input input-bordered w-full max-w-xs"
          value={minPrice === null ? '' : minPrice}
          onChange={handleMinPriceChange}
        />
        <span className="mt-2">-</span>
        <input
          type="number"
          placeholder="Max Price"
          className="input input-bordered w-full max-w-xs"
          value={maxPrice === null ? '' : maxPrice}
          onChange={handleMaxPriceChange}
        />
      </div>
      <div className="mt-2">
        <button className="btn btn-sm btn-primary" onClick={handleApplyPriceFilter}>
          Apply
        </button>
        {currentMinPrice !== null || currentMaxPrice !== null ? (
          <button className="btn btn-sm ml-2" onClick={handleClearPriceFilter}>
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default FilterPrice;