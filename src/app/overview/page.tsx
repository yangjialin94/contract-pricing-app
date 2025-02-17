"use client";
import { ArrowBigLeftDash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useProject } from "@/hooks/useProject";

export default function Overview() {
  const project = useProject();
  const [user, setUser] = useState(project.user);
  const [customer, setCustomer] = useState(project.customer);

  const handleUserChange = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleCustomerChange = (field: string, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="mb-6 text-center text-2xl font-bold">Overview</h1>

      {/* User Information */}
      <div className="rounded-md border bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">User Information</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="w-1/3 text-lg font-bold text-gray-900">Name:</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => handleUserChange("name", e.target.value)}
              placeholder="Enter name"
              className="w-2/3 rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="w-1/3 text-lg font-bold text-gray-900">Phone:</label>
            <input
              type="text"
              value={user.phone}
              onChange={(e) => handleUserChange("phone", e.target.value)}
              placeholder="Enter phone"
              className="w-2/3 rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="w-1/3 text-lg font-bold text-gray-900">Email:</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => handleUserChange("email", e.target.value)}
              placeholder="Enter email"
              className="w-2/3 rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="mt-6 rounded-md border bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Customer Information</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="w-1/3 text-lg font-bold text-gray-900">Name:</label>
            <input
              type="text"
              value={customer.name}
              onChange={(e) => handleCustomerChange("name", e.target.value)}
              placeholder="Enter name"
              className="w-2/3 rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="w-1/3 text-lg font-bold text-gray-900">Address:</label>
            <input
              type="text"
              value={customer.address}
              onChange={(e) => handleCustomerChange("address", e.target.value)}
              placeholder="Enter address"
              className="w-2/3 rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="w-1/3 text-lg font-bold text-gray-900">Phone:</label>
            <input
              type="text"
              value={customer.phone}
              onChange={(e) => handleCustomerChange("phone", e.target.value)}
              placeholder="Enter phone"
              className="w-2/3 rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="w-1/3 text-lg font-bold text-gray-900">Email:</label>
            <input
              type="email"
              value={customer.email}
              onChange={(e) => handleCustomerChange("email", e.target.value)}
              placeholder="Enter email"
              className="w-2/3 rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <Link
          href="/profit"
          className="flex items-center gap-2 rounded-md border border-gray-300 px-6 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-100"
        >
          <ArrowBigLeftDash size={22} />
          Back to Profit
        </Link>
        <button
          type="button"
          className="rounded-md bg-blue-500 px-6 py-2 text-lg font-semibold text-white shadow hover:bg-blue-600 focus:outline-none"
        >
          Save
        </button>
      </div>
    </div>
  );
}
