// app/(main)/products/[productId]/page.tsx
import React from "react";
import { fetchProductDetails } from "@/lib/api";
import ProductDetails from "@/components/products/ProductDetails";
import { Review, Product } from "@/types/index";
import Head from "next/head";
import Link from "next/link";

// This is now an Async Server Component
async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  let product:
    | (Product & { productDescription?: string; reviews?: Review[] })
    | null = null;
  let error: string | null = null;

  try {
    product = await fetchProductDetails(productId);
  } catch (err: any) {
    console.error("Error fetching product details:", err);
    error = err.message || "Failed to load product details.";
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        Error loading product details: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-8">Loading product details...</div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.productName} - Product Details</title>
      </Head>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-4">{product.productName}</h1>
        <ProductDetails product={product} />
        <div className="mt-8">
          <button>
            <Link
              href={`/products/`}
              className="btn btn-sm btn-outline btn-primary"
            >
              Back
            </Link>
          </button>{" "}
          {}
        </div>
      </div>
    </>
  );
}

export default ProductDetailsPage;
