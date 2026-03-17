import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  Users,
  Search,
  LogOut,
  ChevronRight,
  CreditCard,
  Receipt,
  FileText,
  Settings,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  icon: ReactNode;
  path: string;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/admin/dashboard",
    },
    {
      label: "Task Management",
      icon: <FileText className="w-5 h-5" />,
      path: "/admin/task-management",
    },
    {
      label: "Users",
      icon: <Users className="w-5 h-5" />,
      path: "/admin/users",
    },
    {
      label: "Payout Queue",
      icon: <CreditCard className="w-5 h-5" />,
      path: "/admin/payout-queue",
    },
    {
      label: "Transactions",
      icon: <Receipt className="w-5 h-5" />,
      path: "/admin/transactions",
    },
    {
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/admin/settings",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", searchQuery);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <LayoutDashboard className="w-6 h-6 text-[#E63946]" />
          <h1 className="ml-3 text-[18px] font-bold text-[#1A1A1A]">
            Admin Console
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors min-h-[44px] ${
                    isActive
                      ? "bg-[#E63946]/10 text-[#E63946]"
                      : "text-[#1A1A1A] hover:bg-[#F5F5F5]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={isActive ? "text-[#E63946]" : "text-[#757575]"}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-[#E63946]" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID/email/phone"
                className="w-full h-[44px] pl-10 pr-4 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
              />
            </div>
          </form>

          {/* Right Section */}
          <div className="flex items-center gap-4 ml-6">
            {/* Operator Profile */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-[#E63946] to-[#d4183d] rounded-full flex items-center justify-center">
                <span className="text-[14px] font-semibold text-white">OP</span>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#1A1A1A]">
                  Operator
                </p>
                <p className="text-[11px] text-[#757575]">Admin</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-gray-300"></div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 h-[44px] text-[14px] font-medium text-[#1A1A1A] hover:bg-[#F5F5F5] rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}