import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import logoImage from "figma:asset/2b869d9dab99bf679a91f50c1a711792e8dbf59e.png";

export function Auth() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailAuth = () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simple email validation
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    if (isLogin) {
      // Sign in
      setUser({ email, name: email.split("@")[0] });
      toast.success("Welcome back!");
      navigate("/onboarding");
    } else {
      // Redirect to sign up page
      navigate("/signup");
    }
  };

  const handleGoogleAuth = () => {
    // Navigate to Google auth flow
    navigate("/auth/google");
  };

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
          Voice recording platform
        </h1>

        {/* Subtitle */}
        <p className="text-[16px] text-[#757575] text-center mb-10 leading-relaxed">
          Organized by NCSpeech Technologies Sdn Bhd
        </p>

        {/* Social Auth */}
        <div className="mb-6">
          {/* Google */}
          <Button
            onClick={handleGoogleAuth}
            variant="outline"
            className="w-full h-14 text-[16px] font-semibold bg-white border-gray-300 text-[#1A1A1A] hover:bg-gray-50"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
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
            Continue with Google
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-[14px] text-[#757575]">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Auth Form */}
        <div className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#1A1A1A]">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 pl-12 bg-white border-gray-300"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-[#1A1A1A]">
                Password
              </Label>
              {isLogin && (
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="text-[14px] text-[#E63946] font-semibold hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 pl-12 bg-white border-gray-300"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleEmailAuth}
            className="w-full h-14 text-[16px] font-semibold bg-[#E63946] hover:bg-[#D62836] text-white"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </Button>

          {/* Toggle Login/Register */}
          <p className="text-center text-[14px] text-[#757575]">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                if (isLogin) {
                  navigate("/signup");
                } else {
                  setIsLogin(true);
                }
              }}
              className="text-[#E63946] font-semibold underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}