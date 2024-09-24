import ProfileInfoComponent from "@/components/user-info/ProfileInfoComponent";
import GoBackButtonSvg from "@/svg/GoBackButtonSvg";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

const ProfileInfoPage = (): React.ReactElement => {
  const cookieStore = cookies();
  const userId: string | undefined = cookieStore.get("user_id")?.value;

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full h-[100px] flex items-center px-5 border-b-[1px] border-main-color shadow-main-color">
        <Link href="/dashboard">
          <GoBackButtonSvg classname="text-main-color w-[40px]" />
        </Link>
        <p className="font-semibold text-white text-sm text-end">
          Account ID: <span className="text-main-color">{userId}</span>
        </p>
      </div>
      <ProfileInfoComponent />
    </div>
  );
};

export default ProfileInfoPage;
