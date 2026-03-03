import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import logoImage from "figma:asset/2b869d9dab99bf679a91f50c1a711792e8dbf59e.png";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetPassword = () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Simple email validation
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Simulate checking if email exists and sending reset link
    toast.success("Reset link sent! Check your email inbox.");
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#E63946] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-[16px] font-medium">Back to Sign In</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 pt-12 pb-6 flex flex-col items-center justify-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[28px] font-bold text-[#1A1A1A] text-center mb-3">
            Check your email
          </h1>

          {/* Subtitle */}
          <p className="text-[16px] text-[#757575] text-center mb-8 leading-relaxed max-w-md">
            We've sent a password reset link to{" "}
            <span className="font-semibold text-[#1A1A1A]">{email}</span>
          </p>

          <p className="text-[14px] text-[#757575] text-center mb-8 leading-relaxed max-w-md">
            Click the link in the email to reset your password. If you don't see
            the email, check your spam folder.
          </p>

          {/* Actions */}
          <div className="w-full max-w-md space-y-4">
            <Button
              onClick={() => navigate("/reset-password?token=test-token-123456789")}
              className="w-full h-14 text-[16px] font-semibold bg-[#E63946] hover:bg-[#D62836] text-white"
            >
              Open reset link (Demo)
            </Button>

            <Button
              onClick={() => navigate("/")}
              className="w-full h-14 text-[16px] font-semibold bg-white hover:bg-gray-50 text-[#1A1A1A] border border-gray-300"
            >
              Back to Sign In
            </Button>

            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full text-[14px] text-[#E63946] font-semibold underline"
            >
              Resend email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#E63946] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[16px] font-medium">Back to Sign In</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-12 pb-6 flex flex-col">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logoImage} alt="Logo" className="w-40 h-40 object-contain" />
        </div>

        {/* Title */}
        <h1 className="text-[28px] font-bold text-[#1A1A1A] text-center mb-3">
          Reset your password
        </h1>

        {/* Subtitle */}
        <p className="text-[16px] text-[#757575] text-center mb-10 leading-relaxed">
          Enter your email address and we'll send you a link to reset your password
        </p>

        {/* Reset Form */}
        <div className="space-y-5 max-w-md mx-auto w-full">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="reset-email" className="text-[#1A1A1A]">
              Email address
            </Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
              <Input
                id="reset-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleResetPassword();
                  }
                }}
                className="h-14 pl-12 bg-white border-gray-300"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleResetPassword}
            className="w-full h-14 text-[16px] font-semibold bg-[#E63946] hover:bg-[#D62836] text-white"
          >
            Send reset link
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