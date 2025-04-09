"use client";

import { Product } from "@/types";
import PaginationControl from "../PaginationControl";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { DeleteProductButton } from "../Buttons";

interface ProductsTableProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onProductDeleted?: () => void;
}

export default function ProductsTable({
  products,
  currentPage,
  totalPages,
  onProductDeleted,
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
            <th className="py-3 px-6 text-center">Product #</th>
            <th className="py-3 px-6 text-center">ID</th>
            <th className="py-3 px-6 text-center">Name</th>
            <th className="py-3 px-6 text-center">Price</th>
            <th className="py-3 px-6 text-center">Stock</th>
            <th className="py-3 px-6 text-center">Score</th>
            <th className="py-3 px-6 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <tr
              key={product.productId}
              className="bg-white border-b-gray-300 text-center"
            >
              <td className="py-3 px-6 text-center font-semibold">
                {idx + 1 + (currentPage - 1) * 10}
              </td>
              <td className="py-3 px-6 text-center">{product.productId}</td>
              <td className="py-3 px-6 text-center">
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
              <td className="py-3 px-6 text-center">
                Rp{product.productPrice.toLocaleString("id")}
              </td>
              <td className="py-3 px-6 text-center">{product.productStock}</td>
              <td className="py-3 px-6 text-center">
                {product.averageReviewScore ?? 0}
              </td>
              <td className="py-3 px-6 h-full">
                <div className="flex justify-center items-center gap-2">
                  <Link
                    href={`/admin/products/${product.productId}`}
                    className="rounded-md p-1 bg-orange-400 hover:bg-orange-500"
                  >
                    <Pencil size={20} color="#fff" />
                  </Link>
                  <DeleteProductButton
                    productId={product.productId}
                    onDeleted={onProductDeleted}
                  />
                </div>
              </td>
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
