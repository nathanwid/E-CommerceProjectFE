import React from "react";
import { auth } from "@/auth";

export default async function UsersTable() {
  const session = await auth();
  const token = session?.user.token;
  let users = [];
  let errorMessage;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Failed to fetch users.");
    }

    users = await res.json();
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Something went wrong.";
  }

  return (
    <div className="overflow-x-auto rounded-box bg-gray-100 rounded-lg shadow-md border border-gray-300 p-1">
      <table className="table border border-gray-200">
        <thead className="bg-blue-200 text-gray-800 text-center uppercase border-b-2">
          <tr>
            <th>User #</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {errorMessage ? (
            <tr>
              <td colSpan={4} className="text-center p-8 bg-white">
                <div className="max-w-sm mx-auto">
                  <div
                    className="p-4 my-8 text-sm text-red-800 rounded-lg bg-red-100"
                    role="alert"
                  >
                    <span>{errorMessage}</span>
                  </div>
                </div>
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-8 bg-white">
                <div className="max-w-sm mx-auto">
                  <div
                    className="p-4 text-sm text-center text-gray-800 rounded-lg bg-gray-100"
                    role="alert"
                  >
                    <span>No users found.</span>
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            users.map((user: any, index: number) => (
              <tr
                key={index}
                className="bg-white border-b-gray-300 text-center"
              >
                <td>{index + 1}</td>
                <td>{user.userId}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role === "admin" ? "-" : user.phoneNumber}</td>
                <td className="font-semibold capitalize">{user.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
