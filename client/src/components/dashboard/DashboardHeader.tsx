"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import ProfileSvg from "@/svg/ProfileSvg";

const DashboardHeader = (): React.ReactElement => {
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    const getUsername = Cookies.get("name");

    if (getUsername) setUsername(getUsername);
  }, []);
  return (
    <nav className="w-full h-[100px] bg-black border-b-[1px] border-main-color shadow-main-color flex items-center">
      <div className="flex justify-between items-center w-full px-5">
        <div>
          <h2 className="text-white text-2xl font-semibold">
            Hi again, {username}!
          </h2>
          <p className="text-main-color text-[13px]">
            Let's crush your goals today!
          </p>
        </div>
        <div>
          <Link href="/dashboard/profile">
            <ProfileSvg classname="text-white w-[40px]" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;
