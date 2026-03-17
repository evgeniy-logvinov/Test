import { AdminLayout } from "../../layouts/AdminLayout";
import {
  Users,
  ClipboardCheck,
  TrendingUp,
  DollarSign,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data
const dailyActivityData = [
  { date: "Mar 10", tasks: 45, users: 12 },
  { date: "Mar 11", tasks: 52, users: 15 },
  { date: "Mar 12", tasks: 48, users: 14 },
  { date: "Mar 13", tasks: 61, users: 18 },
  { date: "Mar 14", tasks: 55, users: 16 },
  { date: "Mar 15", tasks: 67, users: 20 },
  { date: "Mar 16", tasks: 58, users: 17 },
];

const taskTypeData = [
  { name: "Voice Recording", value: 342, color: "#E63946" },
  { name: "Transcription", value: 198, color: "#10B981" },
];

const taskStatusData = [
  { status: "Completed", count: 387 },
  { status: "Under Review", count: 43 },
  { status: "Redo", count: 12 },
  { status: "Available", count: 98 },
];

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color: string;
}

function StatCard({ title, value, icon, trend, trendUp, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[13px] text-gray-600 font-medium">{title}</p>
          <p className="text-[32px] font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp
                className={`w-4 h-4 ${
                  trendUp ? "text-green-600" : "text-red-600"
                } ${!trendUp && "rotate-180"}`}
              />
              <span
                className={`text-[13px] font-semibold ${
                  trendUp ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend}
              </span>
              <span className="text-[13px] text-gray-500">vs last week</span>
            </div>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center`}
          style={{ backgroundColor: color + "15" }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-[#1A1A1A]">Dashboard</h1>
          <p className="text-[14px] text-[#757575] mt-1">
            System overview and analytics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value="1,247"
            icon={<Users className="w-6 h-6" />}
            trend="+12.5%"
            trendUp={true}
            color="#E63946"
          />
          <StatCard
            title="Tasks Under Review"
            value="43"
            icon={<ClipboardCheck className="w-6 h-6" />}
            color="#F59E0B"
          />
          <StatCard
            title="Completed Tasks"
            value="387"
            icon={<CheckCircle2 className="w-6 h-6" />}
            trend="+8.3%"
            trendUp={true}
            color="#10B981"
          />
          <StatCard
            title="Pending Payouts"
            value="RM 1,250"
            icon={<DollarSign className="w-6 h-6" />}
            color="#757575"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Daily Activity */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">
              Daily Activity
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={dailyActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="tasks"
                  stroke="#E63946"
                  strokeWidth={2}
                  dot={{ fill: "#E63946", r: 4 }}
                  name="Tasks"
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: "#10B981", r: 4 }}
                  name="Active Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Task Type Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">
              Task Type Distribution
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={taskTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  labelStyle={{ fontSize: "13px", fontWeight: 600 }}
                >
                  {taskTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-2 gap-6">
          {/* Task Status Overview */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">
              Task Status Overview
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={taskStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="status"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
                <Bar dataKey="count" fill="#E63946" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">
              Recent Alerts
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13px] font-semibold text-red-900">
                    High rejection rate detected
                  </p>
                  <p className="text-[12px] text-red-700 mt-0.5">
                    User USR-10234 has 5 rejected tasks in the last hour
                  </p>
                  <p className="text-[11px] text-red-600 mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13px] font-semibold text-yellow-900">
                    Review queue growing
                  </p>
                  <p className="text-[12px] text-yellow-700 mt-0.5">
                    43 tasks waiting for review - consider assigning more
                    reviewers
                  </p>
                  <p className="text-[11px] text-yellow-600 mt-1">5 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13px] font-semibold text-blue-900">
                    New user milestone
                  </p>
                  <p className="text-[12px] text-blue-700 mt-0.5">
                    Platform reached 1,000+ registered users
                  </p>
                  <p className="text-[11px] text-blue-600 mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}