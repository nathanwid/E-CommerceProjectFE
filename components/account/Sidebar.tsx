import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  ListOrdered,
  LogOut,
  UserRound,
} from "lucide-react";
import { signOutAction } from "@/lib/actions";

const links = [
  {
    href: "/account/profile",
    icon: <UserRound className="w-5 h-5 mr-4" />,
    label: "Profile",
  },
  {
    href: "/account/wishlist",
    icon: <Heart className="w-5 h-5 mr-4" />,
    label: "Wishlist",
  },
  {
    href: "/account/cart",
    icon: <ShoppingCart className="w-5 h-5 mr-4" />,
    label: "Cart",
  },
  {
    href: "/account/orders",
    icon: <ListOrdered className="w-5 h-5 mr-4" />,
    label: "Orders",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-full max-w-[200px] space-y-4">
      <ul className="space-y-3 px-1 py-4 bg-white rounded-lg shadow-md border border-gray-300">
        {links.map(({ href, icon, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex items-center px-4 py-1 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            >
              {icon}
              {label}
            </Link>
          </li>
        ))}
        <li>
          <form action={signOutAction}>
            <button
              type="submit"
              className="flex items-center w-full px-4 py-1 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 hover:cursor-pointer transition-colors"
            >
              <LogOut className="w-5 h-5 mr-4" />
              Sign Out
            </button>
          </form>
        </li>
      </ul>
    </aside>
  );
}
