"use client";

import { ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  categoryId: string;
  categoryName: string;
}

export default function CreateProductForm({ token }: { token?: string }) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    images: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(",")[1];
      setForm((prev) => ({ ...prev, images: base64String }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      categoryId: form.categoryId,
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
    };

    if (form.images) {
      const base64 = form.images.split(",")[1];
      payload.images = base64;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) {
      alert("Product created!");
      setForm({
        categoryId: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        images: "",
      });
      router.push("/admin/products");
    } else {
      alert("Failed to create product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-300"
    >
      <h2 className="text-lg font-semibold">Create New Product</h2>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Category
        </label>
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Price
        </label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          step="0.01"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Stock
        </label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Product Image (optional)
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1 text-white uppercase bg-slate-800 hover:bg-slate-900 hover:cursor-pointer font-medium rounded-lg px-5 py-2.5">
            <ImagePlus size={20} color="#fff" />
            Upload
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {form.images && (
            <img
              src={form.images}
              alt="Preview"
              className="h-16 w-16 object-cover rounded border"
            />
          )}
        </div>
      </div>

      <button
        type="submit"
        className="text-white uppercase bg-slate-800 hover:bg-slate-900 hover:cursor-pointer font-medium rounded-lg px-5 py-2.5"
      >
        Create Product
      </button>
    </form>
  );
}
