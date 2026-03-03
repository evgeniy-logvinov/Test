import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Lock, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import logoImage from "figma:asset/2b869d9dab99bf679a91f50c1a711792e8dbf59e.png";

export function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidToken, setIsValidToken] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate token validation
    setTimeout(() => {
      if (!token || token.length < 10) {
        setIsValidToken(false);
      }
      setIsLoading(false);
    }, 500);
  }, [token]);

  const handleResetPassword = () => {
    // Validation
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Simulate password reset
    toast.success("Password has been reset successfully!");
    navigate("/password-reset-success");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#E63946] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[16px] text-[#757575]">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  // Invalid token
  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
        <div className="flex-1 px-6 pt-12 pb-6 flex flex-col items-center justify-center">
          {/* Error Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[28px] font-bold text-[#1A1A1A] text-center mb-3">
            Invalid or expired link
          </h1>

          {/* Subtitle */}
          <p className="text-[16px] text-[#757575] text-center mb-8 leading-relaxed max-w-md">
            This password reset link is invalid or has expired. Please request a new one.
          </p>

          {/* Actions */}
          <div className="w-full max-w-md space-y-4">
            <Button
              onClick={() => navigate("/forgot-password")}
              className="w-full h-14 text-[16px] font-semibold bg-[#E63946] hover:bg-[#D62836] text-white"
            >
              Request new link
            </Button>

            <button
              onClick={() => navigate("/")}
              className="w-full text-[14px] text-[#757575] font-semibold hover:text-[#E63946]"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Reset form
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Content */}
      <div className="flex-1 px-6 pt-12 pb-6 flex flex-col">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logoImage} alt="Logo" className="w-40 h-40 object-contain" />
        </div>

        {/* Title */}
        <h1 className="text-[28px] font-bold text-[#1A1A1A] text-center mb-3">
          Create new password
        </h1>

        {/* Subtitle */}
        <p className="text-[16px] text-[#757575] text-center mb-10 leading-relaxed">
          Your new password must be different from previously used passwords
        </p>

        {/* Reset Form */}
        <div className="space-y-5 max-w-md mx-auto w-full">
          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-[#1A1A1A]">
              New password
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
              <Input
                id="new-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 pl-12 bg-white border-gray-300"
              />
            </div>
            <p className="text-[12px] text-[#757575]">
              Must be at least 8 characters
            </p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-[#1A1A1A]">
              Confirm password
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleResetPassword();
                  }
                }}
                className="h-14 pl-12 bg-white border-gray-300"
              />
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="text-[12px] text-red-600">
                Passwords do not match
              </p>
            )}
            {confirmPassword && password === confirmPassword && (
              <p className="text-[12px] text-green-600">
                Passwords match ✓
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleResetPassword}
            className="w-full h-14 text-[16px] font-semibold bg-[#E63946] hover:bg-[#D62836] text-white"
          >
            Reset password
          </Button>

          {/* Back to Sign In */}
          <p className="text-center text-[14px] text-[#757575]">
            Remember your password?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-[#E63946] font-semibold underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}