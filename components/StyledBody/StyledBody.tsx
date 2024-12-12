"use client";
import styled from "@emotion/styled";
import { Roboto } from "next/font/google";
import { useGlobal } from "@/contexts/GlobalContext";

const roboto = Roboto({
  weight: ["400"],
  subsets: ["latin"],
  display: "block",
  preload: true,
});

interface BodyProps {
  isDarkMode: boolean;
}

const Body = styled.body<BodyProps>`
  --primary: ${({ isDarkMode }) => (isDarkMode ? "#121212" : "#e1e1e1")};
  --secondary: ${({ isDarkMode }) => (isDarkMode ? "#f1f1f1" : "#121212")};
  color: var(--primary);
  background-color: var(--secondary);
`;

export function StyledBody({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useGlobal();

  return (
    <Body isDarkMode={isDarkMode} className={roboto.className}>
      {children}
    </Body>
  );
}
