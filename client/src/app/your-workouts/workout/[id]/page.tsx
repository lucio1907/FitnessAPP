import axios from "axios";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import WorkoutExercisesFilter from "@/components/dashboard/WorkoutsExercisesFilter";
import NoExercises from "@/components/errors/NoExercises";

export interface ExerciseTypes {
  id: string;
  day: string;
  sets: number;
  reps: number;
  weight: number;
  exercise: ExerciseInfo;
}

interface ExerciseInfo {
  exercise_id: string;
  exercise_name: string;
  description: string;
}

interface UserTypes {
  user_id: string;
  name: string;
  lastname: string;
  email: string;
  phone_number: string;
}

interface Workout {
  workout_id: string;
  workout_name: string;
  description: string;
  createdAt: Date;
  user: UserTypes;
  workout_exercises: ExerciseTypes[] | string;
}

const WorkoutInfoPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const cookieStore = cookies();
  const auth_token = cookieStore.get("auth_token")?.value;

  let workout: Workout = {
    workout_id: "",
    workout_name: "",
    description: "",
    createdAt: new Date(),
    user: {
      user_id: "",
      name: "",
      lastname: "",
      email: "",
      phone_number: "",
    },
    workout_exercises: [],
  };

  if (auth_token) {
    const res = await axios.get(`http://localhost:8080/workout/${id}`, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    });
    workout = res.data.response.workout;
  } else redirect("/login");

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full p-5">
        <div className="flex flex-col gap-2">
          <p className="text-white font-semibold">
            Workout name:{" "}
            <span className="text-main-color font-normal">
              {workout.workout_name}
            </span>
          </p>
          <p className="text-white font-semibold">
            Description:{" "}
            <span className="font-normal">{workout.description}</span>
          </p>
          <p className="text-white font-semibold">
            Created by:{" "}
            <span className="font-normal">
              {workout.user.name} {workout.user.lastname}
            </span>
          </p>
        </div>

        {/* Componente de filtrado con los ejercicios obtenidos */}
        {Array.isArray(workout.workout_exercises) ? (
          <WorkoutExercisesFilter
            exercises={workout.workout_exercises as ExerciseTypes[]}
          />
        ) : (
          <NoExercises workout_id={workout.workout_id}/>
        )}
      </div>
    </div>
  );
};

export default WorkoutInfoPage;
