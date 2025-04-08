import React from 'react';

interface FilterPageSizeProps {
  onPageSizeChange: (pageSize: number) => void;
  currentPageSize: number;
}

const FilterPageSize: React.FC<FilterPageSizeProps> = ({ onPageSizeChange, currentPageSize }) => {
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(parseInt(event.target.value, 10));
  };

  return (
    <div className="form-control">
      <label htmlFor="pageSize" className="label">
        <span className="label-text">Items per page:</span>
      </label>
      <select
        id="pageSize"
        className="select select-bordered w-full max-w-xs"
        value={currentPageSize}
        onChange={handlePageSizeChange}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

export default FilterPageSize;