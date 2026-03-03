import { useNavigate } from "react-router";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-12 h-12 text-[#E63946]" />
        </div>

        {/* Error Code */}
        <h1 className="text-[64px] font-bold text-[#E63946] mb-2">404</h1>
        
        {/* Title */}
        <h2 className="text-[24px] font-bold text-[#1A1A1A] mb-3">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-[16px] text-[#757575] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate("/dashboard")}
            className="w-full h-14 bg-[#E63946] hover:bg-[#D62836] text-white font-semibold text-[16px]"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Dashboard
          </Button>

          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="w-full h-14 border-2 border-gray-300 hover:border-[#E63946] hover:text-[#E63946] font-semibold text-[16px]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
