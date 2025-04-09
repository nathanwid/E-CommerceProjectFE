// src/app/(main)/products/[productId]/actions.ts
'use server';

import { fetchProductDetails } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function refreshProductDetailsAction(productId: string) {
  try {
    // No need to explicitly return the data here if you just want to revalidate
    await fetchProductDetails(productId);
    revalidatePath(`/products/${productId}`); // This will trigger a re-render of the page
  } catch (error) {
    console.error('Error refreshing product details:', error);
    // Optionally handle the error or return an error message
  }
}