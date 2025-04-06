import LoginForm from "@/components/auth/LoginForm";
import React from "react";

export default function page() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Sign in to your account
      </h1>
      <LoginForm />
    </div>
  );
}
