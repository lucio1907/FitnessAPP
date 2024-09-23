"use client";
import Link from "next/link";
import React from "react";

const NoExercises = ({ workout_id }: { workout_id: string }) => {
  return (
    <div className="flex flex-col justify-center items-center h-[50dvh]">
      <p className="text-main-color text-3xl font-semibold">No exercises...</p>
      <div className="flex flex-col items-center mt-10 gap-3">
        <Link
          href={`/dashboard/workout/add-exercise/${workout_id}`}
          className="bg-main-color text-white p-3 rounded-lg"
        >
          Add exercise
        </Link>
        <span className="text-main-color">- or -</span>
        <Link
          href="/dashboard"
          className="bg-main-color text-white p-3 rounded-lg"
        >
          Go to dashboard
        </Link>
      </div>
    </div>
  );
};

export default NoExercises;
