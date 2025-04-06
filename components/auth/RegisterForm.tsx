"use client";

import Link from "next/link";
import { signUpCredentials } from "@/lib/actions";
import { useState, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RegisterButton } from "../Buttons";

export default function RegisterForm() {
  const [state, formAction] = useActionState(signUpCredentials, null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
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
      router.push("/login");
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
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true">
          {error && "name" in error && (
            <span className="text-sm text-red-500 mt-2">{error.name}</span>
          )}
        </div>
      </div>
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
          htmlFor="phoneNumber"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Phone Number
        </label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true">
          {error && "phoneNumber" in error && (
            <span className="text-sm text-red-500 mt-2">
              {error.phoneNumber}
            </span>
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
      <div>
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true">
          {error && "confirmPassword" in error && (
            <span className="text-sm text-red-500 mt-2">
              {error.confirmPassword}
            </span>
          )}
        </div>
      </div>
      <RegisterButton />
      <p className="text-sm font-light text-gray-500">
        Already have an account?
        <Link href="login">
          <span className="font-medium pl-1 text-slate-600 hover:text-slate-700">
            Sign in
          </span>
        </Link>
      </p>
    </form>
  );
}
