import { auth } from "@/auth";
import UpdateProductForm from "@/components/admin/UpdateProductForm";
import React from "react";

export default async function UpdateProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const token = session?.user.token;
  return (
    <>
      <h1 className="text-2xl mb-8 font-bold">Update Product</h1>
      <UpdateProductForm token={token} productId={id} />
    </>
  );
}
