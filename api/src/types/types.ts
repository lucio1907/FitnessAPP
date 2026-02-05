import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

/**
 * AUTH types
 */
export interface RegisterBody {
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface User extends RegisterBody {
  user_id: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface ReqExtended extends Request {
  user?: JwtPayload | { id: string };
}

/**
 * Exercises
 */

export interface ExercisesBody {
  exercise_name: string;
  description?: string;
  category: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface Exercises extends ExercisesBody {
  exercise_id: string;
}

/**
 * Workouts
 */

export interface WorkoutBody {
  user_id: string;
  workout_name: string;
  description?: string;
}

export interface Workout extends WorkoutBody {
  workout_id: string;
}

export interface WorkoutExercise {
  workout_id: string;
  exercise_name: string;
  day: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface WorkoutBodyUpdate {
  workout_name: string;
  exercise_name: string;
  day: string;
  sets: number;
  reps: number;
  weight: number;
}

/**
 * Progress
 */

export interface ProgressBody {
  user_id: string;
  exercise_name: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface Progress extends ProgressBody {
  id: string;
}
