import { NextFunction, Request, Response } from "express";
import createWorkoutService from "../services/workouts/CreateWorkout.service";
import getWorkoutsService from "../services/workouts/GetWorkouts.service";
import getWorkoutByNameService from "../services/workouts/GetWorkoutByName.service";
import addExerciseService from "../services/workouts/AddExercise.service";
import updateWorkoutService from "../services/workouts/UpdateWorkout.service";
import deleteWorkoutService from "../services/workouts/DeleteWorkout.service";
import getUserWorkoutsService from "../services/workouts/GetUserWorkouts.service";

export const createWorkout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workout = await createWorkoutService.create(req.body);
        return res.status(201).json({ response: { message: workout.message, newWorkout: workout.newWorkout, status: 'Created' } })
    } catch (error) {
        next(error);
    }
}

export const getAllWorkouts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allWorkouts = await getWorkoutsService.get();
        return res.json({ response: { message: allWorkouts.message, workouts: allWorkouts.workouts, status: 'OK' } });
    } catch (error) {
        next(error);
    }
};

export const getWorkout = async (req: Request, res: Response, next: NextFunction) => {
    const { workout_id } = req.params
    try {
        const workout = await getWorkoutByNameService.get(workout_id);
        return res.json({ response: { message: workout.message, workout: workout.workout_info } });
    } catch (error) {
        next(error);
    }
};

export const addExercise = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const exerciseAdded = await addExerciseService.add(req.body);
        return res.status(201).json({ response: { message: exerciseAdded.message, exerciseAdded: exerciseAdded.exercise_added, newExercise: exerciseAdded.newExercise } })
    } catch (error) {
        next(error);
    }
};

export const updateWorkout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updated = await updateWorkoutService.update(req.body);
        return res.json({ response: { message: updated.message, status: 'OK' } })
    } catch (error) {
        next(error)
    }
}

export const deleteWorkout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleted = await deleteWorkoutService.delete(req.params.workout_id);
        return res.json({ response: { message: deleted.message, workoutDeleted: deleted.workoutDeleted } });
    } catch (error) {
        next(error);
    }
};

export const getWorkoutByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getWorkouts = await getUserWorkoutsService.get(req.params.user_id);
        return res.json({ response: { message: getWorkouts.message, data: getWorkouts.workouts } })
    } catch (error) {
        console.log(error)
        next(error);
    }
}