"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ProfileForm({
  userId,
  token,
}: {
  userId?: string;
  token?: string;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setForm({
            name: data.name || "",
            email: data.email || "",
            phone: data.phoneNumber || "",
            password: "",
          });
        }
      } catch (error) {
        alert(error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // reset error saat user ngetik ulang
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      name: form.name,
      email: form.email,
      phoneNumber: form.phone,
      password: form.password,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/${userId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      if (res.status === 401) {
        setError("Incorrect password. Please try again.");
      } else {
        setError("Failed to update profile.");
      }
      return;
    }

    alert("Profile updated!");

    const result = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (result?.error) {
      alert("Session update failed, please log in again.");
    } else {
      location.reload(); // biar session re-fetch
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-300 mb-8"
    >
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Phone Number
        </label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Current Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="text-white text-center uppercase bg-slate-800 hover:bg-slate-900 font-medium rounded-lg px-5 py-2.5"
      >
        Update
      </button>
    </form>
  );
}
