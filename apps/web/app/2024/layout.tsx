import type { Metadata } from "next";
import "./theme-2024.css";

export const metadata: Metadata = {
  title: "Dale Chang | Product-Minded Engineer (2024)",
  description: "I build products people actually use. Software engineer with a founder's mindset.",
};

export default function Layout2024({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="theme-2024">{children}</div>;
}
