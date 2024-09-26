import React from "react";
import DashboardNavigationButtons from "./DashboardNavigationButtons";
import { cookies } from "next/headers";

const Dashboard = (): React.ReactElement => {
  const cookieStore = cookies();
  const name = cookieStore.get('name')?.value;
  return (
    <div className="w-full h-[80dvh] flex justify-center">
      <div className="flex flex-col justify-center gap-10 w-[70%]">
        <h1 className="text-white text-2xl text-center">What are you going to do today, {name}?</h1>
        <DashboardNavigationButtons href="/your-workouts" value="Your workouts" />
        <DashboardNavigationButtons href="/progress" value="Your progress" />
        <DashboardNavigationButtons href="/exercises" value="Your exercises" />
      </div>
    </div>
  );
};

export default Dashboard;
