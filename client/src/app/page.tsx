"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

const Home = (): React.ReactElement => {
  const router = useRouter();

  useEffect(() => {
    const auth = Cookies.get("auth_token");

    if (auth) router.push("/dashboard");
  }, []);
  return (
    <div className="w-full h-full">
      <div className="w-full h-dvh flex flex-col items-center justify-center text-white">
        <div className="flex flex-col justify-center items-center gap-10 w-full h-full">
          <div className="flex flex-col items-center">
            <h1 className="text-white text-5xl font-semibold">Fitness APP</h1>
            <p className="font-semibold text-[#fb4f93]">
              Make your training easier.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <Link
              href="/login"
              className="w-[250px] bg-[#fb4f93] text-white py-3 px-5 text-center text-xl rounded-xl font-semibold"
            >
              {" "}
              Login{" "}
            </Link>
            <span className="text-white font-semibold text-lg">- or -</span>
            <Link
              href="/register"
              className="w-[250px] bg-[#fb4f93] text-white py-3 px-5 text-center text-xl rounded-xl font-semibold"
            >
              {" "}
              Register{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
