import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "block",
  variable: "--font-bebas-neue",
  preload: true,
});

const getHeadingStyle = (level: number) => {
  if (level === 1) {
    return {
      fontSize: "min(25vw, 348px)",
      lineHeight: "0.85",
      letterSpacing: "max(-1vw, -0.5rem)",
      position: "relative",
      zIndex: 1,
    } as const;
  } else if (level === 2) {
    return {
      fontSize: "min(8vw, 4rem)",
      lineHeight: "1.2",
      position: "relative",
      zIndex: 1,
      marginTop: "-1rem",
      marginBottom: "1rem",
    } as const;
  } else if (level === 3) {
    return {
      fontSize: "4rem",
      lineHeight: "1.2",
      position: "relative",
      zIndex: 1,
    } as const;
  }
  return {};
};

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export default function Heading({
  level = 1,
  children,
  className = "",
}: HeadingProps) {
  const HeadingTag = `h${level}` as const;
  const headingStyle = getHeadingStyle(level);

  return (
    <HeadingTag
      className={`${bebasNeue.className} ${className}`.trim()}
      style={headingStyle}
    >
      {children}
    </HeadingTag>
  );
}
