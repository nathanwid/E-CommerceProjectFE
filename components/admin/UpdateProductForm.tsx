"use client";

import { ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  categoryId: string;
  categoryName: string;
}

interface Product {
  productId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string; // existing image preview
}

export default function UpdateProductForm({
  token,
  productId,
}: {
  token?: string;
  productId: string;
}) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<Product>({
    productId,
    categoryId: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imageUrl: "",
  });
  const [newImage, setNewImage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/${productId}`
          ),
        ]);

        const categories = await catRes.json();
        const product = await prodRes.json();

        console.log(product);

        setCategories(categories);
        setForm((prev) => ({
          ...prev,
          ...{
            categoryId: product.categoryId ?? "",
            name: product.productName ?? "",
            description: product.productDescription ?? "",
            price: product.productPrice ?? 0,
            stock: product.productStock ?? 0,
            imageUrl: product.productImage ?? "",
          },
        }));
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, [productId, token]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(",")[1];
      setNewImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      productId: form.productId,
      categoryId: form.categoryId,
      name: form.name,
      description: form.description,
      price: parseFloat(String(form.price)),
      stock: parseInt(String(form.stock)),
    };

    if (newImage) {
      payload.images = newImage;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) {
      alert("Product updated!");
      router.push("/admin/products");
    } else {
      alert("Failed to update product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-300"
    >
      <h2 className="text-lg font-semibold">Update Product</h2>

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

          {newImage ? (
            <img
              src={`data:image/*;base64,${newImage}`}
              alt="Preview"
              className="h-16 w-16 object-cover rounded border"
            />
          ) : form.imageUrl ? (
            <img
              src={`data:image/*;base64,${form.imageUrl}`}
              alt="Existing"
              className="h-16 w-16 object-cover rounded border"
            />
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        className="text-white uppercase bg-slate-800 hover:bg-slate-900 hover:cursor-pointer font-medium rounded-lg px-5 py-2.5"
      >
        Update Product
      </button>
    </form>
  );
}
