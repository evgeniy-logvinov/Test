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
  points: number;
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
  script?: string;
  type: "recording" | "transcription";
  status: "available" | "pending" | "completed" | "redo";
  audioUrl?: string;
  metadata?: {
    speaker_cross?: string;
    language?: string;
    accent?: string;
    [key: string]: string | undefined;
  };
  transcription?: string;
  rejectionReason?: string;
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
  updateTaskTranscription: (taskId: string, transcription: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
AppContext.displayName = 'AppContext';

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Read a short dialogue",
    duration: "~30 sec",
    reward: 15,
    script: "Navigate to the nearest coffee shop",
    type: "recording",
    status: "redo",
    rejectionReason: "Background noise detected. Please record in a quieter environment.",
  },
  {
    id: "2",
    title: "Record navigation command",
    duration: "~20 sec",
    reward: 10,
    script: "Play music from my playlist",
    type: "recording",
    status: "available",
  },
  {
    id: "3",
    title: "Transcribe conversation audio",
    duration: "~45 sec",
    reward: 20,
    type: "transcription",
    status: "redo",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    metadata: {
      speaker_cross: "Yes",
      language: "English",
      accent: "Malaysian",
    },
    rejectionReason: "Transcription is incomplete. Several words at the end were missing.",
  },
  {
    id: "4",
    title: "Read phrase for AI training",
    duration: "~25 sec",
    reward: 12,
    script: "Find the nearest gas station on the route",
    type: "recording",
    status: "pending",
  },
  {
    id: "5",
    title: "Transcribe interview segment",
    duration: "~60 sec",
    reward: 25,
    type: "transcription",
    status: "pending",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    metadata: {
      speaker_cross: "No",
      language: "English",
      accent: "American",
    },
  },
  {
    id: "6",
    title: "Record short command",
    duration: "~15 sec",
    reward: 8,
    script: "Call mom via speakerphone",
    type: "recording",
    status: "completed",
  },
  {
    id: "7",
    title: "Record weather inquiry",
    duration: "~20 sec",
    reward: 10,
    script: "What's the weather forecast for tomorrow",
    type: "recording",
    status: "available",
  },
  {
    id: "8",
    title: "Transcribe meeting notes",
    duration: "~50 sec",
    reward: 22,
    type: "transcription",
    status: "available",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    metadata: {
      speaker_cross: "Yes",
      language: "English",
      accent: "British",
    },
  },
  {
    id: "9",
    title: "Read product description",
    duration: "~35 sec",
    reward: 14,
    script: "This smart speaker features voice control and premium sound quality",
    type: "recording",
    status: "available",
  },
  {
    id: "10",
    title: "Record traffic update",
    duration: "~25 sec",
    reward: 12,
    script: "Show me alternative routes to avoid traffic",
    type: "recording",
    status: "available",
  },
  {
    id: "11",
    title: "Transcribe podcast segment",
    duration: "~55 sec",
    reward: 24,
    type: "transcription",
    status: "available",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    metadata: {
      speaker_cross: "No",
      language: "English",
      accent: "Australian",
    },
  },
  {
    id: "12",
    title: "Record alarm command",
    duration: "~18 sec",
    reward: 9,
    script: "Set an alarm for 7 AM tomorrow",
    type: "recording",
    status: "available",
  },
  {
    id: "13",
    title: "Read news headline",
    duration: "~22 sec",
    reward: 11,
    script: "Breaking news: Technology advances in renewable energy",
    type: "recording",
    status: "available",
  },
  {
    id: "14",
    title: "Transcribe customer feedback",
    duration: "~40 sec",
    reward: 18,
    type: "transcription",
    status: "available",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    metadata: {
      speaker_cross: "Yes",
      language: "English",
      accent: "Malaysian",
    },
  },
  {
    id: "15",
    title: "Record reminder message",
    duration: "~20 sec",
    reward: 10,
    script: "Remind me to pick up groceries at 5 PM",
    type: "recording",
    status: "available",
  },
  {
    id: "16",
    title: "Read recipe instructions",
    duration: "~30 sec",
    reward: 15,
    script: "Mix the ingredients thoroughly and bake at 180 degrees",
    type: "recording",
    status: "available",
  },
  {
    id: "17",
    title: "Transcribe interview questions",
    duration: "~48 sec",
    reward: 21,
    type: "transcription",
    status: "available",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    metadata: {
      speaker_cross: "No",
      language: "English",
      accent: "American",
    },
  },
  {
    id: "18",
    title: "Record calendar event",
    duration: "~24 sec",
    reward: 11,
    script: "Schedule a meeting for next Monday at 2 PM",
    type: "recording",
    status: "available",
  },
  {
    id: "19",
    title: "Read safety instructions",
    duration: "~32 sec",
    reward: 16,
    script: "Always wear your seatbelt and follow traffic regulations",
    type: "recording",
    status: "available",
  },
  {
    id: "20",
    title: "Transcribe voice message",
    duration: "~38 sec",
    reward: 17,
    type: "transcription",
    status: "available",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    metadata: {
      speaker_cross: "Yes",
      language: "English",
      accent: "British",
    },
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<BalanceTransaction[]>([]);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Derive balance from profile.points
  const balance = profile?.points || 0;

  const addBalance = (amount: number, description: string) => {
    setProfile((prev) =>
      prev ? { ...prev, points: (prev.points || 0) + amount } : null
    );
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
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            points: Math.max(0, (prev.points || 0) - amount),
          }
        : null
    );
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

  const updateTaskTranscription = (taskId: string, transcription: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, transcription } : task
      )
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
        updateTaskTranscription,
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