import { useNavigate } from "react-router";
import { CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import logoImage from "figma:asset/2b869d9dab99bf679a91f50c1a711792e8dbf59e.png";

export function PasswordResetSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      <div className="flex-1 px-6 pt-12 pb-6 flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logoImage} alt="Logo" className="w-32 h-32 object-contain" />
        </div>

        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[28px] font-bold text-[#1A1A1A] text-center mb-3">
          Password reset successful!
        </h1>

        {/* Subtitle */}
        <p className="text-[16px] text-[#757575] text-center mb-10 leading-relaxed max-w-md px-4">
          Your password has been successfully reset. You can now sign in with your new password.
        </p>

        {/* Action */}
        <div className="w-full max-w-md px-4">
          <Button
            onClick={() => navigate("/")}
            className="w-full h-14 text-[16px] font-semibold bg-[#E63946] hover:bg-[#D62836] text-white"
          >
            Continue to Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
