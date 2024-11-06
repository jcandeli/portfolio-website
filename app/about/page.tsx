import { Metadata } from "next";
import { AboutPage } from "./AboutPage";

export const metadata: Metadata = {
  title: "About | JP Candelier",
  description:
    "Senior Front End Developer with over 20 years of experience in creating accessible web applications",
};

export default function Page() {
  return <AboutPage />;
}
