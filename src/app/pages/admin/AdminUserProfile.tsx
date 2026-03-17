import { useParams, useNavigate } from "react-router";
import { AdminLayout } from "../../layouts/AdminLayout";
import { StatusBadge } from "../../components/admin/StatusBadge";
import {
  ArrowLeft,
  UserX,
  Wallet,
  TrendingUp,
} from "lucide-react";

interface RedemptionRequest {
  id: string;
  date: string;
  amount: number;
  fiatEquivalent: string;
  method: string;
  status: "pending" | "approved" | "rejected";
}

export function AdminUserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  // Mock user data
  const user = {
    id: userId || "USR-10234",
    email: "user1@example.com",
    phone: "+60123456789",
    status: "active",
    balance: 450,
    riskScore: 12,
  };

  const redemptionRequests: RedemptionRequest[] = [
    {
      id: "RDM-45821",
      date: "2026-03-16 14:32",
      amount: 100,
      fiatEquivalent: "RM 10.00",
      method: "Bank Transfer",
      status: "pending",
    },
    {
      id: "RDM-45820",
      date: "2026-03-15 09:15",
      amount: 50,
      fiatEquivalent: "RM 5.00",
      method: "E-wallet",
      status: "approved",
    },
    {
      id: "RDM-45819",
      date: "2026-03-10 18:20",
      amount: 200,
      fiatEquivalent: "RM 20.00",
      method: "Bank Transfer",
      status: "rejected",
    },
  ];

  return (
    <AdminLayout>
      <div className="h-full flex flex-col overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <button
            onClick={() => navigate("/admin/users")}
            className="flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Users
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-[28px] font-bold text-gray-900">
                User: {user.id}
              </h1>
              <StatusBadge status={user.status} />
            </div>

            <button className="flex items-center gap-2 px-5 h-[48px] bg-red-600 text-white text-[14px] font-semibold rounded-lg hover:bg-red-700 transition-colors">
              <UserX className="w-4 h-4" />
              Freeze
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-gray-50 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Top Info Cards */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[13px] font-semibold text-gray-600 uppercase">
                    Current Balance
                  </h3>
                  <Wallet className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-[36px] font-bold text-gray-900">
                  {user.balance}
                </p>
                <p className="text-[13px] text-gray-500 mt-1">points</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[13px] font-semibold text-gray-600 uppercase">
                    Risk Score
                  </h3>
                  <TrendingUp className="w-5 h-5 text-yellow-600" />
                </div>
                <p className="text-[36px] font-bold text-gray-900">
                  {user.riskScore}
                </p>
                <p className="text-[13px] text-green-600 mt-1">Low risk</p>
              </div>
            </div>

            {/* Redemption Requests Table */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-[18px] font-bold text-gray-900">
                  Redemption Requests
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                        Request ID
                      </th>
                      <th className="px-6 py-3 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                        Fiat Equivalent
                      </th>
                      <th className="px-6 py-3 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                        Method
                      </th>
                      <th className="px-6 py-3 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {redemptionRequests.map((request) => (
                      <tr
                        key={request.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-[13px] font-medium text-gray-900">
                          {request.id}
                        </td>
                        <td className="px-6 py-4 text-[13px] text-gray-600">
                          {request.date}
                        </td>
                        <td className="px-6 py-4 text-[13px] font-semibold text-red-600">
                          -{request.amount} pts
                        </td>
                        <td className="px-6 py-4 text-[13px] font-semibold text-gray-900">
                          {request.fiatEquivalent}
                        </td>
                        <td className="px-6 py-4 text-[13px] text-gray-700">
                          {request.method}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={request.status} variant="small" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}