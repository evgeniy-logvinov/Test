import { useNavigate } from "react-router";
import { ArrowLeft, FileText } from "lucide-react";

export function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#E63946]" />
            <h1 className="text-[18px] font-bold text-[#1A1A1A]">
              Terms of Service
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          {/* Last Updated */}
          <div className="text-[12px] text-[#757575]">
            Last updated: March 2, 2026
          </div>

          {/* Introduction */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              1. Introduction
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed">
              Welcome to our voice recording and transcription platform. By accessing or using our services, you agree to be bound by these Terms of Service. Please read them carefully before participating in any tasks.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              2. Eligibility
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed mb-2">
              To use our platform, you must:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[14px] text-[#757575] ml-4">
              <li>Be at least 18 years old or the age of majority in your jurisdiction</li>
              <li>Have the legal capacity to enter into binding agreements</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              3. User Responsibilities
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed mb-2">
              When completing tasks, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[14px] text-[#757575] ml-4">
              <li>Provide genuine voice recordings in a quiet environment</li>
              <li>Read scripts clearly and at a natural pace</li>
              <li>Provide accurate transcriptions of audio content</li>
              <li>Not use artificial voices, voice changers, or automated tools</li>
              <li>Not submit copyrighted material without permission</li>
              <li>Complete tasks in good faith without attempting to game the system</li>
            </ul>
          </section>

          {/* Quality Standards */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              4. Quality Standards
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed">
              All submissions are subject to quality review. We reserve the right to reject submissions that do not meet our quality standards, including recordings with excessive background noise, unclear speech, or inaccurate transcriptions. Rejected tasks may be reassigned for correction.
            </p>
          </section>

          {/* Points and Rewards */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              5. Points and Rewards
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed mb-2">
              Regarding points earned on the platform:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[14px] text-[#757575] ml-4">
              <li>Points are awarded only for approved tasks</li>
              <li>Points have no cash value until redeemed</li>
              <li>Redemption options and minimum thresholds may change</li>
              <li>We reserve the right to adjust point values</li>
              <li>Points may expire after a period of account inactivity</li>
              <li>Fraudulent activity may result in point forfeiture</li>
            </ul>
          </section>

          {/* Data Usage */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              6. Data Usage
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed">
              By submitting voice recordings and transcriptions, you grant us a worldwide, royalty-free license to use, store, process, and analyze your submissions for the purpose of training artificial intelligence and machine learning models. For more details, please review our Privacy Policy.
            </p>
          </section>

          {/* Account Termination */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              7. Account Termination
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or abuse the platform. You may also request account deletion at any time through the Settings page.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              8. Limitation of Liability
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed">
              The platform is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              9. Changes to Terms
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed">
              We may update these Terms of Service from time to time. Continued use of the platform after changes constitutes acceptance of the new terms. We will notify users of significant changes via email or platform notifications.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              10. Contact Information
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed">
              If you have questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:support@example.com" className="text-[#E63946] hover:underline">
                support@example.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
