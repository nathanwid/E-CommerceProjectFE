"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateCategoryForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    categoryName: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.categoryName,
          description: form.description,
        }),
      }
    );

    if (res.ok) {
      alert("Category created!");
      setForm({
        categoryName: "",
        description: "",
      });
      router.refresh();
    } else {
      alert("Failed to create category");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md border mb-8 border-gray-300"
    >
      <div>
        <label
          htmlFor="categoryName"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Category Name
        </label>
        <input
          type="text"
          name="categoryName"
          value={form.categoryName}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
      </div>
      <button
        type="submit"
        className="text-white uppercase bg-slate-800 hover:bg-slate-900 hover:cursor-pointer font-medium rounded-lg px-5 py-2.5"
      >
        Create Category
      </button>
    </form>
  );
}
