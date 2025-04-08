import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "./lib/zod";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
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
      const pathname = nextUrl.pathname;
      const role = auth?.user.role;
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = pathname.startsWith("/admin");
      const isUserRoute = pathname === "/" || pathname.startsWith("/account");

      if (!isLoggedIn && (isUserRoute || isAdminRoute)) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      if (isAdminRoute && role !== "admin") {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (isLoggedIn && role === "admin" && pathname === "/") {
        return Response.redirect(new URL("/admin", nextUrl));
      }

      if (isLoggedIn && pathname.startsWith("/login")) {
        if (role === "admin") {
          return Response.redirect(new URL("/admin", nextUrl));
        }
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
