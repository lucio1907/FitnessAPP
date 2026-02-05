"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import ProgressNotFound from "./ProgressNotFound";
import Navbar from "../navbar/Navbar";

interface ProgressDataStructure {
  id: string;
  sets: number;
  reps: number;
  weight: string;
  date: string;
  exercise: {
    exercise_id: string;
    exercise_name: string;
    description: string;
  };
  user: {
    user_id: string;
    email: string;
    name: string;
    lastname: string;
    phone_number: string;
  };
}

const ProgressDashboard = (): React.ReactElement => {
  const [userProgress, setUserProgress] = useState<ProgressDataStructure[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getProgress = async (user_id: string, auth_token: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/progress/user-progress/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        }
      );
      setUserProgress(response.data.response.userProgress);
    } catch (error: any) {
      setErrorMessage(error.response.data.response.message);
    }
  };

  useEffect(() => {
    const auth_token = Cookies.get("auth_token");

    if (auth_token) {
      const user_id = Cookies.get("user_id");
      user_id && getProgress(user_id, auth_token);
    }
  }, []);

  // Crear un conjunto para rastrear los nombres de ejercicios únicos
  const uniqueExercises = new Set<string>();

  // Filtrar los ejercicios en función del término de búsqueda
  const filteredExercises = userProgress.filter(item =>
    item.exercise.exercise_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <Navbar href="/dashboard"/>
      <div className="text-white flex flex-col">
        {errorMessage ? (
          <ProgressNotFound errorMessage={errorMessage} />
        ) : (
          <div className="flex flex-col items-center">
            <h1 className="text-main-color mt-10 text-3xl">Find your progress</h1>
            <input
              type="text"
              placeholder="Search exercise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 text-white p-3 rounded-md mb-4 outline-none mt-10 w-[90%]"
            />
            <div className="flex flex-col gap-2 justify-center items-center flex-wrap px-2 mt-10 w-full h-full">
              {filteredExercises.map((item) => {
                const exerciseName = item.exercise.exercise_name;

                // Si el ejercicio ya fue visto, no lo renderizamos
                if (!uniqueExercises.has(exerciseName)) {
                  uniqueExercises.add(exerciseName);
                  return (
                    <Link
                      href={`/progress/${exerciseName}/${item.exercise.exercise_id}`}
                      key={item.id}
                      className="bg-main-color w-[300px] max-w-[300px] text-nowrap p-3 rounded-lg"
                    >
                      {exerciseName}
                    </Link>
                  );
                }
                return null; // No renderizar nada si el ejercicio ya fue visto
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressDashboard;
