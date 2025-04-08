import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }

  interface User {
    userId: string;
    role: string;
    cartId: string;
    wishlistId: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    role: string;
    cartId: string;
    wishlistId: string;
    accessToken: string;
  }
}
