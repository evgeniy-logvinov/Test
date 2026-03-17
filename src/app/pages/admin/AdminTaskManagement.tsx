import { useState } from "react";
import { AdminLayout } from "../../layouts/AdminLayout";
import {
  Plus,
  Mic,
  FileText,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Clock,
} from "lucide-react";

interface Task {
  id: string;
  type: "voice" | "transcription";
  content: string;
  points: number;
  status: "active" | "inactive";
  createdAt: string;
  completedCount: number;
}

const mockTasks: Task[] = [
  {
    id: "TMPL-001",
    type: "voice",
    content: "The quick brown fox jumps over the lazy dog",
    points: 5,
    status: "active",
    createdAt: "2026-03-10",
    completedCount: 47,
  },
  {
    id: "TMPL-002",
    type: "voice",
    content: "Please record this sentence clearly and accurately",
    points: 5,
    status: "active",
    createdAt: "2026-03-10",
    completedCount: 39,
  },
  {
    id: "TMPL-003",
    type: "transcription",
    content: "audio-sample-001.mp3",
    points: 8,
    status: "active",
    createdAt: "2026-03-11",
    completedCount: 28,
  },
  {
    id: "TMPL-004",
    type: "voice",
    content: "Hello, my name is John and I am testing the voice recording system",
    points: 5,
    status: "inactive",
    createdAt: "2026-03-09",
    completedCount: 52,
  },
];

export function AdminTaskManagement() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [taskType, setTaskType] = useState<"voice" | "transcription">("voice");
  const [taskContent, setTaskContent] = useState("");
  const [taskPoints, setTaskPoints] = useState("5");

  const handleCreateTask = () => {
    const newTask: Task = {
      id: `TMPL-${String(tasks.length + 1).padStart(3, "0")}`,
      type: taskType,
      content: taskContent,
      points: parseInt(taskPoints),
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
      completedCount: 0,
    };
    setTasks([newTask, ...tasks]);
    setShowCreateModal(false);
    setTaskContent("");
    setTaskPoints("5");
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "active" ? "inactive" : "active",
            }
          : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  return (
    <AdminLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[28px] font-bold text-[#1A1A1A]">
                Task Management
              </h1>
              <p className="text-[14px] text-[#757575] mt-1">
                Create and manage task templates
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 h-[44px] bg-[#E63946] text-white text-[14px] font-semibold rounded-lg hover:bg-[#d4183d] transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Task
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-[#E63946]/10 border-b border-[#E63946]/20 px-8 py-4">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-[12px] text-[#E63946] font-medium">
                TOTAL TASKS
              </p>
              <p className="text-[24px] font-bold text-[#E63946]">
                {tasks.length}
              </p>
            </div>
            <div className="w-px h-12 bg-[#E63946]/20"></div>
            <div>
              <p className="text-[12px] text-[#E63946] font-medium">ACTIVE</p>
              <p className="text-[20px] font-bold text-green-700">
                {tasks.filter((t) => t.status === "active").length}
              </p>
            </div>
            <div>
              <p className="text-[12px] text-[#E63946] font-medium">INACTIVE</p>
              <p className="text-[20px] font-bold text-[#757575]">
                {tasks.filter((t) => t.status === "inactive").length}
              </p>
            </div>
          </div>
        </div>

        {/* Task Table */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-[1200px]">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Task ID
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Completed
                  </th>
                  <th className="px-6 py-4 text-right text-[12px] font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-[13px] font-medium text-gray-900">
                      {task.id}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          task.type === "voice"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {task.type === "voice" ? (
                          <Mic className="w-3.5 h-3.5" />
                        ) : (
                          <FileText className="w-3.5 h-3.5" />
                        )}
                        {task.type === "voice" ? "Voice" : "Transcription"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-gray-700 max-w-md truncate">
                      {task.content}
                    </td>
                    <td className="px-6 py-4 text-[13px] font-semibold text-[#E63946]">
                      {task.points} pts
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          task.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {task.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-gray-600">
                      {task.completedCount} times
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleTaskStatus(task.id)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title={
                            task.status === "active" ? "Deactivate" : "Activate"
                          }
                        >
                          {task.status === "active" ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <h3 className="text-[20px] font-bold text-gray-900 mb-4">
              Create New Task
            </h3>

            {/* Task Type Selection */}
            <div className="mb-4">
              <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                Task Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTaskType("voice")}
                  className={`h-[56px] rounded-lg border-2 transition-all ${
                    taskType === "voice"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Mic
                      className={`w-5 h-5 ${
                        taskType === "voice" ? "text-blue-600" : "text-gray-600"
                      }`}
                    />
                    <span
                      className={`text-[14px] font-semibold ${
                        taskType === "voice" ? "text-blue-900" : "text-gray-700"
                      }`}
                    >
                      Voice Recording
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => setTaskType("transcription")}
                  className={`h-[56px] rounded-lg border-2 transition-all ${
                    taskType === "transcription"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <FileText
                      className={`w-5 h-5 ${
                        taskType === "transcription"
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    />
                    <span
                      className={`text-[14px] font-semibold ${
                        taskType === "transcription"
                          ? "text-green-900"
                          : "text-gray-700"
                      }`}
                    >
                      Transcription
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Content Input */}
            <div className="mb-4">
              <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                {taskType === "voice"
                  ? "Text to Record"
                  : "Audio File Name/URL"}
              </label>
              {taskType === "voice" ? (
                <textarea
                  value={taskContent}
                  onChange={(e) => setTaskContent(e.target.value)}
                  placeholder="Enter the text that users should record..."
                  className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg text-[14px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <input
                  type="text"
                  value={taskContent}
                  onChange={(e) => setTaskContent(e.target.value)}
                  placeholder="audio-sample-001.mp3 or https://..."
                  className="w-full h-[48px] px-4 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>

            {/* Points Input */}
            <div className="mb-6">
              <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                Points Reward
              </label>
              <input
                type="number"
                value={taskPoints}
                onChange={(e) => setTaskPoints(e.target.value)}
                min="1"
                max="100"
                className="w-full h-[48px] px-4 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setTaskContent("");
                  setTaskPoints("5");
                }}
                className="flex-1 h-[48px] border border-gray-300 text-gray-700 text-[14px] font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                disabled={!taskContent.trim()}
                className="flex-1 h-[48px] bg-[#E63946] text-white text-[14px] font-semibold rounded-lg hover:bg-[#d4183d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}