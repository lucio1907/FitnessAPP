import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "600", "900"] });

export const metadata: Metadata = {
  title: "FitnessAPP",
  description: "Dedicated app for those who want to record their gym progress",
  keywords: [
    "gym",
    "fitness",
    "life",
    "app",
    "progress",
    "workout",
    "training",
    "lifting",
    "dumbell",
    "exercises",
    "life style",
    "health",
    "balance",
    "motivation",
    "personal growth"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-black`}>{children}</body>
    </html>
  );
}
