"use client";

import { useGlobal } from "@/contexts/GlobalContext";
import { Roboto } from "next/font/google";
import { useEffect } from "react";

const roboto = Roboto({
  weight: ["400"],
  subsets: ["latin"],
  display: "block",
  preload: true,
});

export function BodyStyles({ children }: { children: React.ReactNode }) {
  const {
    /* your global state variables */
  } = useGlobal();

  useEffect(
    () => {
      // Here you can update CSS variables based on your global state
      document.body.style.setProperty("--some-variable", "some-value");
      // Add more style updates as needed
    },
    [
      /* dependencies from global context */
    ]
  );

  return <body className={roboto.className}>{children}</body>;
}
