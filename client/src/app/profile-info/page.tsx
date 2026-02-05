import LogoutButton from "@/components/buttons/LogoutButton";
import ProfileInfoComponent from "@/components/user-info/ProfileInfoComponent";
import GoBackButtonSvg from "@/svg/GoBackButtonSvg";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: 'Fitness APP | Profile'
}

const ProfileInfoPage = (): React.ReactElement => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full h-[100px] flex items-center justify-between px-5 border-b-[1px] border-main-color shadow-main-color">
        <Link href="/dashboard">
          <GoBackButtonSvg classname="text-main-color w-[40px]" />
        </Link>
        <LogoutButton />
      </div>
      <ProfileInfoComponent />
    </div>
  );
};

export default ProfileInfoPage;
