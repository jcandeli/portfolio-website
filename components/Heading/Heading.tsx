import { Bebas_Neue } from "next/font/google";
import localFont from "next/font/local";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "block",
  variable: "--font-bebas-neue",
  preload: true,
});

const sageregular = localFont({
  src: "../../public/fonts/sunflora-webfont.woff2",
  weight: "400",
  display: "block",
  variable: "--font-sageregular",
  preload: true,
});

const getHeadingStyle = (level: number) => {
  const baseStyle = {
    position: "relative" as const,
    lineHeight: "1.1",
    textWrap: "pretty",
  };

  if (level === 1) {
    return {
      ...baseStyle,
      fontSize: "min(12.5vw, 195px)",
      textTransform: "uppercase",
    } as const;
  } else if (level === 2) {
    return {
      ...baseStyle,
      fontSize: "clamp(2rem, 4vw, 3.5rem)",
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

  const fontClass = level === 1 ? sageregular.className : bebasNeue.className;

  return (
    <HeadingTag
      className={`${fontClass} ${className}`.trim()}
      style={headingStyle}
    >
      {children}
    </HeadingTag>
  );
}
