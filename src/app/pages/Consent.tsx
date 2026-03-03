import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import logoImage from "figma:asset/625b1427850930e71bf38c564b3a94f00b5a55df.png";

export function Consent() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleAccept = () => {
    if (agreed) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex justify-center mb-2">
          <img src={logoImage} alt="NCSpeech Logo" className="h-12 object-contain" />
        </div>
        <h1 className="text-[20px] font-bold text-[#1A1A1A] text-center">
          Voice Recording Consent & Terms
        </h1>
        <p className="text-[14px] text-[#757575] text-center mt-1">
          Persetujuan Rakaman Suara dan Terma
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-2xl mx-auto px-6 py-6 text-[14px] space-y-6">
          {/* Company Name */}
          <div className="text-center space-y-1">
            <p className="font-semibold text-[#1A1A1A]">NCSpeech Technologies Sdn Bhd</p>
          </div>

          {/* Introduction */}
          <div className="space-y-2">
            <p className="text-[#1A1A1A]">
              By participating in this voice recording program, you agree to the following terms. These terms ensure legal clarity and protect both you and NCSpeech.
            </p>
            <p className="text-[#757575]">
              Dengan menyertai program rakaman suara ini, anda bersetuju dengan semua terma berikut. Terma ini memastikan kejelasan undang-undang dan melindungi kedua-dua pihak.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-2">
            <h2 className="font-semibold text-[#1A1A1A]">1. Purpose of the Program</h2>
            <p className="text-[#1A1A1A]">
              This program collects voice recordings and related metadata for the development, training, testing and evaluation of AI systems, including Automatic Speech Recognition (ASR) and Text-to-Speech (TTS).
            </p>
            <h2 className="font-semibold text-[#757575]">1. Tujuan Program</h2>
            <p className="text-[#757575]">
              Program ini mengumpul rakaman suara dan metadata berkaitan untuk pembangunan, latihan, pengujian dan penilaian sistem AI termasuk Automatic Speech Recognition (ASR) dan Text-to-Speech (TTS).
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h2 className="font-semibold text-[#1A1A1A]">2. Eligibility</h2>
            <p className="text-[#1A1A1A]">
              Participation is limited to Malaysian citizens and individuals who agree to all terms in this document.
              <br />
              You confirm that all information provided is accurate and truthful.
            </p>
            <h2 className="font-semibold text-[#757575]">2. Kelayakan</h2>
            <p className="text-[#757575]">
              Penyertaan terhad kepada warganegara Malaysia yang bersetuju dengan semua terma ini.
              <br />
              Anda mengesahkan bahawa maklumat yang diberikan adalah tepat dan benar.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h2 className="font-semibold text-[#1A1A1A]">3. Consent to Record and Use Your Voice</h2>
            <p className="text-[#1A1A1A]">
              By participating, you consent to the recording of your voice, storage and processing of the audio data, and analysis of your recordings for AI development.
              <br />
              Your data may be used in commercial and non-commercial applications.
            </p>
            <h2 className="font-semibold text-[#757575]">3. Persetujuan Rakaman dan Penggunaan Suara</h2>
            <p className="text-[#757575]">
              Dengan menyertai, anda bersetuju bahawa suara anda akan dirakam, data audio akan disimpan dan diproses, dan rakaman akan dianalisis untuk pembangunan AI.
              <br />
              Data anda boleh digunakan untuk tujuan komersial dan bukan komersial.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h2 className="font-semibold text-[#1A1A1A]">4. Transfer of Rights and Ownership</h2>
            <p className="text-[#1A1A1A]">
              After you complete the recording session and receive the reward, you agree to the following:
            </p>
            <p className="text-[#1A1A1A] pl-4">
              <strong>4.1 Transfer of rights</strong>
              <br />
              You assign to NCSpeech full ownership of your recordings and associated metadata, including copyright, usage rights and derivative rights.
            </p>
            <p className="text-[#1A1A1A] pl-4">
              <strong>4.2 Waiver of claims</strong>
              <br />
              You permanently waive any right to withdraw consent, any right to royalties or future compensation, and any claim over the recordings.
            </p>
            <p className="text-[#1A1A1A] pl-4">
              <strong>4.3 Unlimited usage</strong>
              <br />
              NCSpeech may use, modify, annotate, analyze, publish, license or redistribute your recordings.
              <br />
              NCSpeech may also share the data with clients, partners and third-party AI providers.
              <br />
              Data may be used globally and without time limits.
            </p>
            
            <h2 className="font-semibold text-[#757575] mt-3">4. Pemindahan Hak dan Pemilikan</h2>
            <p className="text-[#757575]">
              Selepas sesi rakaman disiapkan dan ganjaran diterima, anda bersetuju dengan perkara berikut:
            </p>
            <p className="text-[#757575] pl-4">
              <strong>4.1 Pemindahan hak</strong>
              <br />
              Anda menyerahkan kepada NCSpeech hak pemilikan penuh ke atas semua rakaman dan metadata berkaitan, termasuk hak cipta dan hak terbitan.
            </p>
            <p className="text-[#757575] pl-4">
              <strong>4.2 Pelepasan tuntutan</strong>
              <br />
              Anda melepaskan hak untuk menarik balik persetujuan, hak untuk menerima royalti atau pampasan lain dan sebarang tuntutan terhadap rakaman.
            </p>
            <p className="text-[#757575] pl-4">
              <strong>4.3 Hak penggunaan tanpa had</strong>
              <br />
              NCSpeech boleh menggunakan, mengubah, menganotasi, menganalisis, menerbit, melesen atau mengagihkan rakaman anda.
              <br />
              Data boleh dikongsi dengan pelanggan, rakan kerjasama atau penyedia AI pihak ketiga.
              <br />
              Data boleh digunakan secara global dan tanpa had masa.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-2">
            <h2 className="font-semibold text-[#1A1A1A]">5. Data Collected</h2>
            <p className="text-[#1A1A1A]">
              NCSpeech may collect audio recordings, demographic information (age group, gender, ethnicity, state, language), device information and technical metadata such as timestamps, quality scores and pseudonymous speaker IDs.
              <br />
              We do not collect NRIC numbers or sensitive financial data.
            </p>
            <h2 className="font-semibold text-[#757575]">5. Data yang Dikumpul</h2>
            <p className="text-[#757575]">
              NCSpeech boleh mengumpul rakaman audio, data demografi (kumpulan umur, jantina, etnik, negeri, bahasa), maklumat peranti dan metadata teknikal seperti timestamp, skor kualiti dan ID penutur pseudonim.
              <br />
              Kami tidak mengumpul nombor NRIC atau data kewangan sensitif.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-2">
            <h2 className="font-semibold text-[#1A1A1A]">6. Rewards and Payment</h2>
            <p className="text-[#1A1A1A]">
              You will receive the stated reward only if the recording session is fully completed, the recordings pass quality checks and your eligibility is confirmed.
              <br />
              NCSpeech may reject recordings that do not meet quality standards.
            </p>
            <h2 className="font-semibold text-[#757575]">6. Ganjaran dan Pembayaran</h2>
            <p className="text-[#757575]">
              Ganjaran hanya akan diberikan jika sesi rakaman diselesaikan sepenuhnya, rakaman lulus pemeriksaan kualiti dan kelayakan disahkan.
              <br />
              NCSpeech berhak menolak rakaman yang tidak memenuhi piawaian.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-2">
            <h2 className="font-semibold text-[#1A1A1A]">7. No Liability</h2>
            <p className="text-[#1A1A1A]">
              Participation is voluntary. NCSpeech is not responsible for any direct or indirect damages related to the recording process.
            </p>
            <h2 className="font-semibold text-[#757575]">7. Liabiliti</h2>
            <p className="text-[#757575]">
              Penyertaan adalah sukarela. NCSpeech tidak bertanggungjawab atas sebarang kerosakan langsung atau tidak langsung yang berlaku semasa proses rakaman.
            </p>
          </div>

          {/* Section 8 */}
          <div className="space-y-2">
            <h2 className="font-semibold text-[#1A1A1A]">8. Data Storage and Security</h2>
            <p className="text-[#1A1A1A]">
              Data may be stored on NCSpeech servers or third-party infrastructure providers, in Malaysia or abroad.
              <br />
              Data is handled according to security best practices.
            </p>
            <h2 className="font-semibold text-[#757575]">8. Penyimpanan Data dan Keselamatan</h2>
            <p className="text-[#757575]">
              Data boleh disimpan pada pelayan NCSpeech atau penyedia pihak ketiga yang diluluskan, di Malaysia atau di luar negara.
              <br />
              Data dikendalikan mengikut amalan keselamatan standard industri.
            </p>
          </div>

          {/* Section 9 */}
          <div className="space-y-2">
            <h2 className="font-semibold text-[#1A1A1A]">9. No Right of Withdrawal After Payment</h2>
            <p className="text-[#1A1A1A]">
              After the reward is paid, you cannot request deletion of your recordings because they become part of AI training datasets that cannot be individually removed.
            </p>
            <h2 className="font-semibold text-[#757575]">9. Tiada Hak Penarikan Balik Selepas Pembayaran</h2>
            <p className="text-[#757575]">
              Selepas ganjaran dibayar, anda tidak boleh meminta pemadaman rakaman kerana data akan menjadi sebahagian daripada set latihan AI yang tidak boleh dipisahkan.
            </p>
          </div>

          {/* Section 10 */}
          <div className="space-y-2">
            <h2 className="font-semibold text-[#1A1A1A]">10. Contact</h2>
            <p className="text-[#1A1A1A]">Email: director@ncspeech.org</p>
            <h2 className="font-semibold text-[#757575]">10. Hubungi</h2>
            <p className="text-[#757575]">Emel: director@ncspeech.org</p>
          </div>

          {/* Acceptance */}
          <div className="space-y-2 bg-[#FFF9F0] border border-[#FFE5CC] rounded-lg p-4">
            <h2 className="font-semibold text-[#1A1A1A]">Acceptance</h2>
            <p className="text-[#1A1A1A]">
              By selecting "Yes, I agree" in the form, you confirm that you understand and accept all terms, you participate voluntarily, you transfer rights after payment, you meet eligibility requirements and all information you provide is truthful.
            </p>
            <h2 className="font-semibold text-[#757575] mt-3">Pengesahan</h2>
            <p className="text-[#757575]">
              Dengan memilih "Ya, saya bersetuju" dalam borang, anda mengesahkan bahawa anda memahami dan menerima semua terma, anda menyertai secara sukarela, hak rakaman dipindahkan selepas pembayaran, anda memenuhi syarat kelayakan dan semua maklumat yang diberikan adalah benar.
            </p>
          </div>

          {/* Legal Documents */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="text-[14px] text-[#757575] mb-3">
              For more information, please review our legal documents:
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/terms")}
                className="flex-1 h-12 bg-white border-2 border-gray-300 hover:border-[#E63946] hover:text-[#E63946] rounded-lg font-semibold text-[14px] transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => navigate("/privacy")}
                className="flex-1 h-12 bg-white border-2 border-gray-300 hover:border-[#E63946] hover:text-[#E63946] rounded-lg font-semibold text-[14px] transition-colors"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Checkbox */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="consentAgreement"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="mt-1 border-gray-400 data-[state=checked]:bg-[#E63946] data-[state=checked]:border-[#E63946]"
            />
            <label
              htmlFor="consentAgreement"
              className="text-[14px] text-[#1A1A1A] font-semibold leading-relaxed cursor-pointer"
            >
              Yes, I agree to all terms and conditions
              <br />
              <span className="text-[#757575] font-normal">
                Ya, saya bersetuju dengan semua terma dan syarat
              </span>
            </label>
          </div>

          {/* Button */}
          <Button
            onClick={handleAccept}
            disabled={!agreed}
            className="w-full h-14 text-[16px] font-semibold bg-[#E63946] hover:bg-[#D62836] text-white disabled:bg-gray-300 disabled:text-gray-500"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}