import React from "react";
import { WorkoutsTypes } from "./DashboardWorkouts";
import Link from "next/link";

interface Props {
  workouts: WorkoutsTypes[] | undefined;
  errorMessage: string;
}

const Workouts = (props: Props): React.ReactElement => {
  return (
    <div className="px-5 w-full">
      {props.errorMessage ? (
        <div className="w-full h-[80dvh] flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col items-center">
            <h2 className="text-white text-4xl text-center">
              {props.errorMessage}...
            </h2>
            <p className="text-main-color text-center mt-6 mb-3">
              Get ready to create your personalized workout!
            </p>
          </div>
          <Link
            href="/your-workouts/create-workout"
            className="bg-main-color p-4 rounded-xl text-white text-lg font-semibold"
          >
            Create workout!
          </Link>
        </div>
      ) : (
        // Si hay rutinas que se muestren en esta parte
        <div className="w-full h-full mt-5">
          <h1 className="text-white text-2xl">Your workouts:</h1>
          {props.workouts?.map((item, index) => (
            <Link
              href={`/your-workouts/workout/${item.workout_id}`}
              key={item.workout_id}
              className="text-white"
            >
              <div className={`text-lg ${index === 0 ? 'bg-main-color' : 'bg-[#37557a]'} flex flex-col gap-5 w-full h-full p-5 my-5 rounded-md`}>
                <p>
                  <span className="font-semibold">Workout name: </span>
                  {item.workout_name}
                </p>
                <p className="">
                  <span className="font-semibold">Description: </span>
                  {item.description}
                </p>
                <div className="flex justify-between items-center w-full mt-5">
                  <p>
                    Created by{" "}
                    <span className="font-semibold">
                      {item.user.name} {item.user.lastname}
                    </span>
                  </p>
                  <p className="text-[#00C851] font-semibold text-nowrap">{index === 0 ? 'IN USE' : ''}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workouts;
