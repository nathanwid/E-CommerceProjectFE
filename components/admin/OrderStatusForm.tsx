"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function OrderStatusForm({
  currentStatus,
  orderId,
}: {
  currentStatus: string;
  orderId: string;
}) {
  const [status, setStatus] = useState(currentStatus.toLowerCase());
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    startTransition(async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (res.ok) {
        setMessage("✅ Status updated successfully.");
        router.refresh();
      } else {
        const err = await res.json();
        setMessage(err.detail || "❌ Failed to update status.");
      }
    });
  };

  const cancelOrder = async () => {
    setMessage("");

    startTransition(async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/${orderId}/cancellation`,
        { method: "PUT" }
      );

      if (res.ok) {
        setStatus("cancelled");
        setMessage("✅ Order cancelled successfully.");
        router.refresh();
      } else {
        const err = await res.json();
        setMessage(err.detail || "❌ Failed to cancel order.");
      }
    });
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md mb-8">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="btn w-full text-left bg-gray-50 border border-gray-300 text-gray-600"
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
        <button
          type="submit"
          disabled={isPending}
          className="btn text-white bg-slate-800 font-medium text-center rounded-lg px-5 py-2.5 uppercase hover:bg-slate-900 disabled:opacity-50"
        >
          {isPending ? "Updating..." : "Update Status"}
        </button>
        <button
          type="button"
          disabled={isPending || status === "cancelled"}
          onClick={cancelOrder}
          className="btn text-white bg-red-600 font-medium text-center rounded-lg px-5 py-2.5 uppercase hover:bg-red-700 disabled:opacity-50"
        >
          {isPending ? "Cancelling..." : "Cancel Order"}
        </button>
        <div className="hidden md:block"></div>
        <div className="md:col-span-5">
          {message && (
            <p className="text-sm text-gray-600 bg-white border border-gray-300 rounded-md p-3 mt-2">
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
