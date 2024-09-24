import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfileSvg from "@/svg/ProfileSvg";
import Link from "next/link";

const ProfileInfoComponent = (): React.ReactElement => {
  const cookieStore = cookies();

  const auth_token = cookieStore.get("auth_token")?.value;
  const username = cookieStore.get("name")?.value;
  const lastname = cookieStore.get("lastname")?.value;
  const email = cookieStore.get("email")?.value;

  if (!auth_token) redirect("/login");
  return (
    <div className="w-full h-[80dvh] flex flex-col justify-center">
      <div className="text-white flex flex-col items-center ">
        <ProfileSvg classname="w-[150px] text-main-color" />
        <div className="flex flex-col justify-center text-nowrap">
          <h1 className="text-3xl text-center font-semibold">Your info</h1>
          <div className="mt-10">
            <p className="text-xl font-semibold">
              User:{" "}
              <span className="text-main-color">
                {username} {lastname}
              </span>
            </p>
            <p className="text-xl font-semibold">
              Email: <span className="text-main-color">{email}</span>
            </p>
          </div>

          <div className="w-full mt-10 flex justify-center gap-10">
            <Link
              href="/progress"
              className="bg-main-color p-4 px-6 rounded-xl font-semibold"
            >
              Progress
            </Link>
            <Link
              href="/your-workouts"
              className="bg-main-color p-4 px-6 rounded-xl font-semibold"
            >
              Workouts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoComponent;
