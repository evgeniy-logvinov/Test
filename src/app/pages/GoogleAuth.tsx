import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Check } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

interface GoogleAccount {
  email: string;
  name: string;
  avatar: string;
}

const mockGoogleAccounts: GoogleAccount[] = [
  {
    email: "john.doe@gmail.com",
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    email: "jane.smith@gmail.com",
    name: "Jane Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
];

export function GoogleAuth() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [selectedAccount, setSelectedAccount] = useState<GoogleAccount | null>(null);
  const [step, setStep] = useState<"select" | "permissions">("select");

  const handleSelectAccount = (account: GoogleAccount) => {
    setSelectedAccount(account);
    setStep("permissions");
  };

  const handleAllowPermissions = () => {
    if (selectedAccount) {
      setUser({ email: selectedAccount.email, name: selectedAccount.name });
      toast.success("Signed in with Google");
      navigate("/onboarding");
    }
  };

  const handleDenyPermissions = () => {
    toast.error("Permission denied");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => step === "select" ? navigate("/") : setStep("select")}
            className="p-2 -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-[#1A1A1A]" />
          </Button>
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <h1 className="text-[20px] font-semibold text-[#1A1A1A]">
              Sign in with Google
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6">
        {step === "select" ? (
          <>
            {/* Select Account */}
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-4">
              Choose an account
            </h2>
            <p className="text-[14px] text-[#757575] mb-6">
              to continue to Voice Recording Platform
            </p>

            <div className="space-y-3">
              {mockGoogleAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => handleSelectAccount(account)}
                  className="w-full flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={account.avatar}
                    alt={account.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 text-left">
                    <p className="text-[16px] font-medium text-[#1A1A1A]">
                      {account.name}
                    </p>
                    <p className="text-[14px] text-[#757575]">{account.email}</p>
                  </div>
                </button>
              ))}

              {/* Use another account */}
              <button
                onClick={() => toast.info("Demo: Select from existing accounts above")}
                className="w-full flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full border-2 border-[#757575] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#757575]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-[16px] font-medium text-[#1A1A1A]">
                  Use another account
                </p>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Permissions */}
            <div className="max-w-md mx-auto">
              {/* Selected Account */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-white rounded-lg border border-gray-200">
                <img
                  src={selectedAccount?.avatar}
                  alt={selectedAccount?.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-[16px] font-medium text-[#1A1A1A]">
                    {selectedAccount?.name}
                  </p>
                  <p className="text-[14px] text-[#757575]">
                    {selectedAccount?.email}
                  </p>
                </div>
              </div>

              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-4">
                Voice Recording Platform wants to:
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-[#34A853] flex-shrink-0 mt-0.5" />
                  <p className="text-[15px] text-[#1A1A1A]">
                    See your basic profile info (name, email, profile picture)
                  </p>
                </div>
                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-[#34A853] flex-shrink-0 mt-0.5" />
                  <p className="text-[15px] text-[#1A1A1A]">
                    Associate you with your personal info on Google
                  </p>
                </div>
              </div>

              <div className="bg-[#FFF9E6] border border-[#FFE082] rounded-lg p-4 mb-6">
                <p className="text-[13px] text-[#5F4C00]">
                  Make sure you trust Voice Recording Platform
                </p>
                <p className="text-[13px] text-[#5F4C00] mt-1">
                  You may be sharing sensitive info with this site or app. Learn about how Voice Recording Platform will handle your data by reviewing its terms of service and privacy policies.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleDenyPermissions}
                  variant="outline"
                  className="flex-1 h-12 text-[15px] font-medium bg-white border-gray-300 text-[#1A1A1A] hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAllowPermissions}
                  className="flex-1 h-12 text-[15px] font-medium bg-[#1A73E8] hover:bg-[#1557B0] text-white"
                >
                  Allow
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
