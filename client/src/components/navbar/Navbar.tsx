import GoBackButtonSvg from "@/svg/GoBackButtonSvg";
import ProfileSvg from "@/svg/ProfileSvg";
import Link from "next/link";
import React from "react";

const Navbar = ({ href }: { href: string }): React.ReactElement => {
  return (
    <div className="w-full h-[100px] flex items-center justify-between px-5 border-b-[1px] border-main-color shadow-main-color">
      <Link href={href}>
        <GoBackButtonSvg classname="text-main-color w-[40px]" />
      </Link>
      <Link href="/profile-info">
        <ProfileSvg classname="text-white w-[45px]" />
      </Link>
    </div>
  );
};

export default Navbar;
