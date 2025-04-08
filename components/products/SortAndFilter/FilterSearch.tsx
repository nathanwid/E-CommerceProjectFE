

import React, { useState, useEffect } from 'react';

interface FilterSearchProps {
  onSearchChange: (productName: string | null) => void;
  currentSearchTerm: string | null;
}

const FilterSearch: React.FC<FilterSearchProps> = ({ onSearchChange, currentSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState<string | null>(currentSearchTerm);

  useEffect(() => {
    // Debounce the search input to avoid excessive API calls
    const timer = setTimeout(() => {
      onSearchChange(searchTerm === '' ? null : searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearchChange]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm(null);
    onSearchChange(null);
  };

  return (
    <div className="form-control">
      <label htmlFor="search" className="label">
        <span className="label-text">Search Product:</span>
      </label>
      <div className="relative">
        <input
          type="text"
          id="search"
          placeholder="Enter product name"
          className="input input-bordered w-full max-w-xs"
          value={searchTerm || ''}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <button
            className="btn btn-sm absolute top-1/2 right-2 -translate-y-1/2"
            onClick={handleClearSearch}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterSearch;