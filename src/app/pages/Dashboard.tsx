import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Coins, Mic, LogOut } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

export function Dashboard() {
  const navigate = useNavigate();
  const { balance, tasks, setProfile, setUser } = useApp();
  const [activeTab, setActiveTab] = useState<string>("available");

  const availableTasks = tasks.filter((task) => task.status === "available");
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  const handleReset = () => {
    setProfile(null);
    setUser(null);
    navigate("/");
  };

  const TaskCard = ({
    task,
  }: {
    task: {
      id: string;
      title: string;
      duration: string;
      reward: number;
      status: string;
    };
  }) => (
    <div
      onClick={() =>
        task.status === "available" && navigate(`/task/${task.id}`)
      }
      className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 min-h-[72px] ${
        task.status === "available" ? "cursor-pointer active:scale-[0.98]" : ""
      } transition-transform`}
    >
      {/* Icon */}
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
        <Mic className="w-6 h-6 text-[#757575]" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-1">
          {task.title}
        </h3>
        <p className="text-[14px] text-[#757575]">{task.duration}</p>
      </div>

      {/* Reward Badge */}
      <div className="bg-[#E63946] px-4 py-2 rounded-full flex-shrink-0">
        <span className="text-[14px] font-bold text-white">
          +{task.reward}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Profile */}
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-2 py-1 -ml-2 transition-colors"
          >
            <div className="w-10 h-10 bg-[#E63946] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-[16px] font-semibold text-[#1A1A1A]">
              Passenger
            </span>
          </button>

          {/* Balance and Reset */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#F5F5F5] px-4 py-2 rounded-full">
              <Coins className="w-5 h-5 text-[#E63946]" />
              <span className="text-[18px] font-bold text-[#1A1A1A]">
                {balance}
              </span>
              <span className="text-[14px] text-[#757575]">points</span>
            </div>
            
            <button
              onClick={handleReset}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-[#757575]" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full h-auto bg-transparent p-0 grid grid-cols-3">
            <TabsTrigger
              value="available"
              className="h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E63946] data-[state=active]:bg-transparent data-[state=active]:text-[#1A1A1A] text-[#757575] font-semibold"
            >
              Available
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E63946] data-[state=active]:bg-transparent data-[state=active]:text-[#1A1A1A] text-[#757575] font-semibold"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E63946] data-[state=active]:bg-transparent data-[state=active]:text-[#1A1A1A] text-[#757575] font-semibold"
            >
              Completed
            </TabsTrigger>
          </TabsList>

          {/* Available Tasks */}
          <TabsContent value="available" className="mt-0">
            <div className="px-6 pt-6 space-y-3">
              {availableTasks.length > 0 ? (
                availableTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-[#757575]">No available tasks</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Pending Tasks */}
          <TabsContent value="pending" className="mt-0">
            <div className="px-6 pt-6 space-y-3">
              {pendingTasks.length > 0 ? (
                pendingTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-[#757575]">No pending tasks</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Completed Tasks */}
          <TabsContent value="completed" className="mt-0">
            <div className="px-6 pt-6 space-y-3">
              {completedTasks.length > 0 ? (
                completedTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-[#757575]">
                    You haven't completed any tasks yet
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}