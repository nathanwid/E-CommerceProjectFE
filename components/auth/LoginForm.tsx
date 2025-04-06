"use client";

import Link from "next/link";
import { signInCredentials } from "@/lib/actions";
import { useState, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginButton } from "../Buttons";

export default function LoginForm() {
  const [state, formAction] = useActionState(signInCredentials, null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const error = state?.error as { [key: string]: string } | { general: string };

  useEffect(() => {
    if (!error && state?.data?.success) {
      router.push("/");
    }
  }, [error, state?.data?.success, router]);

  return (
    <form action={formAction} className="space-y-6">
      {error && "general" in error && (
        <div
          className="p-4 my-8 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span>{error.general}</span>
        </div>
      )}
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true">
          {error && "email" in error && (
            <span className="text-sm text-red-500 mt-2">{error.email}</span>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true">
          {error && "password" in error && (
            <span className="text-sm text-red-500 mt-2">{error.password}</span>
          )}
        </div>
      </div>
      <LoginButton />
      <p className="text-sm font-light text-gray-500">
        Don&apos;t have an account?
        <Link href="/register">
          <span className="font-medium pl-1 text-slate-600 hover:text-slate-700">
            Sign up here
          </span>
        </Link>
      </p>
    </form>
  );
}
