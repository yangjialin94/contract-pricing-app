"use client";

import { ArrowBigLeftDash } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { useProject } from "@/hooks/useProject";
import { formatToDecimalCost } from "@/lib/format";
import { Additional, Customer, Labor, Material, User } from "@/types";

const ProviderPDFDownloadButton = dynamic(
  () => import("@/components/pdf/provider/PDFDownloadButton"),
  {
    ssr: false,
  }
);

const CustomerPDFDownloadButton = dynamic(
  () => import("@/components/pdf/customer/PDFDownloadButton"),
  {
    ssr: false,
  }
);

interface InfoItemProps {
  label: string;
  value: string;
  icon: string;
}

interface TaskSectionProps {
  title: string;
  items: Material[] | Labor[] | Additional[];
  icon: string;
}

export default function Overview() {
  const project = useProject();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-100">Project Overview</h1>

      {/* User & Customer Info */}
      <div className="grid gap-6 sm:grid-cols-2">
        <UserInfo user={project.user} />
        <CustomerInfo customer={project.customer} />
      </div>

      {/* Tasks & Summary */}
      <TasksList tasks={project.tasks} />
      <Summary project={project} />

      {/* Navigation */}
      <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6">
        <Link className="btn-secondary" href="/users">
          <ArrowBigLeftDash size={22} /> Modify Users
        </Link>
        <ProviderPDFDownloadButton />
        <CustomerPDFDownloadButton />
      </div>
    </div>
  );
}

function UserInfo({ user }: { user: User }) {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md dark:bg-gray-900">
      <h2 className="mb-4 text-lg font-semibold text-gray-200">Provider Information</h2>
      <InfoItem label="Name" value={user.name} icon="📛" />
      <InfoItem label="Phone" value={user.phone} icon="📞" />
      <InfoItem label="Email" value={user.email} icon="📧" />
    </div>
  );
}

function CustomerInfo({ customer }: { customer: Customer }) {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md dark:bg-gray-900">
      <h2 className="mb-4 text-lg font-semibold text-gray-200">Customer Information</h2>
      <InfoItem label="Name" value={customer.name} icon="📛" />
      <InfoItem label="Address" value={customer.address} icon="📍" />
      <InfoItem label="Phone" value={customer.phone} icon="📞" />
      <InfoItem label="Email" value={customer.email} icon="📧" />
    </div>
  );
}

function InfoItem({ label, value, icon }: InfoItemProps) {
  return (
    <p className="flex items-center gap-2 text-gray-300">
      {icon} <span className="font-medium">{label}:</span> {value}
    </p>
  );
}

function TasksList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="mt-8 space-y-6">
      {tasks.map((task) => (
        <div key={task.id} className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md">
          <h2 className="text-lg font-semibold text-gray-100">📂 {task.name}</h2>

          {/* Task Sections */}
          <TaskSection title="Materials" items={task.materials} icon="📦" />
          <TaskSection title="Labors" items={task.labors} icon="🛠️" />
          <TaskSection title="Additional" items={task.additional} icon="📑" />

          {/* Task Cost */}
          <div className="mt-4 flex justify-between border-t border-gray-600 pt-3 text-lg font-medium text-gray-200">
            <p>Total Cost:</p>
            <p className="text-blue-400">${formatToDecimalCost(task.totalCost, 2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TaskSection({ title, items, icon }: TaskSectionProps) {
  if (!items.length) return null;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
      <ul className="mt-2 space-y-1 text-gray-300">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <p className="flex items-center gap-2">
              {icon} {item.name || item.role || item.type}
              {["Materials", "Labors"].includes(title) && (
                <span className="text-sm text-gray-400">
                  (${item.unitCost}/{item.unit} × {item.quantity})
                </span>
              )}
            </p>
            <p className="font-medium text-blue-400">${formatToDecimalCost(item.cost, 2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Summary({ project }: { project: Project }) {
  return (
    <div className="mt-8 rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md">
      <h2 className="text-xl font-semibold text-gray-100">Project Summary</h2>
      <hr className="my-4 border-gray-600" />

      {/* TOTAL COST */}
      <div className="flex justify-between text-lg font-medium text-gray-300">
        <p>Total Cost:</p>
        <p className="text-blue-400">${formatToDecimalCost(project.totalCost, 2)}</p>
      </div>

      {/* TOTAL PRICE */}
      <div className="mt-4 flex justify-between text-lg font-medium text-gray-300">
        <p>Total Price:</p>
        <p className="text-blue-400">${formatToDecimalCost(project.totalPrice, 2)}</p>
      </div>

      {/* TOTAL PROFIT */}
      <div className="mt-4 flex justify-between text-lg font-medium">
        <p className="text-gray-300">Total Profit:</p>
        <p className={`${project.totalProfit >= 0 ? "text-green-400" : "text-red-400"}`}>
          {`$${formatToDecimalCost(project.totalProfit, 2)} / ${formatToDecimalCost(
            project.profitMargin,
            1
          )}%`}
        </p>
      </div>
    </div>
  );
}
