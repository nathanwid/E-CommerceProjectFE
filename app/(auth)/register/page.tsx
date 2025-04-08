import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";

export default function Page() {
  return (
    <div className="p-6 space-y-4 border border-gray-300 rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Create an account
      </h1>
      <RegisterForm />
    </div>
  );
}
