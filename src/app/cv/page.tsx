import type { Metadata } from "next";
import CVContent from "./CVContent";

export const metadata: Metadata = {
  title: "CV — Maciej Tyra",
  description: "Full-stack developer resume. CTO & Co-Founder at Digitay.pl.",
};

export default function CVPage() {
  return <CVContent />;
}
