import { useState } from "react";
import { AdminLayout } from "../../layouts/AdminLayout";
import { StatusBadge } from "../../components/admin/StatusBadge";

interface Transaction {
  id: string;
  date: string;
  userId: string;
  type: "earning" | "redemption";
  amount: number;
  description: string;
  status: "completed" | "pending" | "failed";
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN-88234",
    date: "2026-03-16 14:32",
    userId: "USR-10234",
    type: "earning",
    amount: 10,
    description: "Voice recording task completed",
    status: "completed",
  },
  {
    id: "TXN-88233",
    date: "2026-03-16 14:28",
    userId: "USR-10235",
    type: "redemption",
    amount: -50,
    description: "Payout to E-wallet",
    status: "completed",
  },
  {
    id: "TXN-88232",
    date: "2026-03-16 14:15",
    userId: "USR-10236",
    type: "earning",
    amount: 15,
    description: "Audio transcription task completed",
    status: "completed",
  },
  {
    id: "TXN-88231",
    date: "2026-03-16 14:10",
    userId: "USR-10234",
    type: "redemption",
    amount: -100,
    description: "Payout to Bank Transfer",
    status: "pending",
  },
  {
    id: "TXN-88230",
    date: "2026-03-16 13:45",
    userId: "USR-10237",
    type: "redemption",
    amount: -200,
    description: "Payout failed - insufficient verification",
    status: "failed",
  },
];

export function AdminTransactions() {
  const [transactions] = useState<Transaction[]>(mockTransactions);

  return (
    <AdminLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <h1 className="text-[28px] font-bold text-gray-900">Transactions</h1>
          <p className="text-[14px] text-gray-600 mt-1">
            All platform transactions history
          </p>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-[1100px]">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-[13px] font-medium text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 text-[13px] text-gray-600">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 text-[13px] font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                      {transaction.userId}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded text-[11px] font-semibold ${
                          transaction.type === "earning"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.type === "earning" ? "EARNING" : "REDEMPTION"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[13px] font-semibold ${
                          transaction.amount > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {transaction.amount} pts
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-gray-700">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={transaction.status} variant="small" />
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
