import { useNavigate } from "react-router";
import { ArrowLeft, Shield } from "lucide-react";

export function Privacy() {
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
            <Shield className="w-6 h-6 text-[#E63946]" />
            <h1 className="text-[18px] font-bold text-[#1A1A1A]">
              Privacy Policy
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
              This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our voice recording and transcription platform. We are committed to protecting your privacy and handling your data responsibly.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              2. Information We Collect
            </h2>
            
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-2 mt-4">
              2.1 Personal Information
            </h3>
            <p className="text-[14px] text-[#757575] leading-relaxed mb-2">
              When you register, we collect:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[14px] text-[#757575] ml-4">
              <li>Email address</li>
              <li>Name (if provided)</li>
              <li>Authentication credentials</li>
            </ul>

            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-2 mt-4">
              2.2 Profile Information
            </h3>
            <p className="text-[14px] text-[#757575] leading-relaxed mb-2">
              During onboarding, we collect demographic data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[14px] text-[#757575] ml-4">
              <li>Gender and age group</li>
              <li>First language</li>
              <li>Home state (Malaysia)</li>
              <li>Ethnicity</li>
              <li>Occupation</li>
              <li>Recording device type (iOS/Android)</li>
            </ul>

            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-2 mt-4">
              2.3 Voice Recordings and Transcriptions
            </h3>
            <p className="text-[14px] text-[#757575] leading-relaxed">
              We collect and store all voice recordings and transcriptions you submit as part of task completion. These recordings may contain your voice biometric data.
            </p>

            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-2 mt-4">
              2.4 Usage Data
            </h3>
            <p className="text-[14px] text-[#757575] leading-relaxed mb-2">
              We automatically collect:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[14px] text-[#757575] ml-4">
              <li>Device information and operating system</li>
              <li>Browser type and version</li>
              <li>IP address and location data</li>
              <li>Task completion times and patterns</li>
              <li>App usage statistics</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              3. How We Use Your Information
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed mb-2">
              We use your data for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[14px] text-[#757575] ml-4">
              <li>To provide and maintain our services</li>
              <li>To process task submissions and award points</li>
              <li>To train and improve AI/ML models for speech recognition</li>
              <li>To ensure data diversity and quality</li>
              <li>To communicate with you about your account</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To comply with legal obligations</li>
              <li>To improve platform performance and user experience</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              4. Data Sharing and Disclosure
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed mb-2">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[14px] text-[#757575] ml-4">
              <li><strong>Service providers:</strong> Third-party companies that help us operate the platform (cloud storage, analytics)</li>
              <li><strong>AI/ML partners:</strong> Organizations that use anonymized voice data for model training</li>
              <li><strong>Legal authorities:</strong> When required by law or to protect our rights</li>
            </ul>
            <p className="text-[14px] text-[#757575] leading-relaxed mt-3">
              <strong>Important:</strong> Voice recordings shared with AI partners are anonymized and not linked to your personal identity.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              5. Data Security
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed">
              We implement industry-standard security measures to protect your data, including encryption in transit and at rest, secure authentication, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              6. Data Retention
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed mb-2">
              We retain your data as follows:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[14px] text-[#757575] ml-4">
              <li><strong>Account data:</strong> Until you delete your account</li>
              <li><strong>Voice recordings:</strong> Indefinitely for AI training purposes (anonymized)</li>
              <li><strong>Transaction history:</strong> For 7 years for accounting purposes</li>
              <li><strong>Usage logs:</strong> For 90 days</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              7. Your Rights
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed mb-2">
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[14px] text-[#757575] ml-4">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update inaccurate information via your profile</li>
              <li><strong>Deletion:</strong> Request account deletion (note: anonymized recordings may be retained)</li>
              <li><strong>Portability:</strong> Request your data in a machine-readable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>
            <p className="text-[14px] text-[#757575] leading-relaxed mt-3">
              To exercise these rights, contact us at{" "}
              <a href="mailto:privacy@example.com" className="text-[#E63946] hover:underline">
                privacy@example.com
              </a>
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              8. Children's Privacy
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed">
              Our platform is not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected data from a minor, please contact us immediately.
            </p>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              9. International Data Transfers
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed">
              Your data may be transferred to and processed in countries outside your jurisdiction. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              10. Cookies and Tracking
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed">
              We use cookies and similar technologies to maintain your session, remember your preferences, and analyze platform usage. You can control cookie settings through your browser, but disabling cookies may affect platform functionality.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              11. Changes to This Policy
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed">
              We may update this Privacy Policy periodically. We will notify you of significant changes via email or platform notification. Your continued use of the platform constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-3">
              12. Contact Us
            </h2>
            <p className="text-[14px] text-[#757575] leading-relaxed">
              For questions or concerns about this Privacy Policy or our data practices, please contact:
            </p>
            <div className="mt-3 p-4 bg-gray-50 rounded-lg">
              <p className="text-[14px] text-[#1A1A1A] mb-1">
                <strong>Privacy Team</strong>
              </p>
              <p className="text-[14px] text-[#757575]">
                Email:{" "}
                <a href="mailto:privacy@example.com" className="text-[#E63946] hover:underline">
                  privacy@example.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
