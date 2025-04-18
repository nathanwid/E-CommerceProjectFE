import OrderDetail from "@/components/account/OrderDetail";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <>
      <h1 className="text-2xl mb-8 font-bold">Order Detail</h1>
      <OrderDetail params={params} />
    </>
  );
}
