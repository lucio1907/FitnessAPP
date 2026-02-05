"use client";

import React, { useState } from "react";
import FilterDayButton from "@/components/buttons/FilterDayButton";
import WorkoutExercisesInfo from "@/components/dashboard-workouts/WorkoutExercisesInfo";
import { ExerciseTypes } from "@/app/your-workouts/workout/[id]/page";
import Link from "next/link";

// Mapa de días en español e inglés
const dayTranslations: { [key: string]: string } = {
  lunes: "monday",
  martes: "tuesday",
  miércoles: "wednesday",
  jueves: "thursday",
  viernes: "friday",
  sábado: "saturday",
  domingo: "sunday",
  monday: "lunes",
  tuesday: "martes",
  wednesday: "miércoles",
  thursday: "jueves",
  friday: "viernes",
  saturday: "sábado",
  sunday: "domingo",
};

interface WorkoutExercisesFilterProps {
  exercises: ExerciseTypes[]; // Arreglo de ejercicios que viene del servidor
  workout_id: string
}

const WorkoutExercisesFilter: React.FC<WorkoutExercisesFilterProps> = ({
  exercises,
  workout_id
}) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // Filtrar los ejercicios según el día seleccionado
  const filteredExercises = exercises.filter((item) => {
    if (!selectedDay) return true; // Si no hay día seleccionado, muestra todos
  
    // Normalizar los días para que coincidan tanto en inglés como en español
    const normalizedSelectedDay = selectedDay.toLowerCase();
    const normalizedItemDay = item.day.toLowerCase();
  
    // Comprobamos si el día seleccionado coincide con el día del ejercicio en ambos idiomas
    return (
      normalizedItemDay === dayTranslations[normalizedSelectedDay] || // Comparar el día normalizado del ejercicio con el mapeo del día seleccionado
      Object.keys(dayTranslations).some(
        (day) => dayTranslations[day] === normalizedItemDay && day.toLowerCase() === normalizedSelectedDay
      )
    );
  });

  // Función para restablecer el filtro (mostrar todos los días)
  const resetFilter = () => setSelectedDay(null);
  
  return (
    <div
      className={`w-full ${
        selectedDay !== null ? "h-full" : "h-[50dvh]"
      } flex flex-col justify-center`}
    >
      <div
        className={`flex ${
          selectedDay === null ? "flex-wrap" : ""
        } justify-center gap-4 mt-5`}
      >
        {selectedDay ? (
          <div className="flex flex-wrap">
            <h2 className="text-white text-2xl font-semibold mt-5">
              Selected day:
            </h2>
            <span className="text-main-color text-3xl font-semibold">
              {selectedDay}
            </span>
          </div>
        ) : (
          <h2 className="text-main-color font-semibold text-2xl mt-5">
            Select your day:
          </h2>
        )}

        {selectedDay ? (
          <FilterDayButton day={"Go back"} setSelectedDay={resetFilter} />
        ) : (
          <>
            <FilterDayButton day="Monday" setSelectedDay={setSelectedDay} />
            <FilterDayButton day="Tuesday" setSelectedDay={setSelectedDay} />
            <FilterDayButton day="Wednesday" setSelectedDay={setSelectedDay} />
            <FilterDayButton day="Thursday" setSelectedDay={setSelectedDay} />
            <FilterDayButton day="Friday" setSelectedDay={setSelectedDay} />
            <FilterDayButton day="Saturday" setSelectedDay={setSelectedDay} />
          </>
        )}
        {selectedDay === null && (
          <Link
            href="/dashboard"
            className="bg-main-color p-3 mt-5 rounded-md text-white font-semibold w-[80%] text-center"
          >
            Go to dashboard
          </Link>
        )}
      </div>
      <div className="flex justify-center mt-5">
        <Link
          href={`/add-exercise/${workout_id}`}
          className="bg-main-color p-3 mt-5 rounded-md text-white font-semibold  text-center w-[80%]"
        >
          Add new exercise
        </Link>
      </div>

      {/* Mostrar ejercicios filtrados */}
      {selectedDay ? (
        <div className="text-white flex flex-col gap-5 text-lg mt-5">
          <h2 className="text-3xl mt-10">Workout exercises:</h2>
          {filteredExercises.length > 0 ? (
            filteredExercises.map((item) => (
              <WorkoutExercisesInfo
                key={item.id}
                id={item.id}
                day={item.day}
                exercise={item.exercise}
                sets={item.sets}
                reps={item.reps}
                weight={item.weight}
              />
            ))
          ) : (
            <p className="mt-10 text-2xl text-center text-main-color font-semibold">
              No exercises available for the selected day.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default WorkoutExercisesFilter;
