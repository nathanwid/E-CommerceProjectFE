import CategoriesTable from "@/components/admin/CategoriesTable";
import CreateCategoryForm from "@/components/admin/CreateCategoryForm";
import React from "react";

export default function CategoriesPage() {
  return (
    <>
      <h1 className="text-2xl mb-8 font-bold">Categories</h1>
      <CreateCategoryForm />
      <CategoriesTable />
    </>
  );
}
