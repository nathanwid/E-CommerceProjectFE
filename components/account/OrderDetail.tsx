import React from "react";

export default async function OrderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orderId = id;

  let data = null;
  let errorMessage;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/${orderId}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch order");
    data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || "An unexpected error occurred.");
    }
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
    <>
      <div className="flex flex-col md:flex-row justify-between gap-4 bg-white p-6 rounded-lg shadow-md border border-gray-300 mb-8">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-semibold text-gray-800">{data.orderId}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Order Date</p>
          <p className="font-semibold text-gray-800">
            {new Date(data.orderDate).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}{" "}
            {new Date(data.orderDate).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}{" "}
            WIB
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-semibold text-gray-800 capitalize">
            {getStatusBadge(data.status)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Amount</p>
          <p className="font-semibold text-gray-800">
            Rp{data.grandTotal.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
      <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-md p-1">
        <div className="bg-blue-200 rounded-md border border-gray-200">
          <div className="py-4 px-6 border-b border-gray-300 flex justify-between items-center">
            <h2 className="text-sm font-bold text-gray-800 uppercase">
              Order Items ({data.orderItems.length})
            </h2>
          </div>
          {data.orderItems.length === 0 ? (
            <div className="p-8 rounded-md bg-white">
              <p className="text-center text-gray-600">
                No items in this order.
              </p>
            </div>
          ) : (
            <ul>
              {data.orderItems.map((item: any, index: number) => (
                <li
                  key={index}
                  className="flex justify-between items-center px-8 py-4 border-t border-gray-200 rounded-md bg-white"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.productName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    Rp{item.subtotal.toLocaleString("id-ID")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
