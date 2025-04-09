import React from "react";
import { auth } from "@/auth";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { DeleteCategoryButton } from "../Buttons";

export default async function CategoriesTable() {
  const session = await auth();
  const token = session?.user.token;
  let categories = [];
  let errorMessage;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Failed to fetch users.");
    }

    categories = await res.json();
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Something went wrong.";
  }

  return (
    <div className="overflow-x-auto rounded-box bg-gray-100 rounded-lg shadow-md border border-gray-300 p-1 mb-8">
      <table className="table border border-gray-200">
        <thead className="bg-blue-200 text-gray-800 text-center uppercase border-b-2">
          <tr>
            <th className="py-3 px-6 text-center">Category #</th>
            <th className="py-3 px-6 text-center">Name</th>
            <th className="py-3 px-6 text-center">Description</th>
            <th className="py-3 px-6 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {errorMessage ? (
            <tr>
              <td colSpan={4} className="text-center p-8 bg-white">
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
          ) : categories.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-8 bg-white">
                <div className="max-w-sm mx-auto">
                  <div
                    className="p-4 text-sm text-center text-gray-800 rounded-lg bg-gray-100"
                    role="alert"
                  >
                    <span>No categories found.</span>
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            categories.map((category: any, index: number) => (
              <tr
                key={index}
                className="bg-white border-b-gray-300 text-center"
              >
                <td className="py-3 px-6 text-center font-semibold">
                  {index + 1}
                </td>
                <td className="py-3 px-6 text-center">
                  {category.categoryName}
                </td>
                <td className="py-3 px-6 text-center">
                  {category.description}
                </td>
                <td className="py-3 px-6 h-full">
                  <div className="flex justify-center items-center gap-2">
                    <Link
                      href={`/admin/categories/${category.categoryId}`}
                      className="rounded-md p-1 bg-orange-400 hover:bg-orange-500"
                    >
                      <Pencil size={20} color="#fff" />
                    </Link>
                    <DeleteCategoryButton categoryId={category.categoryId} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
