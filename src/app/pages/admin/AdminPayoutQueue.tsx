import { useState } from "react";
import { AdminLayout } from "../../layouts/AdminLayout";
import { StatusBadge } from "../../components/admin/StatusBadge";

interface PayoutRequest {
  id: string;
  requestTime: string;
  userId: string;
  amountToDeduct: number;
  fiatEquivalent: string;
  method: string;
  status: "pending" | "approved" | "rejected";
}

const mockRequests: PayoutRequest[] = [
  {
    id: "RDM-45821",
    requestTime: "2026-03-16 14:32",
    userId: "USR-10234",
    amountToDeduct: 100,
    fiatEquivalent: "RM 10.00",
    method: "Bank Transfer",
    status: "pending",
  },
  {
    id: "RDM-45820",
    requestTime: "2026-03-16 14:28",
    userId: "USR-10235",
    amountToDeduct: 50,
    fiatEquivalent: "RM 5.00",
    method: "E-wallet",
    status: "pending",
  },
  {
    id: "RDM-45819",
    requestTime: "2026-03-16 14:15",
    userId: "USR-10236",
    amountToDeduct: 200,
    fiatEquivalent: "RM 20.00",
    method: "Bank Transfer",
    status: "pending",
  },
];

export function AdminPayoutQueue() {
  const [requests] = useState<PayoutRequest[]>(mockRequests);

  const handleApprove = (requestId: string) => {
    console.log("Approving request:", requestId);
  };

  const handleReject = (requestId: string) => {
    console.log("Rejecting request:", requestId);
  };

  return (
    <AdminLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <h1 className="text-[28px] font-bold text-gray-900">
            Redemption Queue
          </h1>
          <p className="text-[14px] text-gray-600 mt-1">
            Review and process pending payout requests
          </p>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-[1200px]">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Request Time
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Amount to Deduct
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Fiat Equivalent
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr
                    key={request.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-[13px] text-gray-600">
                      {request.requestTime}
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                      {request.userId}
                    </td>
                    <td className="px-6 py-4 text-[13px] font-semibold text-red-600">
                      -{request.amountToDeduct} pts
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
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="px-4 h-[36px] bg-green-600 text-white text-[13px] font-semibold rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="px-4 h-[36px] bg-red-600 text-white text-[13px] font-semibold rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Reject
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
    </AdminLayout>
  );
}