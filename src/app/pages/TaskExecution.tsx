import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Mic, Square, Send } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

export function TaskExecution() {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();
  const { tasks, updateTaskStatus, addBalance } = useApp();
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const task = tasks.find((t) => t.id === taskId);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  if (!task) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <p className="text-[#757575]">Task not found</p>
      </div>
    );
  }

  const handleRecord = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setHasRecording(true);
    } else {
      // Start recording
      setIsRecording(true);
      setRecordingTime(0);
      setHasRecording(false);
    }
  };

  const handleSubmit = () => {
    if (!hasRecording) return;

    // Update task status to pending
    updateTaskStatus(task.id, "pending");

    // Show success toast
    toast.success("✅ Recording submitted! Waiting for verification", {
      duration: 3000,
    });

    // Simulate instant verification after 2 seconds
    setTimeout(() => {
      updateTaskStatus(task.id, "completed");
      addBalance(task.reward, `Task completed: ${task.title}`);

      // Show reward modal with confetti
      toast.success(`🎉 +${task.reward} points awarded! Balance updated`, {
        duration: 4000,
        action: {
          label: "Next tasks",
          onClick: () => navigate("/dashboard"),
        },
      });

      // Auto navigate after 4 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 4000);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-10 h-10 flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-[#1A1A1A]" />
        </button>
        <span className="text-[14px] text-[#757575]">
          Reward: +{task.reward} points
        </span>
      </div>

      {/* Script Card */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <p className="text-[14px] text-[#757575] text-center mb-4">
            Read aloud:
          </p>
          <p className="text-[22px] font-medium text-[#1A1A1A] text-center leading-relaxed">
            "{task.script}"
          </p>
        </div>
      </div>

      {/* Recording Controls - Sticky Bottom */}
      <div className="bg-white border-t border-gray-200 px-6 py-6">
        {/* Visualizer */}
        <div className="flex items-center justify-center gap-1 h-16 mb-4">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-[#E63946] rounded-full"
              animate={{
                height: isRecording
                  ? [
                      Math.random() * 40 + 10,
                      Math.random() * 50 + 20,
                      Math.random() * 40 + 10,
                    ]
                  : 10,
              }}
              transition={{
                duration: 0.5,
                repeat: isRecording ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Timer */}
        <div className="text-center mb-6">
          <span className="text-[20px] font-mono text-[#1A1A1A]">
            {formatTime(recordingTime)} / {task.duration.replace("~", "")}
          </span>
        </div>

        {/* Record Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleRecord}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isRecording
                ? "bg-red-500 hover:bg-red-600"
                : "bg-[#1A1A1A] hover:bg-[#2A2A2A]"
            }`}
          >
            {isRecording ? (
              <Square className="w-8 h-8 text-white" fill="white" />
            ) : (
              <Mic className="w-10 h-10 text-white" />
            )}
          </button>
        </div>

        {/* Submit Button */}
        {hasRecording && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={handleSubmit}
              className="w-full h-14 text-[16px] font-semibold bg-[#E63946] hover:bg-[#D62836] text-white flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit for review
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}