import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Shield } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

export function AppleAuth() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [hideEmail, setHideEmail] = useState(false);

  const handleContinue = () => {
    const email = hideEmail ? "privaterelay@icloud.com" : "john.doe@icloud.com";
    const name = "John Doe";
    
    setUser({ email, name });
    toast.success("Signed in with Apple");
    navigate("/onboarding");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <Button
          variant="ghost"
          onClick={handleCancel}
          className="p-2 -ml-2 hover:bg-white/10"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Apple Logo */}
          <div className="flex justify-center mb-8">
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="white">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-[28px] font-semibold text-white text-center mb-2">
            Sign in with Apple ID
          </h1>

          {/* Subtitle */}
          <p className="text-[16px] text-gray-400 text-center mb-12">
            Use your Apple ID to sign in to Voice Recording Platform
          </p>

          {/* Account Card */}
          <div className="bg-[#1C1C1E] rounded-2xl p-6 mb-6">
            {/* Apple ID */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-[20px] font-semibold">
                JD
              </div>
              <div className="flex-1">
                <p className="text-[18px] font-medium text-white">John Doe</p>
                <p className="text-[14px] text-gray-400">john.doe@icloud.com</p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-700 mb-6" />

            {/* Privacy Option */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-[15px] font-medium text-white mb-1">
                    Hide My Email
                  </p>
                  <p className="text-[13px] text-gray-400 leading-relaxed">
                    Share a unique, random email address that forwards to your personal email
                  </p>
                </div>
                <button
                  onClick={() => setHideEmail(!hideEmail)}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    hideEmail ? "bg-[#E63946]" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                      hideEmail ? "translate-x-[22px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {hideEmail && (
                <div className="bg-[#2C2C2E] rounded-lg p-3 ml-8">
                  <p className="text-[13px] text-gray-400">
                    Voice Recording Platform will receive:
                  </p>
                  <p className="text-[14px] text-white font-mono mt-1">
                    privaterelay@icloud.com
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Info Text */}
          <p className="text-[13px] text-gray-400 text-center mb-8 leading-relaxed">
            Your Apple ID will be used to sign in and access Voice Recording Platform. Your name and email address will be shared with the app.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleContinue}
              className="w-full h-14 text-[17px] font-semibold bg-white hover:bg-gray-100 text-black rounded-xl"
            >
              Continue
            </Button>
            <Button
              onClick={handleCancel}
              variant="ghost"
              className="w-full h-14 text-[17px] font-medium text-blue-500 hover:bg-white/10 rounded-xl"
            >
              Cancel
            </Button>
          </div>

          {/* Footer */}
          <p className="text-[11px] text-gray-500 text-center mt-8 leading-relaxed">
            Protected by Apple. Your privacy is important to us.
          </p>
        </div>
      </div>
    </div>
  );
}