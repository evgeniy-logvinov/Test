import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Edit2, Check, X, TrendingUp, TrendingDown, Coins, Wallet } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

export function Profile() {
  const navigate = useNavigate();
  const { profile, updateProfile, transactions, deductBalance, user } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [isRedeemDialogOpen, setIsRedeemDialogOpen] = useState(false);

  // Edit form state
  const [gender, setGender] = useState(profile?.gender || "");
  const [ageGroup, setAgeGroup] = useState(profile?.ageGroup || "");
  const [firstLanguage, setFirstLanguage] = useState(profile?.firstLanguage || "");
  const [homeState, setHomeState] = useState(profile?.homeState || "");
  const [ethnicity, setEthnicity] = useState(profile?.ethnicity || "");
  const [occupation, setOccupation] = useState(profile?.occupation || "");
  const [recordingDevice, setRecordingDevice] = useState(profile?.recordingDevice || "");

  const handleSave = () => {
    if (!gender || !ageGroup || !firstLanguage || !homeState || !ethnicity || !occupation || !recordingDevice) {
      toast.error("Please fill in all fields");
      return;
    }

    updateProfile({
      gender,
      ageGroup,
      firstLanguage,
      homeState,
      ethnicity,
      occupation,
      recordingDevice,
      agreedToDataProcessing: profile?.agreedToDataProcessing || true,
      points: profile?.points || 0,
    });

    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleCancel = () => {
    // Reset to original values
    setGender(profile?.gender || "");
    setAgeGroup(profile?.ageGroup || "");
    setFirstLanguage(profile?.firstLanguage || "");
    setHomeState(profile?.homeState || "");
    setEthnicity(profile?.ethnicity || "");
    setOccupation(profile?.occupation || "");
    setRecordingDevice(profile?.recordingDevice || "");
    setIsEditing(false);
  };

  const handleRedeemPoints = () => {
    const pointsToRedeem = profile?.points || 0;
    
    if (pointsToRedeem === 0) {
      toast.error("You don't have any points to redeem");
      return;
    }

    // Deduct all points
    deductBalance(pointsToRedeem, "Points redeemed via TnGo Reload Pin");
    
    // Close dialog
    setIsRedeemDialogOpen(false);
    
    // Show success message
    toast.success(
      `Success! The organizer will send a TnGo Reload Pin to ${user?.email || "your email"} shortly.`,
      {
        duration: 6000,
      }
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getDisplayValue = (field: string, value: string) => {
    const valueMap: Record<string, Record<string, string>> = {
      gender: { male: "Male", female: "Female", other: "Other" },
      ageGroup: {
        "18-24": "18-24 years",
        "25-34": "25-34 years",
        "35-44": "35-44 years",
        "45-54": "45-54 years",
        "55+": "55+ years",
      },
      firstLanguage: {
        malay: "Malay",
        mandarin: "Mandarin",
        english: "English",
        tamil: "Tamil",
        cantonese: "Cantonese",
        hokkien: "Hokkien",
      },
      homeState: {
        johor: "Johor",
        kedah: "Kedah",
        kelantan: "Kelantan",
        melaka: "Melaka",
        negeriSembilan: "Negeri Sembilan",
        pahang: "Pahang",
        penang: "Penang",
        perak: "Perak",
        perlis: "Perlis",
        sabah: "Sabah",
        sarawak: "Sarawak",
        selangor: "Selangor",
        terengganu: "Terengganu",
        kualaLumpur: "Kuala Lumpur",
        putrajaya: "Putrajaya",
        labuan: "Labuan",
      },
      ethnicity: {
        malay: "Malay",
        chinese: "Chinese",
        indian: "Indian",
        indigenous: "Indigenous (Sabah / Sarawak)",
        mixed: "Mixed",
        other: "Other",
      },
      occupation: {
        healthcare: "Healthcare",
        it: "IT & Technology",
        education: "Education",
        transportation: "Transportation & Logistics",
        finance: "Finance & Banking",
        retail: "Retail & Sales",
        student: "Student",
        notEmployed: "Not currently employed",
        other: "Other",
      },
      recordingDevice: {
        ios: "Smartphone (iOS: iPhone models)",
        android: "Smartphone (Android: Samsung, Xiaomi, Oppo, Vivo, etc.)",
      },
    };

    return valueMap[field]?.[value] || value;
  };

  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col pb-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          <h1 className="text-[18px] font-bold text-[#1A1A1A]">My Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
            >
              <Edit2 className="w-5 h-5 text-[#E63946]" />
            </button>
          ) : (
            <div className="w-10" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 space-y-6">
        {/* Points Balance Card */}
        <div className="bg-gradient-to-br from-[#E63946] to-[#D62836] rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-white/80 text-[14px] font-medium mb-1">
                Current Balance
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-white text-[36px] font-bold">
                  {profile?.points || 0}
                </h2>
                <span className="text-white/90 text-[16px] font-semibold">
                  pts
                </span>
              </div>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Coins className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
            <div>
              <p className="text-white/70 text-[12px]">Tasks completed</p>
              <p className="text-white text-[16px] font-semibold">
                {transactions.filter(t => t.type === "credit" && t.description.includes("approved")).length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-[12px]">Pending review</p>
              <p className="text-white text-[16px] font-semibold">
                {transactions.filter(t => t.description.includes("submitted") || t.description.includes("Under review")).length}
              </p>
            </div>
          </div>

          {/* Redeem Button */}
          <Button
            onClick={() => setIsRedeemDialogOpen(true)}
            disabled={(profile?.points || 0) === 0}
            className="w-full h-12 mt-4 bg-white text-[#E63946] hover:bg-white/90 font-semibold text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wallet className="w-4 h-4 mr-2" />
            Redeem Points
          </Button>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-4">
            Personal Information
          </h2>

          {!isEditing ? (
            // View Mode
            <div className="space-y-3">
              <div>
                <p className="text-[12px] text-[#757575] mb-1">Gender</p>
                <p className="text-[14px] text-[#1A1A1A]">
                  {getDisplayValue("gender", profile?.gender || "")}
                </p>
              </div>
              <div>
                <p className="text-[12px] text-[#757575] mb-1">Age Group</p>
                <p className="text-[14px] text-[#1A1A1A]">
                  {getDisplayValue("ageGroup", profile?.ageGroup || "")}
                </p>
              </div>
              <div>
                <p className="text-[12px] text-[#757575] mb-1">First Language</p>
                <p className="text-[14px] text-[#1A1A1A]">
                  {getDisplayValue("firstLanguage", profile?.firstLanguage || "")}
                </p>
              </div>
              <div>
                <p className="text-[12px] text-[#757575] mb-1">Home State</p>
                <p className="text-[14px] text-[#1A1A1A]">
                  {getDisplayValue("homeState", profile?.homeState || "")}
                </p>
              </div>
              <div>
                <p className="text-[12px] text-[#757575] mb-1">Ethnicity</p>
                <p className="text-[14px] text-[#1A1A1A]">
                  {getDisplayValue("ethnicity", profile?.ethnicity || "")}
                </p>
              </div>
              <div>
                <p className="text-[12px] text-[#757575] mb-1">Occupation</p>
                <p className="text-[14px] text-[#1A1A1A]">
                  {getDisplayValue("occupation", profile?.occupation || "")}
                </p>
              </div>
              <div>
                <p className="text-[12px] text-[#757575] mb-1">Recording Device</p>
                <p className="text-[14px] text-[#1A1A1A]">
                  {getDisplayValue("recordingDevice", profile?.recordingDevice || "")}
                </p>
              </div>
            </div>
          ) : (
            // Edit Mode
            <div className="space-y-4">
              {/* Gender */}
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-[#1A1A1A] text-[12px]">
                  Gender
                </Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger id="gender" className="h-12 bg-white border-gray-300">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Age Group */}
              <div className="space-y-2">
                <Label htmlFor="age" className="text-[#1A1A1A] text-[12px]">
                  Age Group
                </Label>
                <Select value={ageGroup} onValueChange={setAgeGroup}>
                  <SelectTrigger id="age" className="h-12 bg-white border-gray-300">
                    <SelectValue placeholder="Select age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18-24">18-24 years</SelectItem>
                    <SelectItem value="25-34">25-34 years</SelectItem>
                    <SelectItem value="35-44">35-44 years</SelectItem>
                    <SelectItem value="45-54">45-54 years</SelectItem>
                    <SelectItem value="55+">55+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* First Language */}
              <div className="space-y-2">
                <Label htmlFor="language" className="text-[#1A1A1A] text-[12px]">
                  First Language
                </Label>
                <Select value={firstLanguage} onValueChange={setFirstLanguage}>
                  <SelectTrigger id="language" className="h-12 bg-white border-gray-300">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="malay">Malay</SelectItem>
                    <SelectItem value="mandarin">Mandarin</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="tamil">Tamil</SelectItem>
                    <SelectItem value="cantonese">Cantonese</SelectItem>
                    <SelectItem value="hokkien">Hokkien</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Home State */}
              <div className="space-y-2">
                <Label htmlFor="homeState" className="text-[#1A1A1A] text-[12px]">
                  Home State
                </Label>
                <Select value={homeState} onValueChange={setHomeState}>
                  <SelectTrigger id="homeState" className="h-12 bg-white border-gray-300">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="johor">Johor</SelectItem>
                    <SelectItem value="kedah">Kedah</SelectItem>
                    <SelectItem value="kelantan">Kelantan</SelectItem>
                    <SelectItem value="melaka">Melaka</SelectItem>
                    <SelectItem value="negeriSembilan">Negeri Sembilan</SelectItem>
                    <SelectItem value="pahang">Pahang</SelectItem>
                    <SelectItem value="penang">Penang</SelectItem>
                    <SelectItem value="perak">Perak</SelectItem>
                    <SelectItem value="perlis">Perlis</SelectItem>
                    <SelectItem value="sabah">Sabah</SelectItem>
                    <SelectItem value="sarawak">Sarawak</SelectItem>
                    <SelectItem value="selangor">Selangor</SelectItem>
                    <SelectItem value="terengganu">Terengganu</SelectItem>
                    <SelectItem value="kualaLumpur">Kuala Lumpur</SelectItem>
                    <SelectItem value="putrajaya">Putrajaya</SelectItem>
                    <SelectItem value="labuan">Labuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ethnicity */}
              <div className="space-y-2">
                <Label htmlFor="ethnicity" className="text-[#1A1A1A] text-[12px]">
                  Ethnicity
                </Label>
                <Select value={ethnicity} onValueChange={setEthnicity}>
                  <SelectTrigger id="ethnicity" className="h-12 bg-white border-gray-300">
                    <SelectValue placeholder="Select ethnicity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="malay">Malay</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="indian">Indian</SelectItem>
                    <SelectItem value="indigenous">
                      Indigenous (Sabah / Sarawak)
                    </SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Occupation */}
              <div className="space-y-2">
                <Label htmlFor="occupation" className="text-[#1A1A1A] text-[12px]">
                  Occupation
                </Label>
                <Select value={occupation} onValueChange={setOccupation}>
                  <SelectTrigger id="occupation" className="h-12 bg-white border-gray-300">
                    <SelectValue placeholder="Select occupation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="it">IT & Technology</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="transportation">
                      Transportation & Logistics
                    </SelectItem>
                    <SelectItem value="finance">Finance & Banking</SelectItem>
                    <SelectItem value="retail">Retail & Sales</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="notEmployed">Not currently employed</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Recording Device */}
              <div className="space-y-2">
                <Label htmlFor="recordingDevice" className="text-[#1A1A1A] text-[12px]">
                  Recording Device
                </Label>
                <Select value={recordingDevice} onValueChange={setRecordingDevice}>
                  <SelectTrigger id="recordingDevice" className="h-12 bg-white border-gray-300">
                    <SelectValue placeholder="Select device" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ios">
                      Smartphone (iOS: iPhone models)
                    </SelectItem>
                    <SelectItem value="android">
                      Smartphone (Android: Samsung, Xiaomi, Oppo, Vivo, etc.)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1 h-12 text-[14px] font-semibold border-gray-300 text-[#757575] hover:bg-gray-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1 h-12 text-[14px] font-semibold bg-[#E63946] hover:bg-[#D62836] text-white"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-4">
            Points History
          </h2>

          {sortedTransactions.length > 0 ? (
            <div className="space-y-3">
              {sortedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        transaction.type === "credit"
                          ? "bg-red-100"
                          : "bg-gray-100"
                      }`}
                    >
                      {transaction.type === "credit" ? (
                        <TrendingUp className="w-4 h-4 text-[#E63946]" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-[#757575]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-[#1A1A1A] font-medium">
                        {transaction.description}
                      </p>
                      <p className="text-[12px] text-[#757575] mt-1">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-[16px] font-bold flex-shrink-0 ml-3 ${
                      transaction.type === "credit"
                        ? "text-[#E63946]"
                        : "text-[#757575]"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-[14px] text-[#757575]">No transactions yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Redeem Confirmation Dialog */}
      <Dialog open={isRedeemDialogOpen} onOpenChange={setIsRedeemDialogOpen}>
        <DialogContent className="max-w-[90%] sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-[18px] font-bold text-[#1A1A1A]">
              Redeem Points
            </DialogTitle>
            <DialogDescription className="text-[14px] text-[#757575] pt-2">
              You are about to redeem <span className="font-bold text-[#E63946]">{profile?.points || 0} points</span>.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-[14px] text-blue-900">
                The organizer will send a TnGo Reload Pin to <span className="font-semibold">{user?.email || "your email"}</span> within 1-3 business days.
              </p>
            </div>
          </div>

          <DialogFooter className="flex-row gap-3 sm:gap-3">
            <Button
              onClick={() => setIsRedeemDialogOpen(false)}
              variant="outline"
              className="flex-1 h-12 text-[14px] font-semibold border-gray-300 text-[#757575] hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRedeemPoints}
              className="flex-1 h-12 text-[14px] font-semibold bg-[#E63946] hover:bg-[#D62836] text-white"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}