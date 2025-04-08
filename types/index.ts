// types/index.ts
export interface Product {
    productId: string;
    productName: string;
    productImage: string | null; // Can be null
    productPrice: number;
    productStock: number;
    averageReviewScore: number | null; // Can be null
  }
  
  export interface PaginatedProductResponse {
    products: Product[];
    totalCount: number;
  }
  
