import React, { createContext, useContext, useState } from "react";

export type Kid = {
  id: string;
  name: string;
  avatar: string;
  pin: string;
};

export type Chore = {
  id: string;
  name: string;
  reward: number;
  assignedTo: string[];
  completed?: boolean;
};

export type Completion = {
  id: string;
  choreId: string;
  choreName: string;
  childName: string;
  reward: number;
  status: "pending" | "approved" | "rejected";
};

type AppContextType = {
  familyName: string;
  setFamilyName: (name: string) => void;

  kids: Kid[];
  addKid: (kid: Kid) => void;

  chores: Chore[];
  addChore: (chore: Chore) => void;

  completions: Completion[];
  submitCompletion: (completion: Completion) => void;
  approveCompletion: (id: string) => void;
  rejectCompletion: (id: string) => void;

  walletBalance: number;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [familyName, setFamilyName] = useState<string>("");
  const [kids, setKids] = useState<Kid[]>([]);
  const [chores, setChores] = useState<Chore[]>([]);
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [walletBalance, setWalletBalance] = useState<number>(0);

  const addKid = (kid: Kid): void => {
    setKids((current) => [...current, kid]);
  };

  const addChore = (chore: Chore): void => {
    setChores((current) => [...current, chore]);
  };

  const submitCompletion = (completion: Completion): void => {
    setCompletions((current) => [...current, completion]);
  };

const approveCompletion = (id: string): void => {
  const completion = completions.find((item) => item.id === id);

  if (!completion || completion.status !== "pending") {
    return;
  }

  setCompletions((current) =>
    current.map((item) =>
      item.id === id ? { ...item, status: "approved" } : item
    )
  );

  setChores((current) =>
    current.map((chore) =>
      chore.id === completion.choreId
        ? { ...chore, completed: true }
        : chore
    )
  );

  setWalletBalance((current) => current + completion.reward);
};

  const rejectCompletion = (id: string): void => {
    setCompletions((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: "rejected" } : item
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        familyName,
        setFamilyName,
        kids,
        addKid,
        chores,
        addChore,
        completions,
        submitCompletion,
        approveCompletion,
        rejectCompletion,
        walletBalance,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
}