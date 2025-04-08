"use client";

import { Product } from "@/types";
import PaginationControl from "../PaginationControl";

interface ProductsTableProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
}

export default function ProductsTable({
  products,
  currentPage,
  totalPages,
}: ProductsTableProps) {
  if (!products || products.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">No products found.</div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-box bg-gray-100 rounded-lg shadow-md border border-gray-300 p-1">
      <table className="table border border-gray-200">
        <thead className="bg-blue-200 text-gray-800 text-center uppercase border-b-2">
          <tr>
            <th>Product #</th>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <tr
              key={product.productId}
              className="bg-white border-b-gray-300 text-center"
            >
              <td className="py-3 px-6">{idx + 1 + (currentPage - 1) * 10}</td>
              <td className="py-3 px-6">{product.productId}</td>
              <td className="py-3 px-6">
                <div className="flex items-center gap-4">
                  <img
                    src={`data:image/jpeg;base64,${product.productImage}`}
                    alt="Product Image"
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <span className="font-medium text-gray-800">
                    {product.productName}
                  </span>
                </div>
              </td>
              <td className="py-3 px-6">
                Rp{product.productPrice.toLocaleString("id")}
              </td>
              <td className="py-3 px-6">{product.productStock}</td>
              <td className="py-3 px-6">{product.averageReviewScore ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="my-8 flex justify-center">
        <PaginationControl currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
