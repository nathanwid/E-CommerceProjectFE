"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function ProductFilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState({
    categoryName: searchParams.get("categoryName") || "",
    productName: searchParams.get("productName") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    pageSize: searchParams.get("pageSize") || "",
    orderBy: searchParams.get("orderBy") || "",
    orderState: searchParams.get("orderState") || "asc",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
    });

    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    setFilters({
      categoryName: "",
      productName: "",
      minPrice: "",
      maxPrice: "",
      pageSize: "",
      orderBy: "",
      orderState: "",
    });
    replace(pathname, { scroll: false });
  };

  return (
    <>
      <div className="collapse bg-white border-gray-300 border rounded-lg shadow-md mb-8">
        <input type="checkbox" />
        <div className="collapse-title font-semibold">
          Use filters to streamline your product discovery!
        </div>
        <div className="collapse-content text-sm">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2">
            <input
              type="text"
              name="categoryName"
              placeholder="Category Name"
              value={filters.categoryName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
            />

            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={filters.productName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
            />

            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
            />

            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
            />

            <select
              name="pageSize"
              value={filters.pageSize}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
            >
              <option value="">-- Select --</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>

            <select
              name="orderBy"
              value={filters.orderBy}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
            >
              <option value="">-- Select --</option>
              <option value="productName">Product Name</option>
              <option value="categoryName">Category Name</option>
              <option value="price">Price</option>
            </select>

            <select
              name="orderState"
              value={filters.orderState}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
            >
              <option value="">-- Select --</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-8 mb-4">
            <button
              onClick={resetFilters}
              className="btn text-white bg-slate-800 font-medium text-center rounded-xl px-5 py-2.5 uppercase hover:bg-slate-900"
            >
              Reset Filters
            </button>
            <button
              onClick={applyFilters}
              className="btn text-white bg-slate-800 font-medium text-center rounded-xl px-5 py-2.5 uppercase hover:bg-slate-900"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
