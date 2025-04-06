"use server";

import { signIn, signOut } from "@/auth";
import { RegisterSchema, SignInSchema } from "./zod";
import { AuthError } from "next-auth";

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}

export async function signUpCredentials(
  previousState: unknown,
  formData: FormData
) {
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, phoneNumber } = validatedFields.data;
  const role = "customer";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          phoneNumber,
          role,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        error: {
          general: data.detail || "An unexpected error occurred.",
        },
      };
    }

    const userId = data.id;

    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    return { data: { success: true } };
  } catch (error) {
    return {
      error: {
        general: "Failed to connect to the server.",
      },
    };
  }
}

export async function signInCredentials(
  previousState: unknown,
  formData: FormData
) {
  const validatedFields = SignInSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { data: { success: true } };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: { general: "Invalid credentials." },
          };
        default:
          return {
            error: { general: "An unexpected error occurred." },
          };
      }
    }
  }
}
