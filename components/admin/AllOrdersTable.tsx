import { auth } from "@/auth";
import React from "react";
import PaginationControl from "../PaginationControl";
import Link from "next/link";
import { Eye } from "lucide-react";

export default async function AllOrdersTable({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const page = resolvedParams.page || "1";
  const status = resolvedParams.status || "";
  const orderState = resolvedParams.orderState || "";

  let data = null;
  let orders = [];
  let errorMessage;

  try {
    const queryParams = new URLSearchParams({ page, status, orderState });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders?${queryParams}`,
      { cache: "no-store" }
    );
    data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || "An unexpected error occurred.");
    }
    orders = data.data;
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Failed to load data.";
  }

  const getStatusBadge = (status: string) => {
    const base = "px-3 py-1 rounded-full text-xs font-semibold";

    switch (status.toLowerCase()) {
      case "pending":
        return (
          <span className={`${base} bg-yellow-200 text-yellow-800`}>
            Pending
          </span>
        );
      case "processing":
        return (
          <span className={`${base} bg-blue-200 text-blue-800`}>
            Processing
          </span>
        );
      case "shipped":
        return (
          <span className={`${base} bg-purple-200 text-purple-800`}>
            Shipped
          </span>
        );
      case "delivered":
        return (
          <span className={`${base} bg-green-200 text-green-800`}>
            Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className={`${base} bg-red-200 text-red-800`}>Cancelled</span>
        );
    }
  };

  return (
    <div className="overflow-x-auto rounded-box bg-gray-100 rounded-lg shadow-md border border-gray-300 mb-8 p-1">
      <table className="table border-gray-200">
        <thead className="bg-blue-200 text-gray-800 text-center uppercase border-b-2">
          <tr>
            <th>Order #</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date Purchased</th>
            <th>Status</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {errorMessage ? (
            <tr>
              <td colSpan={5} className="text-center p-8 bg-white">
                <div className="max-w-sm mx-auto">
                  <div
                    className="p-4 my-8 text-sm text-red-800 rounded-lg bg-red-100"
                    role="alert"
                  >
                    <span>{errorMessage}</span>
                  </div>
                </div>
              </td>
            </tr>
          ) : orders.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-8 bg-white">
                <div className="max-w-sm mx-auto">
                  <div
                    className="p-4 text-sm text-center text-gray-800 rounded-lg bg-gray-100"
                    role="alert"
                  >
                    <span>No orders found.</span>
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            orders.map((order: any, index: number) => (
              <tr key={index} className="bg-white rounded-md border-b-gray-300">
                <td className="py-3 px-6 text-center font-semibold">
                  {index + 1}
                </td>
                <td className="py-3 px-6 text-center">{order.userName}</td>
                <td className="py-3 px-6 text-center">{order.email}</td>
                <td className="py-3 px-6 text-center">{order.phoneNumber}</td>
                <td className="py-3 px-6 text-center">
                  {`${new Date(order.orderDate).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}`}
                </td>
                <td className="py-3 px-6 text-center">
                  {getStatusBadge(order.status)}
                </td>
                <td className="py-3 px-6 text-center">
                  Rp{order.grandTotal.toLocaleString("id")}
                </td>
                <td className="py-3 px-6 h-full">
                  <div className="flex justify-center items-center h-full">
                    <Link
                      href={`/admin/orders/${order.orderId}`}
                      className="rounded-md p-1 bg-gray-200 hover:bg-gray-300 hover:cursor-pointer"
                    >
                      <Eye size={20} className="text-gray-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {!errorMessage && orders.length > 0 && (
        <div className="flex justify-center my-8">
          <PaginationControl
            currentPage={data.currentPage}
            totalPages={data.totalPages}
          />
        </div>
      )}
    </div>
  );
}
