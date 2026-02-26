import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, User, ArrowLeft } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import logoImage from "figma:asset/2b869d9dab99bf679a91f50c1a711792e8dbf59e.png";

export function SignUp() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Mock registration
    setUser({ email, name });
    toast.success("Account created successfully!");
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="p-2 -ml-2"
        >
          <ArrowLeft className="w-6 h-6 text-[#1A1A1A]" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6 flex flex-col">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logoImage} alt="Logo" className="w-32 h-32 object-contain" />
        </div>

        {/* Title */}
        <h1 className="text-[28px] font-bold text-[#1A1A1A] text-center mb-3">
          Create Account
        </h1>

        {/* Subtitle */}
        <p className="text-[16px] text-[#757575] text-center mb-8 leading-relaxed">
          Sign up to start recording
        </p>

        {/* Sign Up Form */}
        <div className="space-y-5 mb-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#1A1A1A]">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 pl-12 bg-white border-gray-300"
              />
            </div>
          </div>

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
            <Label htmlFor="password" className="text-[#1A1A1A]">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
              <Input
                id="password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 pl-12 bg-white border-gray-300"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-[#1A1A1A]">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-14 pl-12 bg-white border-gray-300"
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <Button
            onClick={handleSignUp}
            className="w-full h-14 text-[16px] font-semibold bg-[#E63946] hover:bg-[#D62836] text-white mt-6"
          >
            Sign Up
          </Button>

          {/* Login Link */}
          <p className="text-center text-[14px] text-[#757575]">
            Already have an account?{" "}
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