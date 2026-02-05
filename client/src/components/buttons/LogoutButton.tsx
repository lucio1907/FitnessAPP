"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LogoutButton = (): React.ReactElement => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleOnClick = () => {
    setIsLoading(true);
    setIsClicked(true);

    // Borra todas las cookies
    Object.keys(Cookies.get()).forEach((cookieName) =>
      Cookies.remove(cookieName)
    );

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (isClicked) {
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  }, [isClicked]);

  return (
    <button
      className="bg-red-500 py-3 px-5 rounded-xl font-semibold text-white hover:bg-red-700 transition-all ease-in duration-150"
      onClick={handleOnClick}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
