// app/products/page.tsx
'use client'; // This is a client component

import { getProducts } from '@/lib/api';
import ProductList from '@/components/products/ProductList';
import { SortOptions, FilterPrice, FilterSearch, FilterPageSize } from '@/components/products/SortAndFilter';
import PaginationControl from '@/components/PaginationControlProduct';
import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse our wide selection of products.',
};

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

  // Filter and Sort State
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [orderState, setOrderState] = useState<string | null>('asc');
  const [pageSize, setPageSize] = useState(16);
  const [pageNumber, setPageNumber] = useState(1);

  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = (newParams: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(newParams)) {
      if (value !== null) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    }
    return params.toString();
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    const queryParams: Record<string, string | number | null> = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      productName: searchTerm,
      minPrice: minPrice,
      maxPrice: maxPrice,
      orderBy: orderBy,
      orderState: orderState,
    };

    try {
      const data: ApiResponse = await getProducts(queryParams);
      setProducts(data.products);
      setTotalCount(data.totalCount);
    } catch (e: any) {
      setError(e.message);
      setProducts([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initialize state from URL params on initial load
    const initialPage = searchParams.get('page');
    const initialPageSize = searchParams.get('pageSize');
    const initialSearchTerm = searchParams.get('productName');
    const initialMinPrice = searchParams.get('minPrice');
    const initialMaxPrice = searchParams.get('maxPrice');
    const initialOrderBy = searchParams.get('orderBy');
    const initialOrderState = searchParams.get('orderState');

    if (initialPage) setPageNumber(parseInt(initialPage, 10));
    if (initialPageSize) setPageSize(parseInt(initialPageSize, 10));
    setSearchTerm(initialSearchTerm);
    setMinPrice(initialMinPrice ? parseInt(initialMinPrice, 10) : null);
    setMaxPrice(initialMaxPrice ? parseInt(initialMaxPrice, 10) : null);
    setOrderBy(initialOrderBy);
    setOrderState(initialOrderState || 'asc');

  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
    // Update URL params whenever filter/sort/pagination changes
    const newQuery = createQueryString({
      page: pageNumber,
      pageSize: pageSize,
      productName: searchTerm,
      minPrice: minPrice,
      maxPrice: maxPrice,
      orderBy: orderBy,
      orderState: orderState,
    });
    router.push(`/products?${newQuery}`);
  }, [searchTerm, minPrice, maxPrice, orderBy, orderState, pageNumber, pageSize, router]);

  const handleSortChange = (newOrderBy: string, newOrderState: string) => {
    setOrderBy(newOrderBy);
    setOrderState(newOrderState);
    setPageNumber(1);
  };

  const handlePriceFilterChange = (newMinPrice: number | null, newMaxPrice: number | null) => {
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
    setPageNumber(1);
  };

  const handleSearchChange = (newSearchTerm: string | null) => {
    setSearchTerm(newSearchTerm);
    setPageNumber(1);
  };

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPageNumber(1);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="mb-4 flex flex-wrap gap-4">
        <FilterSearch onSearchChange={handleSearchChange} currentSearchTerm={searchTerm} />
        <FilterPrice
          onPriceFilterChange={handlePriceFilterChange}
          currentMinPrice={minPrice}
          currentMaxPrice={maxPrice}
        />
        <SortOptions
          onSortChange={handleSortChange}
          currentOrderBy={orderBy}
          currentOrderState={orderState}
        />
        <FilterPageSize onPageSizeChange={handlePageSizeChange} currentPageSize={pageSize} />
        {/* Category Filter would go here if implemented */}
      </div>

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : error ? (
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2V3m2 18l-2-2m0 0l-2-2m2 2v-8m-8 5h9l3 3m-3-11l-3-3H11m3 3v10M11 14l2-2m0 0l2-2m-2 2V3m2 18l-2-2m0 0l-2-2m2 2v-8m-8 5h9l3 3m-3-11l-3-3H11m3 3v10z" /></svg>
          <span>Error: {error}</span>
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <>
              <ProductList products={products} />
              <div className="mt-8 flex justify-center">
                <div className="join">
                  <PaginationControl
                    currentPage={pageNumber}
                    totalPages={totalPages}
                  />
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </>
      )}
    </main>
  );
}