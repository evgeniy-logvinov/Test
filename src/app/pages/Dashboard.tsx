import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { User, Coins, Mic, LogOut, FileText, AlertCircle, ArrowUpCircle, ArrowDownCircle, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

export function Dashboard() {
  const navigate = useNavigate();
  const { profile, tasks, setProfile, setUser, transactions } = useApp();
  const [activeTab, setActiveTab] = useState<string>("available");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  // Pagination state for each tab
  const [visibleAvailable, setVisibleAvailable] = useState(5);
  const [visiblePending, setVisiblePending] = useState(5);
  const [visibleCompleted, setVisibleCompleted] = useState(5);

  const availableTasks = tasks.filter((task) => task.status === "available");
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const completedTasks = tasks.filter((task) => task.status === "completed");
  const redoTasks = tasks.filter((task) => task.status === "redo");

  // Combine available and redo tasks for the Available tab
  const allAvailableTasks = [...redoTasks, ...availableTasks];

  // Auto-adjust visible count to always show 5 tasks when task status changes
  useEffect(() => {
    if (allAvailableTasks.length < visibleAvailable && allAvailableTasks.length >= 5) {
      setVisibleAvailable(5);
    } else if (allAvailableTasks.length < 5 && visibleAvailable > allAvailableTasks.length) {
      setVisibleAvailable(allAvailableTasks.length);
    }
  }, [allAvailableTasks.length]);

  useEffect(() => {
    if (pendingTasks.length < visiblePending && pendingTasks.length >= 5) {
      setVisiblePending(5);
    } else if (pendingTasks.length < 5 && visiblePending > pendingTasks.length) {
      setVisiblePending(pendingTasks.length);
    }
  }, [pendingTasks.length]);

  useEffect(() => {
    if (completedTasks.length < visibleCompleted && completedTasks.length >= 5) {
      setVisibleCompleted(5);
    } else if (completedTasks.length < 5 && visibleCompleted > completedTasks.length) {
      setVisibleCompleted(completedTasks.length);
    }
  }, [completedTasks.length]);

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
      type: "recording" | "transcription";
      rejectionReason?: string;
    };
  }) => {
    const handleTaskClick = () => {
      if (task.status === "available" || task.status === "redo") {
        if (task.type === "transcription") {
          navigate(`/transcription/${task.id}`);
        } else {
          navigate(`/task/${task.id}`);
        }
      }
    };

    return (
      <div className="space-y-2">
        <div
          onClick={handleTaskClick}
          className={`bg-white rounded-xl p-4 shadow-sm border ${
            task.status === "redo" ? "border-red-200 bg-red-50" : "border-gray-100"
          } flex items-center gap-4 min-h-[72px] ${
            task.status === "available" || task.status === "redo"
              ? "cursor-pointer active:scale-[0.98]"
              : ""
          } transition-transform relative`}
        >
          {/* Redo Badge */}
          {task.status === "redo" && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded-full">
              <AlertCircle className="w-3 h-3" />
              <span className="text-[10px] font-semibold uppercase">Redo</span>
            </div>
          )}

          {/* Icon */}
          <div
            className={`w-12 h-12 ${
              task.status === "redo" ? "bg-red-100" : "bg-gray-100"
            } rounded-full flex items-center justify-center flex-shrink-0`}
          >
            {task.type === "transcription" ? (
              <FileText
                className={`w-6 h-6 ${
                  task.status === "redo" ? "text-red-600" : "text-[#757575]"
                }`}
              />
            ) : (
              <Mic
                className={`w-6 h-6 ${
                  task.status === "redo" ? "text-red-600" : "text-[#757575]"
                }`}
              />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pr-20">
            <h3
              className={`text-[16px] font-semibold ${
                task.status === "redo" ? "text-red-900" : "text-[#1A1A1A]"
              } mb-1`}
            >
              {task.title}
            </h3>
            <p
              className={`text-[14px] ${
                task.status === "redo" ? "text-red-700" : "text-[#757575]"
              }`}
            >
              {task.duration}
            </p>
          </div>

          {/* Reward Badge */}
          <div
            className={`${
              task.status === "redo" ? "bg-red-600" : "bg-[#E63946]"
            } px-4 py-2 rounded-full flex-shrink-0`}
          >
            <span className="text-[14px] font-bold text-white">
              +{task.reward}
            </span>
          </div>
        </div>

        {/* Rejection Reason - shown below the card for redo tasks */}
        {task.status === "redo" && task.rejectionReason && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 ml-1 mr-1">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[12px] font-semibold text-orange-900 mb-0.5">
                  Reason for rejection:
                </p>
                <p className="text-[13px] text-orange-800">
                  {task.rejectionReason}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

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
            <span className="text-[16px] font-semibold text-[#1A1A1A]">User            </span>
          </button>

          {/* Balance and Reset */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center gap-2 bg-[#F5F5F5] px-4 py-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer active:scale-95"
            >
              <Coins className="w-5 h-5 text-[#E63946]" />
              <span className="text-[18px] font-bold text-[#1A1A1A]">
                {profile?.points || 0}
              </span>
              <span className="text-[14px] text-[#757575]">points</span>
            </button>
            
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
              {/* Redo Tasks Info Banner */}
              {redoTasks.length > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-[14px] font-semibold text-orange-900 mb-1">
                      {redoTasks.length} {redoTasks.length === 1 ? "task" : "tasks"} need{redoTasks.length === 1 ? "s" : ""} revision
                    </h3>
                    <p className="text-[12px] text-orange-700">
                      These tasks were not approved. Please review and resubmit them.
                    </p>
                  </div>
                </div>
              )}

              {allAvailableTasks.length > 0 ? (
                <>
                  {/* Display visible tasks */}
                  {allAvailableTasks.slice(0, visibleAvailable).map((task, index) => {
                    const isRedoTask = task.status === "redo";
                    const showDivider = 
                      index === redoTasks.length && 
                      redoTasks.length > 0 && 
                      availableTasks.length > 0 &&
                      index < visibleAvailable;

                    return (
                      <div key={task.id}>
                        <TaskCard task={task} />
                        {showDivider && (
                          <div className="flex items-center gap-4 py-4">
                            <div className="flex-1 h-px bg-gray-300" />
                            <span className="text-[12px] font-semibold text-[#757575] uppercase">
                              New Tasks
                            </span>
                            <div className="flex-1 h-px bg-gray-300" />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Load More Button */}
                  {visibleAvailable < allAvailableTasks.length && (
                    <div className="pt-4">
                      <Button
                        onClick={() => setVisibleAvailable(prev => Math.min(prev + 5, allAvailableTasks.length))}
                        variant="outline"
                        className="w-full h-12 text-[14px] font-semibold border-2 border-gray-300 hover:border-[#E63946] hover:text-[#E63946] transition-colors"
                      >
                        Load more ({allAvailableTasks.length - visibleAvailable} remaining)
                      </Button>
                    </div>
                  )}
                </>
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
                <>
                  {pendingTasks.slice(0, visiblePending).map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}

                  {/* Load More Button */}
                  {visiblePending < pendingTasks.length && (
                    <div className="pt-4">
                      <Button
                        onClick={() => setVisiblePending(prev => Math.min(prev + 5, pendingTasks.length))}
                        variant="outline"
                        className="w-full h-12 text-[14px] font-semibold border-2 border-gray-300 hover:border-[#E63946] hover:text-[#E63946] transition-colors"
                      >
                        Load more ({pendingTasks.length - visiblePending} remaining)
                      </Button>
                    </div>
                  )}
                </>
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
                <>
                  {completedTasks.slice(0, visibleCompleted).map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}

                  {/* Load More Button */}
                  {visibleCompleted < completedTasks.length && (
                    <div className="pt-4">
                      <Button
                        onClick={() => setVisibleCompleted(prev => Math.min(prev + 5, completedTasks.length))}
                        variant="outline"
                        className="w-full h-12 text-[14px] font-semibold border-2 border-gray-300 hover:border-[#E63946] hover:text-[#E63946] transition-colors"
                      >
                        Load more ({completedTasks.length - visibleCompleted} remaining)
                      </Button>
                    </div>
                  )}
                </>
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

      {/* Points History Modal */}
      <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[18px] font-bold text-[#1A1A1A] flex items-center gap-2">
              <Coins className="w-5 h-5 text-[#E63946]" />
              Points History
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            {/* Current Balance */}
            <div className="bg-gradient-to-br from-[#E63946] to-[#D62836] rounded-xl p-5 mb-6">
              <p className="text-white/80 text-[12px] font-medium mb-1">
                Current Balance
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-white text-[32px] font-bold">
                  {profile?.points || 0}
                </h2>
                <span className="text-white/90 text-[14px] font-semibold">
                  points
                </span>
              </div>
            </div>

            {/* Transaction History */}
            {transactions.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-[14px] font-semibold text-[#757575] uppercase mb-3">
                  Recent Activity
                </h3>
                {[...transactions]
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            transaction.type === "credit"
                              ? "bg-green-100"
                              : "bg-red-100"
                          }`}
                        >
                          {transaction.type === "credit" ? (
                            <ArrowUpCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <ArrowDownCircle className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium text-[#1A1A1A]">
                            {transaction.description}
                          </p>
                          <p className="text-[12px] text-[#757575] mt-0.5">
                            {new Date(transaction.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`text-[16px] font-bold flex-shrink-0 ml-3 ${
                          transaction.type === "credit"
                            ? "text-green-600"
                            : "text-red-600"
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
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Coins className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-[14px] text-[#757575]">No transactions yet</p>
                <p className="text-[12px] text-[#757575] mt-1">
                  Complete tasks to earn points
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}