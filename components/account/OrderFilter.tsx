"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function OrderFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState({
    status: searchParams.get("status") || "",
    orderState: searchParams.get("orderState") || "asc",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    setFilters({
      status: "",
      orderState: "",
    });
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md mb-8">
      <h2 className="text-lg font-semibold mb-4">Filter Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="btn w-full text-left bg-gray-50 border border-gray-300 text-gray-600"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          name="orderState"
          value={filters.orderState}
          onChange={handleChange}
          className="btn w-full text-left bg-gray-50 border border-gray-300 text-gray-600"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button
          onClick={resetFilters}
          className="btn text-white bg-slate-800 font-medium text-center rounded-lg px-5 py-2.5 uppercase hover:bg-slate-900"
        >
          Reset Filters
        </button>
        <button
          onClick={applyFilters}
          className="btn text-white bg-slate-800 font-medium text-center rounded-lg px-5 py-2.5 uppercase hover:bg-slate-900"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
