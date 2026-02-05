import Navbar from "@/components/navbar/Navbar";
import ProgressGraph from "@/components/progress/ProgressGraph";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface ExerciseDataStructure {
  id: string;
  user_id: string;
  sets: number;
  reps: number;
  weight: number;
  date: string;
  exercise: {
    exercise_id: string;
    exercise_name: string;
    description: string;
  };
}

const ExerciseProgressInfo = async ({
  params,
}: {
  params: { id: string; exercise_name: string };
}): Promise<React.ReactElement> => {
  const id = params.id;
  const exercise_name = decodeURIComponent(params.exercise_name);

  const cookieStore = cookies();
  const auth_token = cookieStore.get("auth_token")?.value;

  let exercise: ExerciseDataStructure[] = [];
  try {
  if (auth_token) {
    const response = await axios.get(
      `http://localhost:8080/progress/user-progress/exercise/${id}`,
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    );

    exercise = response.data.response.exercises;
  } else redirect("/login");
  } catch (error: any) {
    if (error.status === 404)
      return (
        <div className="w-full h-full">
          <Navbar href="/progress" />
          <div className="flex flex-col justify-around h-[80dvh]">
            <h1 className="text-3xl text-center text-main-color">
              {exercise_name.toUpperCase()}
            </h1>
            <h2 className="text-main-color text-2xl font-semibold text-center">
              No progress saved...
            </h2>
            <Link
              href="/progress"
              className="bg-main-color w-[300px] max-w-[300px] text-nowrap p-3 rounded-lg"
            >
              Go to your progress
            </Link>
          </div>
        </div>
      );
  }

  const reps = exercise.map((item) => item.reps);
  const weight = exercise.map((item) => item.weight);
  const maxReps = exercise.reduce((max, item) => (item.reps > max ? item.reps : max),0);
  const maxWeight = exercise.reduce((max, item) => (item.weight > max ? item.weight : max),0);

  return (
    <div className="w-full h-[80dvh]">
      <Navbar href="/progress"/>
      <div className="text-white h-full flex flex-col justify-around">
        <h1 className="text-3xl text-center text-main-color">
          {exercise_name.toUpperCase()}
        </h1>
        <ProgressGraph dataProp={reps} labels={weight} />

        <div className="w-full flex justify-between px-5">
          <p className="text-main-color">
            Higher reps:{" "}
            <span className="font-semibold text-[#e8d8ff] text-lg">
              {maxReps}
            </span>
          </p>
          <p className="text-main-color">
            Higher weight:{" "}
            <span className="font-semibold text-[#e8d8ff] text-lg">
              {Math.floor(maxWeight)}
            </span>{" "}
            kg.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExerciseProgressInfo;
