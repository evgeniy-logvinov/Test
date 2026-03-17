import { useState } from "react";
import { useNavigate } from "react-router";
import { AdminLayout } from "../../layouts/AdminLayout";
import { StatusBadge } from "../../components/admin/StatusBadge";
import { ExternalLink } from "lucide-react";

interface User {
  id: string;
  email: string;
  phone: string;
  status: "active" | "banned";
  balance: number;
}

const mockUsers: User[] = [
  {
    id: "USR-10234",
    email: "user1@example.com",
    phone: "+60123456789",
    status: "active",
    balance: 450,
  },
  {
    id: "USR-10235",
    email: "user2@example.com",
    phone: "+60198765432",
    status: "active",
    balance: 230,
  },
  {
    id: "USR-10236",
    email: "user3@example.com",
    phone: "+60145678901",
    status: "active",
    balance: 0,
  },
  {
    id: "USR-10237",
    email: "user4@example.com",
    phone: "+60187654321",
    status: "banned",
    balance: 120,
  },
];

export function AdminUsers() {
  const navigate = useNavigate();
  const [users] = useState<User[]>(mockUsers);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const handleStatusToggle = (status: string) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleApplyFilters = () => {
    console.log("Applying filters:", { statusFilter });
  };

  return (
    <AdminLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <h1 className="text-[28px] font-bold text-gray-900">Users</h1>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Filters Panel */}
          <aside className="w-72 bg-white border-r border-gray-200 p-6 overflow-y-auto">
            <h2 className="text-[16px] font-bold text-gray-900 mb-4">Filters</h2>

            {/* Status Checkboxes */}
            <div className="mb-6">
              <label className="block text-[13px] font-semibold text-gray-700 mb-3">
                Status
              </label>
              <div className="space-y-2">
                {["active", "banned"].map((status) => (
                  <label
                    key={status}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={statusFilter.includes(status)}
                      onChange={() => handleStatusToggle(status)}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-[14px] text-gray-700 group-hover:text-gray-900 capitalize">
                      {status}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={handleApplyFilters}
              className="w-full h-[48px] px-4 bg-blue-600 text-white text-[14px] font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
          </aside>

          {/* Main Table */}
          <div className="flex-1 overflow-auto">
            <div className="min-w-[900px]">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                      Email / Phone
                    </th>
                    <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                      Balance
                    </th>
                    <th className="px-6 py-4 text-right text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-[13px] font-medium text-gray-900">
                        {user.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[13px] text-gray-900">
                          {user.email}
                        </div>
                        <div className="text-[12px] text-gray-500">
                          {user.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={user.status} variant="small" />
                      </td>
                      <td className="px-6 py-4 text-[13px] font-semibold text-gray-900">
                        {user.balance} pts
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/users/${user.id}`)}
                            className="flex items-center gap-1.5 px-3 h-[36px] text-[13px] font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Open
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}