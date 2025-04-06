import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col items-center justify-between px-6 py-16 mx-auto min-h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg mt-0">
          {children}
        </div>
      </div>
    </div>
  );
}
