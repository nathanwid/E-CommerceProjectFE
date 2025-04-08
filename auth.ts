import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "./lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        const user = await res.json();

        if (res.ok && user?.token) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedRoutes = [
        "/",
        "/account/profile",
        "/account/cart",
        "/account/orders",
        "/account/wishlist",
      ];

      if (!isLoggedIn && protectedRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      if (isLoggedIn && nextUrl.pathname.startsWith("/login")) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.sub = user.userId;
        token.role = user.role;
        token.accessToken = user.token;
        token.cartId = user.cartId;
        token.wishlistId = user.wishlistId;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.token = token.accessToken;
      session.user.cartId = token.cartId;
      session.user.wishlistId = token.wishlistId;
      return session;
    },
  },
});
