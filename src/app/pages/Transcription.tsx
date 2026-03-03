import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Edit2,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

export function Transcription() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { tasks, updateTaskStatus, addBalance, updateTaskTranscription } =
    useApp();

  const task = tasks.find((t) => t.id === taskId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [transcription, setTranscription] = useState(task?.transcription || "");
  const [isEditing, setIsEditing] = useState(!task?.transcription);
  const [metadata, setMetadata] = useState(task?.metadata || {});

  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const playPromiseRef = useRef<Promise<void> | null>(null);

  // Keep track of the last saved transcription
  const savedTranscription = task?.transcription || "";

  useEffect(() => {
    if (!task) {
      navigate("/dashboard");
      return;
    }

    // Initialize audio
    if (audioRef.current && task.audioUrl) {
      audioRef.current.src = task.audioUrl;
      audioRef.current.load();
    }
  }, [task, navigate]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      drawWaveform();
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      drawWaveform();
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const barWidth = 3;
    const barGap = 2;
    const barCount = Math.floor(width / (barWidth + barGap));

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw waveform bars (simulated)
    for (let i = 0; i < barCount; i++) {
      const x = i * (barWidth + barGap);
      const progress = i / barCount;
      const barHeight = Math.sin(i * 0.5) * 20 + 30 + Math.random() * 10;

      // Determine color based on playback progress
      const playProgress = currentTime / duration;
      const color = progress < playProgress ? "#E63946" : "#D1D5DB";

      ctx.fillStyle = color;
      ctx.fillRect(x, (height - barHeight) / 2, barWidth, barHeight);
    }
  };

  useEffect(() => {
    drawWaveform();
  }, [currentTime, duration]);

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      // Wait for any pending play promise before pausing
      if (playPromiseRef.current) {
        try {
          await playPromiseRef.current;
        } catch (error) {
          // Ignore errors from previous play attempts
        }
      }
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        playPromiseRef.current = audioRef.current.play();
        await playPromiseRef.current;
        setIsPlaying(true);
      } catch (error) {
        console.error("Playback failed:", error);
        setIsPlaying(false);
      }
    }
  };

  const skipTime = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      0,
      Math.min(duration, audioRef.current.currentTime + seconds)
    );
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!audioRef.current || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progress = x / rect.width;
    audioRef.current.currentTime = progress * duration;
  };

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return "00:00:00.00";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    if (!transcription.trim()) {
      toast.error("Please enter a transcription before submitting");
      return;
    }

    // Update task status to pending first
    updateTaskStatus(taskId!, "pending");
    updateTaskTranscription(taskId!, transcription);

    // Show submission toast
    toast.success("✅ Transcription submitted! Waiting for verification", {
      duration: 3000,
    });

    // 50% chance of instant verification, 50% stays in pending for manual review
    const needsManualReview = Math.random() < 0.5;

    if (needsManualReview) {
      // Task stays in pending - manual review required
      toast.info("📋 Your task is under review. Check back later for results.", {
        duration: 4000,
      });

      // Navigate back after 3 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } else {
      // Simulate instant verification after 2 seconds with 70% approval rate
      setTimeout(() => {
        const isApproved = Math.random() < 0.7;

        if (isApproved) {
          updateTaskStatus(taskId!, "completed");
          addBalance(task!.reward, `Completed: ${task!.title}`);
          toast.success(`🎉 +${task!.reward} points awarded! Balance updated`, {
            duration: 4000,
          });

          // Auto navigate after 4 seconds
          setTimeout(() => {
            navigate("/dashboard");
          }, 4000);
        } else {
          updateTaskStatus(taskId!, "redo");
          toast.error(
            "❌ Transcription rejected. Please review and resubmit.",
            {
              duration: 4000,
            }
          );

          // Auto navigate after 4 seconds
          setTimeout(() => {
            navigate("/dashboard");
          }, 4000);
        }
      }, 2000);
    }
  };

  const handleDelete = () => {
    setTranscription("");
    setIsEditing(true);
    toast.success("Transcription deleted");
  };

  if (!task) return null;

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
          </button>
          <div className="flex-1">
            <h1 className="text-[20px] font-semibold text-[#1A1A1A]">
              {task.title}
            </h1>
            <p className="text-[14px] text-[#757575]">
              Reward: +{task.reward} points
            </p>
          </div>
        </div>
      </div>

      {/* Redo Warning */}
      {task.status === "redo" && (
        <div className="mx-6 mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-[16px] font-semibold text-red-800 mb-1">
              Revision Required
            </h3>
            <p className="text-[14px] text-red-700 mb-2">
              Your previous transcription was not approved. Please review the feedback and update your transcription.
            </p>
            {task.rejectionReason && (
              <div className="bg-white rounded-lg p-3 mt-2">
                <p className="text-[12px] font-semibold text-red-900 mb-1">
                  Feedback from reviewer:
                </p>
                <p className="text-[13px] text-red-800">
                  {task.rejectionReason}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-6 pt-6 space-y-6">
        {/* Metadata Block */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-4">
            Task Metadata
          </h2>
          <div className="space-y-3">
            {Object.entries(metadata).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <span className="text-[14px] font-medium text-[#757575] capitalize">
                  {key.replace(/_/g, " ")}
                </span>
                <span className="text-[14px] font-semibold text-[#1A1A1A]">
                  {value}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2">
              <span className="text-[14px] font-medium text-[#757575]">
                Duration
              </span>
              <span className="text-[14px] font-semibold text-[#1A1A1A]">
                {task.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Waveform Player */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-4">
            Audio Playback
          </h2>

          {/* Waveform Canvas */}
          <canvas
            ref={canvasRef}
            width={800}
            height={80}
            onClick={handleCanvasClick}
            className="w-full h-20 mb-4 cursor-pointer rounded-lg bg-gray-50"
          />

          {/* Timeline */}
          <div className="flex items-center justify-between mb-4 text-[12px] text-[#757575] font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => skipTime(-5)}
              className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <SkipBack className="w-5 h-5 text-[#1A1A1A]" />
            </button>

            <button
              onClick={togglePlayPause}
              className="w-14 h-14 flex items-center justify-center bg-[#E63946] hover:bg-[#D62836] rounded-full transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </button>

            <button
              onClick={() => skipTime(5)}
              className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <SkipForward className="w-5 h-5 text-[#1A1A1A]" />
            </button>
          </div>

          {/* Hidden Audio Element */}
          <audio ref={audioRef} />
        </div>

        {/* Transcription Block */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-semibold text-[#1A1A1A]">
              Transcription
            </h2>
            {!isEditing && transcription && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-[#757575]" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                placeholder="Type the transcription here..."
                className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent resize-none text-[14px] text-[#1A1A1A]"
              />
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    if (transcription.trim()) {
                      updateTaskTranscription(taskId!, transcription);
                      setIsEditing(false);
                      toast.success("Transcription saved");
                    }
                  }}
                  className="flex-1 h-12 bg-[#E63946] hover:bg-[#D62836] text-white"
                >
                  Save
                </Button>
                {transcription && (
                  <Button
                    onClick={() => {
                      setTranscription(savedTranscription);
                      setIsEditing(false);
                    }}
                    variant="outline"
                    className="h-12 px-6"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg min-h-[200px]">
              <p className="text-[14px] text-[#1A1A1A] whitespace-pre-wrap">
                {transcription}
              </p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!transcription.trim() || isEditing}
          className="w-full h-14 text-[16px] font-semibold bg-[#E63946] hover:bg-[#D62836] text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Submit for Review
        </Button>
      </div>
    </div>
  );
}