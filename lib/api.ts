// lib/api.ts
import { PaginatedProductResponse } from "@/types"; // Adjust path if needed

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Use environment variable

interface GetProductsParams {
  categoryName?: string;
  productName?: string;
  minPrice?: number;
  maxPrice?: number;
  orderBy?: string;
  orderState?: string;
  pageNumber?: number;
  pageSize?: number;
}

export async function getProducts(
  params: GetProductsParams = {}
): Promise<PaginatedProductResponse> {
  // Set default pagination if not provided
  const pageNumber = params.pageNumber || 1;
  const pageSize = params.pageSize || 25; // Or your desired default page size

  const queryParams = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  });

  // Add other optional parameters if they exist
  if (params.categoryName) queryParams.set("categoryName", params.categoryName);
  if (params.productName) queryParams.set("productName", params.productName);
  if (params.minPrice !== undefined)
    queryParams.set("minPrice", params.minPrice.toString());
  if (params.maxPrice !== undefined)
    queryParams.set("maxPrice", params.maxPrice.toString());
  if (params.orderBy) queryParams.set("orderBy", params.orderBy);
  if (params.orderState) queryParams.set("orderState", params.orderState);

  const url = `${API_BASE_URL}/api/ControllerProducts/product/view/all?${queryParams.toString()}`;
  console.log(`Workspaceing products from: ${url}`); // For debugging

  try {
    const response = await fetch(url, {
      // Add headers if needed (e.g., Authorization, Content-Type)
      // headers: { 'Authorization': 'Bearer YOUR_TOKEN' },
      cache: "no-store", // Ensure fresh data for SSR-like behavior
    });

    if (!response.ok) {
      // Log more details for server-side debugging
      const errorBody = await response.text();
      console.error(`API Error (${response.status}): ${errorBody}`);
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }

    const data: PaginatedProductResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return a default structure or re-throw to be caught by Next.js error handling
    // Depending on how you want to handle errors on the page
    return { products: [], totalCount: 0 };
    // Or: throw new Error('Could not connect to API');
  }
}
