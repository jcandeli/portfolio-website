"use client";

import { Roboto, Bebas_Neue } from "next/font/google";

const roboto = Roboto({
  weight: ["400"],
  subsets: ["latin"],
  display: "block",
  variable: "--font-roboto",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "block",
  variable: "--font-bebas-neue",
});

export default function FontLoader() {
  return (
    <style jsx global>{`
      :root {
        --font-roboto: ${roboto.style.fontFamily};
        --font-bebas-neue: ${bebasNeue.style.fontFamily};
      }
    `}</style>
  );
}
