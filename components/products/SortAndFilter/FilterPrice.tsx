import React, { useState } from 'react';

interface FilterPriceProps {
  onPriceFilterChange: (minPrice: number | null, maxPrice: number | null) => void;
  currentMinPrice: number | null;
  currentMaxPrice: number | null;
}

const FilterPrice: React.FC<FilterPriceProps> = ({ onPriceFilterChange, currentMinPrice, currentMaxPrice }) => {
  const [minPrice, setMinPrice] = useState<number | null>(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState<number | null>(currentMaxPrice);
  const [errors, setErrors] = useState<{minPrice?: string; maxPrice?: string}>({});

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMinPrice(value === '' ? null : (isNaN(parseInt(value, 10)) ? null : parseInt(value, 10)));
    
    // Clear any existing error when the value changes
    if (errors.minPrice) {
      setErrors(prev => ({ ...prev, minPrice: undefined }));
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMaxPrice(value === '' ? null : (isNaN(parseInt(value, 10)) ? null : parseInt(value, 10)));
    
    // Clear any existing error when the value changes
    if (errors.maxPrice) {
      setErrors(prev => ({ ...prev, maxPrice: undefined }));
    }
  };

  const validatePriceInputs = (): boolean => {
    const newErrors: {minPrice?: string; maxPrice?: string} = {};
    let isValid = true;

    // Add validation for minimum price
    if (minPrice === null && maxPrice !== null) {
      newErrors.minPrice = "Please enter a minimum price";
      isValid = false;
    }

    // Add validation for maximum price
    if (maxPrice === null && minPrice !== null) {
      newErrors.maxPrice = "Please enter a maximum price";
      isValid = false;
    }

    // Optional: validate min price is less than max price
    if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
      newErrors.minPrice = "Min price cannot be greater than max price";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleApplyPriceFilter = () => {
    if (validatePriceInputs()) {
      onPriceFilterChange(minPrice, maxPrice);
    }
  };

  const handleClearPriceFilter = () => {
    setMinPrice(null);
    setMaxPrice(null);
    setErrors({});
    onPriceFilterChange(null, null);
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Filter by Price:</span>
      </label>
      <div className="flex gap-2">
        <div className="w-full max-w-xs">
          <input
            type="number"
            placeholder="Min Price"
            className={`input input-bordered w-full ${errors.minPrice ? 'input-error' : ''}`}
            value={minPrice === null ? '' : minPrice}
            onChange={handleMinPriceChange}
          />
          {errors.minPrice && (
            <div className="text-error text-xs mt-1">{errors.minPrice}</div>
          )}
        </div>
        <span className="mt-2">-</span>
        <div className="w-full max-w-xs">
          <input
            type="number"
            placeholder="Max Price"
            className={`input input-bordered w-full ${errors.maxPrice ? 'input-error' : ''}`}
            value={maxPrice === null ? '' : maxPrice}
            onChange={handleMaxPriceChange}
          />
          {errors.maxPrice && (
            <div className="text-error text-xs mt-1">{errors.maxPrice}</div>
          )}
        </div>
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