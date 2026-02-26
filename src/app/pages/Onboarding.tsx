import { useState } from "react";
import { useNavigate } from "react-router";
import { Mic, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "../components/ui/label";
import logoImage from "figma:asset/625b1427850930e71bf38c564b3a94f00b5a55df.png";

export function Onboarding() {
  const navigate = useNavigate();
  const { setProfile, addBalance } = useApp();
  const [gender, setGender] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [firstLanguage, setFirstLanguage] = useState("");
  const [homeState, setHomeState] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [recordingDevice, setRecordingDevice] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = () => {
    if (
      !gender ||
      !ageGroup ||
      !firstLanguage ||
      !homeState ||
      !ethnicity ||
      !occupation ||
      !recordingDevice ||
      !agreed
    ) {
      return;
    }

    setProfile({
      gender,
      ageGroup,
      firstLanguage,
      homeState,
      ethnicity,
      occupation,
      recordingDevice,
      agreedToDataProcessing: agreed,
    });
    addBalance(5, "Profile completion bonus");
    navigate("/consent");
  };

  const isFormValid =
    gender &&
    ageGroup &&
    firstLanguage &&
    homeState &&
    ethnicity &&
    occupation &&
    recordingDevice &&
    agreed;

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Content */}
      <div className="flex-1 px-6 pt-12 pb-24">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logoImage} alt="NCSpeech Logo" className="h-16 object-contain" />
        </div>

        {/* Title */}
        <h1 className="text-[24px] font-bold text-[#1A1A1A] text-center mb-3 leading-snug px-4">
          Your Voice Helps Improve Local Language Voice Technology
        </h1>

        {/* Subtitle */}
        <p className="text-[16px] text-[#757575] text-center mb-8 leading-relaxed">
          Start by completing the form and earn 5 points
        </p>

        {/* Form */}
        <div className="space-y-5">
          {/* Gender */}
          <div className="space-y-2">
            <Label htmlFor="gender" className="text-[#1A1A1A]">
              Your gender
            </Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger
                id="gender"
                className="h-14 bg-white border-gray-300"
              >
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
            <Label htmlFor="age" className="text-[#1A1A1A]">
              Age group
            </Label>
            <Select value={ageGroup} onValueChange={setAgeGroup}>
              <SelectTrigger
                id="age"
                className="h-14 bg-white border-gray-300"
              >
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
            <Label htmlFor="language" className="text-[#1A1A1A]">
              First language
            </Label>
            <Select value={firstLanguage} onValueChange={setFirstLanguage}>
              <SelectTrigger
                id="language"
                className="h-14 bg-white border-gray-300"
              >
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
            <Label htmlFor="homeState" className="text-[#1A1A1A]">
              Home state
            </Label>
            <Select value={homeState} onValueChange={setHomeState}>
              <SelectTrigger
                id="homeState"
                className="h-14 bg-white border-gray-300"
              >
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
            <Label htmlFor="ethnicity" className="text-[#1A1A1A]">
              Ethnicity
            </Label>
            <Select value={ethnicity} onValueChange={setEthnicity}>
              <SelectTrigger
                id="ethnicity"
                className="h-14 bg-white border-gray-300"
              >
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
            <Label htmlFor="occupation" className="text-[#1A1A1A]">
              Occupation
            </Label>
            <Select value={occupation} onValueChange={setOccupation}>
              <SelectTrigger
                id="occupation"
                className="h-14 bg-white border-gray-300"
              >
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
                <SelectItem value="notEmployed">
                  Not currently employed
                </SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Recording Device */}
          <div className="space-y-2">
            <Label htmlFor="recordingDevice" className="text-[#1A1A1A]">
              What device will you use to record
            </Label>
            <Select value={recordingDevice} onValueChange={setRecordingDevice}>
              <SelectTrigger
                id="recordingDevice"
                className="h-14 bg-white border-gray-300"
              >
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

          {/* Checkbox */}
          <div className="flex items-start space-x-3 pt-2">
            <Checkbox
              id="agreement"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="mt-1 border-gray-400 data-[state=checked]:bg-[#E63946] data-[state=checked]:border-[#E63946]"
            />
            <label
              htmlFor="agreement"
              className="text-[14px] text-[#757575] leading-relaxed cursor-pointer"
            >
              I agree to the processing of anonymized voice data
            </label>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="w-full h-14 text-[16px] font-semibold bg-[#E63946] hover:bg-[#D62836] text-white disabled:bg-gray-300 disabled:text-gray-500"
        >
          Save and get 5 points
        </Button>
      </div>
    </div>
  );
}