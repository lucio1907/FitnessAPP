"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Loader from '@/components/loaders/Loader';
import AddExerciseToWorkoutComponent from '@/components/exercises/AddExerciseToWorkoutComponent';

const AddExerciseToWorkout = ({ params }: { params: { workout_id: string } }): React.ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const workout_id = params.workout_id;
  const auth_token = Cookies.get("auth_token");
  const router = useRouter();

  useEffect(() => {
    if (!auth_token) router.push("/login");
    else setIsLoading(false);
  }, []);

  return (
    <div className="w-full h-dvh">
      <div className="h-full flex justify-center items-center">
        {isLoading && <Loader />}
        {!isLoading && (
          <AddExerciseToWorkoutComponent workout_id={workout_id} auth_token={auth_token}/>
        )}
      </div>
    </div>
  );
}

export default AddExerciseToWorkout