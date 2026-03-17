import { useState } from "react";
import { AdminLayout } from "../../layouts/AdminLayout";
import { Save, DollarSign, Award, Users, Shield } from "lucide-react";

interface Settings {
  minPayoutPoints: number;
  pointsToFiatRate: number;
  voiceTaskPoints: number;
  transcriptionTaskPoints: number;
  newUserBonusPoints: number;
  profileCompletionPoints: number;
  maxTasksPerDay: number;
  reviewTimeoutHours: number;
}

export function AdminSettings() {
  const [settings, setSettings] = useState<Settings>({
    minPayoutPoints: 50,
    pointsToFiatRate: 0.1,
    voiceTaskPoints: 5,
    transcriptionTaskPoints: 8,
    newUserBonusPoints: 0,
    profileCompletionPoints: 5,
    maxTasksPerDay: 50,
    reviewTimeoutHours: 48,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (key: keyof Settings, value: number) => {
    setSettings({ ...settings, [key]: value });
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log("Saving settings:", settings);
    setHasChanges(false);
    // Show success toast
  };

  const handleReset = () => {
    setSettings({
      minPayoutPoints: 50,
      pointsToFiatRate: 0.1,
      voiceTaskPoints: 5,
      transcriptionTaskPoints: 8,
      newUserBonusPoints: 0,
      profileCompletionPoints: 5,
      maxTasksPerDay: 50,
      reviewTimeoutHours: 48,
    });
    setHasChanges(false);
  };

  return (
    <AdminLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[28px] font-bold text-[#1A1A1A]">Settings</h1>
              <p className="text-[14px] text-[#757575] mt-1">
                Configure system parameters and rewards
              </p>
            </div>
            {hasChanges && (
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="px-6 h-[44px] border border-gray-300 text-[#1A1A1A] text-[14px] font-semibold rounded-lg hover:bg-[#F5F5F5] transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 h-[44px] bg-[#E63946] text-white text-[14px] font-semibold rounded-lg hover:bg-[#d4183d] transition-colors flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Payout Settings */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-gray-900">
                      Payout Settings
                    </h3>
                    <p className="text-[13px] text-gray-600">
                      Configure redemption parameters
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                    Minimum Payout (Points)
                  </label>
                  <input
                    type="number"
                    value={settings.minPayoutPoints}
                    onChange={(e) =>
                      handleChange("minPayoutPoints", parseInt(e.target.value))
                    }
                    className="w-full h-[48px] px-4 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[12px] text-gray-500 mt-1">
                    Users must have at least this many points to request a
                    payout
                  </p>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                    Points to Fiat Rate (RM per point)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={settings.pointsToFiatRate}
                    onChange={(e) =>
                      handleChange(
                        "pointsToFiatRate",
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-full h-[48px] px-4 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[12px] text-gray-500 mt-1">
                    Current: 1 point = RM {settings.pointsToFiatRate.toFixed(2)}{" "}
                    • 100 points = RM{" "}
                    {(settings.pointsToFiatRate * 100).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Task Rewards */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-gray-900">
                      Task Rewards
                    </h3>
                    <p className="text-[13px] text-gray-600">
                      Default points for each task type
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                    Voice Recording Task
                  </label>
                  <input
                    type="number"
                    value={settings.voiceTaskPoints}
                    onChange={(e) =>
                      handleChange("voiceTaskPoints", parseInt(e.target.value))
                    }
                    className="w-full h-[48px] px-4 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[12px] text-gray-500 mt-1">
                    Points awarded for completing a voice recording task
                  </p>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                    Transcription Task
                  </label>
                  <input
                    type="number"
                    value={settings.transcriptionTaskPoints}
                    onChange={(e) =>
                      handleChange(
                        "transcriptionTaskPoints",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full h-[48px] px-4 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[12px] text-gray-500 mt-1">
                    Points awarded for completing a transcription task
                  </p>
                </div>
              </div>
            </div>

            {/* User Bonuses */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-gray-900">
                      User Bonuses
                    </h3>
                    <p className="text-[13px] text-gray-600">
                      Welcome and milestone rewards
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                    New User Signup Bonus
                  </label>
                  <input
                    type="number"
                    value={settings.newUserBonusPoints}
                    onChange={(e) =>
                      handleChange(
                        "newUserBonusPoints",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full h-[48px] px-4 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                  />
                  <p className="text-[12px] text-gray-500 mt-1">
                    Points given to new users upon registration
                  </p>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                    Profile Completion Bonus
                  </label>
                  <input
                    type="number"
                    value={settings.profileCompletionPoints}
                    onChange={(e) =>
                      handleChange(
                        "profileCompletionPoints",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full h-[48px] px-4 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[12px] text-gray-500 mt-1">
                    Points awarded for completing profile during onboarding
                  </p>
                </div>
              </div>
            </div>

            {/* System Limits */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-gray-900">
                      System Limits
                    </h3>
                    <p className="text-[13px] text-gray-600">
                      Anti-abuse and quality controls
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                    Max Tasks Per Day (Per User)
                  </label>
                  <input
                    type="number"
                    value={settings.maxTasksPerDay}
                    onChange={(e) =>
                      handleChange("maxTasksPerDay", parseInt(e.target.value))
                    }
                    className="w-full h-[48px] px-4 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[12px] text-gray-500 mt-1">
                    Maximum number of tasks a user can complete in 24 hours
                  </p>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                    Review Timeout (Hours)
                  </label>
                  <input
                    type="number"
                    value={settings.reviewTimeoutHours}
                    onChange={(e) =>
                      handleChange(
                        "reviewTimeoutHours",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full h-[48px] px-4 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[12px] text-gray-500 mt-1">
                    Auto-approve tasks if not reviewed within this timeframe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}