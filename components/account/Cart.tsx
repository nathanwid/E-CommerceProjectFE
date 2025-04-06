import { auth } from "@/auth";
import React from "react";
import {
  CheckoutButton,
  DecreaseQuantityButton,
  IncreaseQuantityButton,
  RemoveCartItemButton,
} from "../Buttons";

export default async function Cart() {
  const session = await auth();
  const cartId = session?.user.cartId;
  const userId = session?.user.id;
  let data = null;
  let cartItems = [];
  let errorMessage;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/${cartId}`
    );
    data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || "An unexpected error occurred.");
    }
    cartItems = data.cartItems;
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Failed to load data.";
  }

  return (
    <div className="overflow-x-auto rounded-box bg-gray-100 rounded-lg shadow-md border border-gray-300">
      <table className="table">
        <thead className="bg-blue-200 text-gray-800 text-center uppercase">
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {errorMessage ? (
            <tr>
              <td colSpan={6} className="text-center p-8 bg-white rounded-md">
                <div className="max-w-sm mx-auto">
                  <div
                    className="p-4 my-8 text-sm text-red-800 rounded-lg bg-red-100"
                    role="alert"
                  >
                    <span>{errorMessage}</span>
                  </div>
                </div>
              </td>
            </tr>
          ) : cartItems.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-8 bg-white rounded-md">
                <div className="max-w-sm mx-auto">
                  <div
                    className="p-4 text-sm text-center text-gray-800 rounded-lg bg-gray-100"
                    role="alert"
                  >
                    <span>No items in your cart.</span>
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            cartItems.map((item: any, index: number) => (
              <tr
                key={index}
                className="bg-white rounded-md border border-gray-100"
              >
                <td>
                  <div className="flex items-center gap-4">
                    <img
                      src={`data:image/jpeg;base64,${item.productImage}`}
                      alt="Product Image"
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <span className="font-medium text-gray-800">
                      {item.productName}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  Rp{item.productPrice.toLocaleString("id")}
                </td>
                <td className="py-3 px-6 align-middle text-center">
                  <div className="flex items-center justify-center gap-2">
                    <DecreaseQuantityButton
                      cartId={cartId}
                      itemId={item.id}
                      quantity={item.quantity}
                    />
                    <span className="w-4 text-center">{item.quantity}</span>
                    <IncreaseQuantityButton
                      cartId={cartId}
                      itemId={item.id}
                      quantity={item.quantity}
                    />
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  Rp{(item.productPrice * item.quantity).toLocaleString("id")}
                </td>
                <td>
                  <RemoveCartItemButton cartId={cartId} itemId={item.id} />
                </td>
              </tr>
            ))
          )}
          {cartItems.length > 0 && (
            <tr className="bg-white rounded-md border border-gray-100">
              <td
                colSpan={3}
                className="py-3 px-6 text-right text-md font-semibold uppercase"
              >
                Subtotal
              </td>
              <td className="py-3 px-6 text-center text-md font-semibold">
                Rp
                {cartItems
                  .reduce(
                    (sum: number, item: any) =>
                      sum + item.productPrice * item.quantity,
                    0
                  )
                  .toLocaleString("id")}
              </td>
              <td className="py-3 px-6"></td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-center">
        {cartItems.length > 0 && (
          <div className="my-8 mx-8">
            <CheckoutButton userId={userId} />
          </div>
        )}
      </div>
    </div>
  );
}
