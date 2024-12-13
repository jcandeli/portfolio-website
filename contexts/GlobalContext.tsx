"use client";

import { Design, Photo, Video } from "@/types";
import { createContext, useContext, useState, ReactNode } from "react";

interface GlobalContextType {
  selectedMedia: Video | Photo | Design | null;
  isDarkMode: boolean;
  setSelectedMedia: (media: Video | Photo | Design | null) => void;
  toggleTheme: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [selectedMedia, setSelectedMedia] = useState<
    Video | Photo | Design | null
  >(null);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
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
