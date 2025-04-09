"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductList from "@/components/products/ProductList";
import ProductFilter from "@/components/products/ProductFilter";
import { getProducts } from "@/lib/api";
import PaginationControl from "@/components/PaginationControl";
import ProductsTable from "@/components/admin/ProductsTable";
import Link from "next/link";
import { Plus } from "lucide-react";

interface Product {
  productId: string;
  productName: string;
  productImage: string | null;
  productPrice: number;
  productStock: number;
  averageReviewScore: number | null;
}

interface ApiResponse {
  products: Product[];
  totalCount: number;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const pageNumber = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "25", 10);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    const queryParams = {
      pageNumber,
      pageSize,
      categoryName: searchParams.get("categoryName") || undefined,
      productName: searchParams.get("productName") || undefined,
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      orderBy: searchParams.get("orderBy") || undefined,
      orderState: searchParams.get("orderState") || "asc",
    };

    try {
      const data: ApiResponse = await getProducts(queryParams);
      setProducts(data.products);
      setTotalCount(data.totalCount);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/admin/products/create"
          className="flex items-center gap-1 text-white uppercase bg-slate-800 hover:bg-slate-900 hover:cursor-pointer font-medium rounded-lg px-5 py-2.5"
        >
          <Plus size={20} color="#fff" />
          Create
        </Link>
      </div>
      <ProductFilter />
      {loading ? (
        <div className="loading">Loading products...</div>
      ) : error ? (
        <div className="alert alert-error">Error: {error}</div>
      ) : products.length > 0 ? (
        <>
          <ProductsTable
            products={products}
            currentPage={pageNumber}
            totalPages={totalPages}
            onProductDeleted={fetchProducts}
          />
        </>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </main>
  );
}
