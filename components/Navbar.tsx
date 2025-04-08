import { auth } from "@/auth";
import { signOutAction } from "@/lib/actions";
import {
  Heart,
  ListOrdered,
  LogOut,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const links = [
  {
    href: "/account/profile",
    icon: <UserRound className="w-4 h-4 mr-2" />,
    label: "Profile",
  },
  {
    href: "/account/wishlist",
    icon: <Heart className="w-4 h-4 mr-2" />,
    label: "Wishlist",
  },
  {
    href: "/account/cart",
    icon: <ShoppingCart className="w-4 h-4 mr-2" />,
    label: "Cart",
  },
  {
    href: "/account/orders",
    icon: <ListOrdered className="w-4 h-4 mr-2" />,
    label: "Orders",
  },
];

export default async function Navbar() {
  const session = await auth();
  const isAdmin = session?.user.role === "admin";

  return (
    <nav className="bg-white border-gray-300 border-b shadow-md">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-20 py-5">
        <Link
          href="/"
          className="btn btn-ghost text-blue-200 font-bold text-2xl bg-slate-800 hover:bg-slate-900 border border-transparent hover:border-none p-4"
        >
          ACME Ltd
        </Link>
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex items-center gap-8 mr-5 font-bold">
            <li>
              <Link
                href={isAdmin ? "/admin" : "/"}
                className="text-gray-600 hover:text-gray-800"
              >
                Home
              </Link>
            </li>
            {!isAdmin ? (
              <>
                <li>
                  <Link
                    href="/products"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account/profile"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Account
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/admin/products"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/users"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Users
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/orders"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Orders
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col justify-center -space-y-1">
              <span className="font-semibold text-gray-600 text-right capitalize">
                {session?.user.name}
              </span>
              <span className="font-xs text-gray-400 text-right capitalize">
                {session?.user.role}
              </span>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border border-transparent hover:border-slate-900"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-md dropdown-content bg-white font-medium rounded-lg space-y-1 z-1 mt-3 w-42 p-2 shadow-md border border-gray-300"
              >
                {!isAdmin &&
                  links.map(({ href, icon, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                      >
                        {icon}
                        {label}
                      </Link>
                    </li>
                  ))}
                <li className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-100 hover:cursor-pointer transition-colors">
                  <form action={signOutAction}>
                    <button
                      type="submit"
                      className="flex items-center hover:cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-4" />
                      Sign Out
                    </button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
