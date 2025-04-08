import { Metadata } from 'next';
import ProductsPageClient from './ProductsPageClient';

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse our wide selection of products.',
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
