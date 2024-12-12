"use client";

import { Media } from "@/types";
import { createContext, useContext, useState, ReactNode } from "react";

interface GlobalContextType {
  selectedMedia: Media | null;
  isDarkMode: boolean;
  setSelectedMedia: (media: Media | null) => void;
  toggleTheme: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
  };

  return (
    <GlobalContext.Provider
      value={{
        selectedMedia,
        isDarkMode,
        setSelectedMedia,
        toggleTheme,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
}
