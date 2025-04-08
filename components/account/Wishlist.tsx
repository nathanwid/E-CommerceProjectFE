import { auth } from "@/auth";
import React from "react";
import { RemoveWishlistItemButton } from "../Buttons";

export default async function Wishlist() {
  const session = await auth();
  const wishlistId = session?.user.wishlistId;
  let data = null;
  let wishlistItems = [];
  let errorMessage;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist/${wishlistId}`
    );
    data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || "An unexpected error occurred.");
    }
    wishlistItems = data.wishlistItems;
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Failed to load data.";
  }

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-md p-1">
      <ul className="list bg-blue-200 rounded-md border border-gray-200">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Things you've saved for later
        </li>
        {errorMessage ? (
          <li className="p-8 rounded-md bg-white">
            <div className="max-w-sm mx-auto">
              <div
                className="p-4 my-8 text-sm text-red-800 rounded-lg bg-red-100"
                role="alert"
              >
                <span>{errorMessage}</span>
              </div>
            </div>
          </li>
        ) : wishlistItems.length === 0 ? (
          <li className="p-8 rounded-md bg-white">
            <div className="max-w-sm mx-auto">
              <div
                className="p-4 text-sm text-center text-gray-800 rounded-lg bg-gray-100"
                role="alert"
              >
                <span>No items in your wishlist.</span>
              </div>
            </div>
          </li>
        ) : (
          wishlistItems.map((item: any, index: number) => (
            <li key={index} className="list-row rounded-md py-4 px-8 bg-white">
              <div>
                <img
                  src={`data:image/jpeg;base64,${item.productImage}`}
                  alt="Product Image"
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
              <div>
                <div>
                  <h1 className="text-xl font-medium text-gray-800">
                    {item.productName}
                  </h1>
                </div>
                <div>
                  <h2 className="text-lg font-normal opacity-60">
                    Rp{item.productPrice.toLocaleString("id")}
                  </h2>
                </div>
              </div>
              <RemoveWishlistItemButton
                wishlistId={wishlistId}
                itemId={item.itemId}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
