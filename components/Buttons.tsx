"use client";

import { Eye, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

export function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full text-white text-center uppercase bg-slate-800 hover:bg-slate-900 font-medium rounded-lg px-5 py-2.5"
    >
      {pending ? "Registering" : "Register"}
    </button>
  );
}

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full text-white text-center uppercase bg-slate-800 hover:bg-slate-900 font-medium rounded-lg px-5 py-2.5"
    >
      {pending ? "Authenticating" : "Sign In"}
    </button>
  );
}

export function DeleteWishlistButton({
  wishlistId,
  itemId,
}: {
  wishlistId?: string;
  itemId: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist/${wishlistId}/items/${itemId}`,
        {
          method: "DELETE",
        }
      );
      router.refresh();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <button
      className="btn bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white border font-semibold text-center rounded-md px-3 py-1.5 uppercase"
      onClick={() => handleDelete()}
    >
      <Trash2 className="inline-block" size={16} /> Remove
    </button>
  );
}

export function RemoveWishlistItemButton({
  wishlistId,
  itemId,
}: {
  wishlistId?: string;
  itemId: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist/${wishlistId}/items/${itemId}`,
        {
          method: "DELETE",
        }
      );
      router.refresh();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <button
      className="btn bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white border font-semibold text-center rounded-md px-3 py-1.5 uppercase"
      onClick={() => handleDelete()}
    >
      <Trash2 className="inline-block" size={16} /> Remove
    </button>
  );
}

export function DecreaseQuantityButton({
  cartId,
  itemId,
  quantity,
}: {
  cartId?: string;
  itemId: string;
  quantity: number;
}) {
  const router = useRouter();
  const handleDecrease = async () => {
    try {
      if (quantity <= 1) {
        return;
      }
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/${cartId}/items/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: quantity - 1 }),
        }
      );
      router.refresh();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <button
      onClick={() => handleDecrease()}
      className="rounded-md p-1 bg-gray-200 hover:bg-gray-300 hover:cursor-pointer"
    >
      <Minus size={16} />
    </button>
  );
}

export function IncreaseQuantityButton({
  cartId,
  itemId,
  quantity,
}: {
  cartId?: string;
  itemId: string;
  quantity: number;
}) {
  const router = useRouter();
  const handleIncrease = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/${cartId}/items/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: quantity + 1 }),
        }
      );
      router.refresh();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <button
      onClick={() => handleIncrease()}
      className="rounded-md p-1 bg-gray-200 hover:bg-gray-300 hover:cursor-pointer"
    >
      <Plus size={16} />
    </button>
  );
}

export function RemoveCartItemButton({
  cartId,
  itemId,
}: {
  cartId?: string;
  itemId: string;
}) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/${cartId}/items/${itemId}`,
        {
          method: "DELETE",
        }
      );
      router.refresh();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <button
      className="rounded-md p-1 bg-red-600 hover:bg-red-700 hover:cursor-pointer"
      onClick={() => handleDelete()}
    >
      <Trash2 size={20} color="#fff" />
    </button>
  );
}

export function CheckoutButton({ userId }: { userId?: string }) {
  const router = useRouter();
  const handleCheckout = async () => {
    try {
      const addressRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/address/user/${userId}`
      );

      if (!addressRes.ok) {
        alert("Please add your address before checking out.");
        router.push("/account/profile");
      }

      const data = await addressRes.json();
      const { addressLine1, addressLine2, city, postalCode, country } = data;

      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            addressLine1,
            addressLine2,
            city,
            postalCode,
            country,
          }),
        }
      );
      if (orderRes.ok) {
        alert("Order placed successfully!");
        router.refresh();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <button
      onClick={() => handleCheckout()}
      className="w-full text-white text-center uppercase bg-slate-800 hover:bg-slate-900 hover:cursor-pointer font-medium rounded-lg px-5 py-2.5"
    >
      Checkout
    </button>
  );
}

export function DeleteCategoryButton({ categoryId }: { categoryId?: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories/${categoryId}`,
        {
          method: "DELETE",
        }
      );
      router.refresh();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <button
      className="rounded-md p-1 bg-red-600 hover:bg-red-700 hover:cursor-pointer"
      onClick={() => handleDelete()}
    >
      <Trash2 size={20} color="#fff" />
    </button>
  );
}

export function DeleteProductButton({
  productId,
  onDeleted,
}: {
  productId?: string;
  onDeleted?: () => void;
}) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (onDeleted) {
        onDeleted();
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <button
      className="rounded-md p-1 bg-red-600 hover:bg-red-700 hover:cursor-pointer"
      onClick={() => handleDelete()}
    >
      <Trash2 size={20} color="#fff" />
    </button>
  );
}
