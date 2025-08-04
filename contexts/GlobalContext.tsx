"use client";

import { Design, Photo, Video, Media } from "@/types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface GlobalContextType {
  selectedMedia: Video | Photo | Design | null;
  isDarkMode: boolean;
  currentMediaList: Media[];
  setSelectedMedia: (media: Video | Photo | Design | null) => void;
  setCurrentMediaList: (media: Media[]) => void;
  navigateToNext: () => void;
  navigateToPrevious: () => void;
  toggleTheme: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [selectedMedia, setSelectedMedia] = useState<
    Video | Photo | Design | null
  >(null);
  const [currentMediaList, setCurrentMediaList] = useState<Media[]>([]);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false; // Default to light mode on server
  });

  const navigateToNext = () => {
    if (!selectedMedia || currentMediaList.length === 0) return;

    // Filter out music items since they don't use modals
    const modalMediaList = currentMediaList.filter(
      (media) => media.type !== "music"
    );

    const currentIndex = modalMediaList.findIndex(
      (media) => media.id === selectedMedia.id
    );

    if (currentIndex !== -1 && currentIndex < modalMediaList.length - 1) {
      setSelectedMedia(
        modalMediaList[currentIndex + 1] as Video | Photo | Design
      );
    }
  };

  const navigateToPrevious = () => {
    if (!selectedMedia || currentMediaList.length === 0) return;

    // Filter out music items since they don't use modals
    const modalMediaList = currentMediaList.filter(
      (media) => media.type !== "music"
    );

    const currentIndex = modalMediaList.findIndex(
      (media) => media.id === selectedMedia.id
    );

    if (currentIndex > 0) {
      setSelectedMedia(
        modalMediaList[currentIndex - 1] as Video | Photo | Design
      );
    }
  };

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <GlobalContext.Provider
      value={{
        selectedMedia,
        isDarkMode,
        currentMediaList,
        setSelectedMedia,
        setCurrentMediaList,
        navigateToNext,
        navigateToPrevious,
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
