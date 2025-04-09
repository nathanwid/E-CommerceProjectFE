import AdminOrderDetail from "@/components/admin/AdminOrderDetail";
import React from "react";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <>
      <h1 className="text-2xl mb-8 font-bold">Order Detail</h1>
      <AdminOrderDetail params={params} />
    </>
  );
}
