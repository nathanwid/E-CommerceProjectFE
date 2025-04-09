import UsersTable from "@/components/admin/UsersTable";
import React from "react";

export default function UsersPage() {
  return (
    <>
      <h1 className="text-2xl mb-8 font-bold">Users</h1>
      <UsersTable />
    </>
  );
}
