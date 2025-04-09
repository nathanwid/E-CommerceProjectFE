import CategoriesTable from "@/components/admin/CategoriesTable";
import UpdateCategoryForm from "@/components/admin/UpdateCategoryForm";
import React from "react";

export default async function UpdateCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <h1 className="text-2xl mb-8 font-bold">Update Category</h1>
      <UpdateCategoryForm categoryId={id} />
    </>
  );
}
