import Sidebar from "@/components/account/Sidebar";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-screen-xl mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row gap-12">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
