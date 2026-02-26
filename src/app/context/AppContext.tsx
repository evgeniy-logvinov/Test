import { createContext, useContext, useState, ReactNode } from "react";

export interface UserProfile {
  gender: string;
  ageGroup: string;
  firstLanguage: string;
  homeState: string;
  ethnicity: string;
  occupation: string;
  recordingDevice: string;
  agreedToDataProcessing: boolean;
}

export interface User {
  email: string;
  name?: string;
}

export interface Task {
  id: string;
  title: string;
  duration: string;
  reward: number;
  script: string;
  status: "available" | "pending" | "completed";
}

export interface BalanceTransaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: Date;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (profile: UserProfile) => void;
  balance: number;
  addBalance: (amount: number, description: string) => void;
  deductBalance: (amount: number, description: string) => void;
  transactions: BalanceTransaction[];
  tasks: Task[];
  updateTaskStatus: (taskId: string, status: Task["status"]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Read a short dialogue",
    duration: "~30 sec",
    reward: 15,
    script: "Navigate to the nearest coffee shop",
    status: "available",
  },
  {
    id: "2",
    title: "Record navigation command",
    duration: "~20 sec",
    reward: 10,
    script: "Play music from my playlist",
    status: "available",
  },
  {
    id: "3",
    title: "Read phrase for AI training",
    duration: "~25 sec",
    reward: 12,
    script: "Find the nearest gas station on the route",
    status: "available",
  },
  {
    id: "4",
    title: "Record short command",
    duration: "~15 sec",
    reward: 8,
    script: "Call mom via speakerphone",
    status: "available",
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<BalanceTransaction[]>([]);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addBalance = (amount: number, description: string) => {
    setBalance((prev) => prev + amount);
    setTransactions((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "credit",
        amount,
        description,
        date: new Date(),
      },
    ]);
  };

  const deductBalance = (amount: number, description: string) => {
    setBalance((prev) => prev - amount);
    setTransactions((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "debit",
        amount,
        description,
        date: new Date(),
      },
    ]);
  };

  const updateTaskStatus = (taskId: string, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        profile,
        setProfile,
        updateProfile: setProfile,
        balance,
        addBalance,
        deductBalance,
        transactions,
        tasks,
        updateTaskStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}