import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] mx-32 my-8">{children}</main>
      <Footer />
    </>
  );
}
