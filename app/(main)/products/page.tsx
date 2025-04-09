"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductList from "@/components/products/ProductList";
import ProductFilter from "@/components/products/ProductFilter";
import { getProducts } from "@/lib/api";
import PaginationControl from "@/components/PaginationControl";

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

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
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <ProductFilter />
      {loading ? (
        <div className="loading">Loading products...</div>
      ) : error ? (
        <div className="alert alert-error">Error: {error}</div>
      ) : products.length > 0 ? (
        <>
          <ProductList products={products} />
          <div className="mt-8 flex justify-center">
            <PaginationControl
              currentPage={pageNumber}
              totalPages={totalPages}
            />
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </main>
  );
}
