import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "block",
  variable: "--font-bebas-neue",
  preload: true,
});

const getHeadingStyle = (level: number) => {
  const baseStyle = {
    position: "relative" as const,
    lineHeight: "0.85",
    textWrap: "pretty",
  };

  if (level === 1) {
    return {
      ...baseStyle,
      fontSize: "min(24.5vw, 348px)",
      letterSpacing: "max(-1vw, -0.5rem)",
    } as const;
  } else if (level === 2) {
    return {
      ...baseStyle,
      fontSize: "clamp(2.5rem, 5.25vw, 4.6rem)",
      lineHeight: "1.2",
      marginTop: "-1rem",
      marginBottom: "1rem",
    } as const;
  } else if (level === 3) {
    return {
      ...baseStyle,
      fontSize: "4rem",
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
