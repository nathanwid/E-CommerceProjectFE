"use client";

import { useEffect, useState } from "react";

export default function ProfileForm({ userId }: { userId?: string }) {
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/address/user/${userId}`
        );

        if (!res.ok) {
          setIsNew(true);
          return;
        }

        if (res.ok) {
          const data = await res.json();
          setForm({
            addressLine1: data.addressLine1 || "",
            addressLine2: data.addressLine2 || "",
            city: data.city || "",
            postalCode: data.postalCode || "",
            country: data.country || "",
          });
        }
      } catch (error) {
        alert(error);
      }
    };
    fetchAddress();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = isNew ? "POST" : "PUT";
    const payload = isNew ? { userId, ...form } : form;

    const res = await fetch(
      isNew
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/address`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/address/user/${userId}`,
      {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) {
      alert(isNew ? "Address created!" : "Address updated!");
      setIsNew(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-300 mb-8"
    >
      <div>
        <label
          htmlFor="addressLine1"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Address Line 1
        </label>
        <input
          type="text"
          name="addressLine1"
          value={form.addressLine1}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
      </div>
      <div>
        <label
          htmlFor="addressLine2"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Address Line 2
        </label>
        <input
          type="text"
          name="addressLine2"
          value={form.addressLine2}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
      </div>
      <div>
        <label
          htmlFor="city"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          City
        </label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
      </div>
      <div>
        <label
          htmlFor="postalCode"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Postal Code
        </label>
        <input
          type="text"
          name="postalCode"
          value={form.postalCode}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
      </div>
      <div>
        <label
          htmlFor="country"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Country
        </label>
        <input
          type="text"
          name="country"
          value={form.country}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
      </div>
      <button
        type="submit"
        className="text-white text-center uppercase bg-slate-800 hover:bg-slate-900 hover:cursor-pointer font-medium rounded-lg px-5 py-2.5"
      >
        {isNew ? "Create" : "Update"}
      </button>
    </form>
  );
}
