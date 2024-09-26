import Navbar from "@/components/navbar/Navbar";
import React from "react";

const ProgressLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full">
      {children}
    </div>
  );
};

export default ProgressLayout;
