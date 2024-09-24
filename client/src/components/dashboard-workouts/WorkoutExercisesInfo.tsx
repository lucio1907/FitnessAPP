import { ExerciseTypes } from "@/app/your-workouts/workout/[id]/page";
import React from "react";

const dayTranslations: { [key: string]: string } = {
    lunes: "Monday",
    martes: "Tuesday",
    miércoles: "Wednesday",
    jueves: "Thursday",
    viernes: "Friday",
    sábado: "Saturday",
    domingo: "Sunday",
    monday: "lunes",
    tuesday: "martes",
    wednesday: "miércoles",
    thursday: "jueves",
    friday: "viernes",
    saturday: "sábado",
    sunday: "domingo",
  };

const WorkoutExercisesInfo = ({
  id,
  exercise: { exercise_name, description },
  day,
  sets,
  reps,
  weight,
}: ExerciseTypes) => {
  return (
    <div className="w-full h-full">
      <div key={id} className="border-[1px] border-main-color py-2 px-3 rounded-xl">
        <p>
          Day: <span className="font-semibold">{dayTranslations[day.toLowerCase()]}</span>
        </p>
        <p>
          Exercise: <span className="font-semibold">{exercise_name}</span>
        </p>
        <p>
          Exercise description:{" "}
          <span className="font-semibold">{description}</span>
        </p>
        <p>
          Sets: <span className="font-semibold">{sets}</span>
        </p>
        <p>
          Reps: <span className="font-semibold">{reps}</span>
        </p>
        <p>
          Weight: <span className="font-semibold">{weight} kg.</span>
        </p>
      </div>
    </div>
  );
};

export default WorkoutExercisesInfo;
