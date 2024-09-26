import { NextFunction, Request, Response } from "express";
import saveProgressService from "../services/progress/SaveProgress.service";
import getProgressService from "../services/progress/GetProgress.service";
import getProgressByUserService from "../services/progress/GetProgressByUser.service";
import deleteProgressService from "../services/progress/DeleteProgress.service";
import getProgressByExerciseIdServie from "../services/progress/GetProgressByExerciseId.service";

export const saveProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newProgress = await saveProgressService.save(req.body);
        return res.status(201).json({ response: { message: 'Progress saved!', progress: newProgress, status: 'Created' } })
    } catch (error) {
        next(error);
    }
};

export const getProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const progress = await getProgressService.get(req.body.exercise_name);
        return res.json({ response: { message: progress.message, progress: progress.progress_info } })
    } catch (error) {
        next(error);
    }
};

export const getProgressByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userProgress = await getProgressByUserService.get(req.params.user_id);
        return res.json({ response: { message: userProgress.message, userProgress: userProgress.userProgress, status: 'OK' } });
    } catch (error) {
        next(error);
    }
};

export const deleteProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleted = await deleteProgressService.delete(req.params.id);
        return res.json({ response: { message: deleted.message, progressDeleted: deleted.progressDeleted } });
    } catch (error) {
        next(error);
    }
};

export const getProgressByExerciseId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const exercise = await getProgressByExerciseIdServie.get(req.params.exercise_id);
        return res.json({ response: { message: exercise.message, exercises: exercise.exerciseProgress } });
    } catch (error) {
        next(error);
    }
}