import Link from "next/link";
import React from "react";
import DashboardNavigationButtons from "../dashboard/DashboardNavigationButtons";

const ProgressNotFound = ({
  errorMessage,
}: {
  errorMessage: string;
}): React.ReactElement => {
  return (
    <div className="text-white w-full h-[80dvh] flex flex-col justify-center items-center">
      <div className="flex flex-col gap-10 items-center">
        <p className="text-4xl text-red-500">{errorMessage}</p>
        <DashboardNavigationButtons href="/progress/save-progress" value="Start saving your progress" classname="w-[300px]"/>
      </div>
    </div>
  );
};

export default ProgressNotFound;
