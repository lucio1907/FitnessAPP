import { NextFunction, Request, Response } from "express";
import createExerciseService from "../services/exercises/CreateExercise.service";
import getExercisesService from "../services/exercises/GetExercises.service";
import getExerciseByNameService from "../services/exercises/GetExerciseByName.service";
import deleteExerciseService from "../services/exercises/DeleteExercise.service";

export const createExercise = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newExercise = await createExerciseService.create(req.body);
        return res.status(201).json({ response: { message: newExercise.message, data: newExercise.data, status: 'Created' } });
    } catch (error) {
        next(error);
    }
};

export const getExercises = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allExercises = await getExercisesService.get();
        return res.json({ response: { message: 'All exercises', allExercises, status: 'OK' } });
    } catch (error) {
        next(error)
    }
}

export const getExerciseByName = async (req: Request, res: Response, next: NextFunction) => {    
    try {
        const getExercise = await getExerciseByNameService.get(req.body.exercise_name);
        return res.json({ response: { message: 'Done', exercise: getExercise, status: 'OK' } })
    } catch (error) {
        next(error);
    }
};

export const deleteExercise = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleted = await deleteExerciseService.delete(req.params.exercise_id);
        return res.json({ response: { message: deleted.message, exerciseDeleted: deleted.exerciseDeleted } });
    } catch (error) {
        next(error);
    }
};