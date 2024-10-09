"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Loader from "../loaders/Loader";
import Workouts from "./Workouts";
import { useGlobalContext } from "@/hooks/useContext";

export interface WorkoutsTypes {
  workout_id: string;
  workout_name: string;
  description: string;
  createdAt: Date;
  user: {
    user_id: string;
    name: string;
    lastname: string;
    email: string;
    phone_number: string;
  };
}

const DashboardWorkouts = (): React.ReactElement => {
  const { isLoading, loadingHandler } = useGlobalContext();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [workouts, setWorkouts] = useState<WorkoutsTypes[]>();

  const router = useRouter();

  const getWorkouts = async (auth_token: string, user_id: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/workout/user/${user_id}`, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      });
      setWorkouts(response.data.response.data.workouts);
      loadingHandler(false);
    } catch (error: any) {
      setErrorMessage(error.response.data.response.message);
      loadingHandler(false);
    }
  };

  useEffect(() => {
    const auth = Cookies.get("auth_token");
    const user_id = Cookies.get('user_id');

    if (auth && user_id) getWorkouts(auth, user_id);
    else router.push("/login");
  }, []);

  return (
    <div
      className={`w-full h-full ${workouts === undefined ? "h-[80dvh]" : "h-full"} flex flex-col items-center`}
    >
      <div className={`w-full ${isLoading ? 'h-dvh' : 'h-full'} flex justify-center items-center`}>
        {isLoading ? (
          <Loader />
        ) : (
          <Workouts workouts={workouts} errorMessage={errorMessage} />
        )}
      </div>
    </div>
  );
};

export default DashboardWorkouts;
