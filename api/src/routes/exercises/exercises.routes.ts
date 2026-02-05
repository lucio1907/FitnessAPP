import { Router } from "express";
import checkSession from "../../middlewares/checkSession.middlewares";
import {
  createExercise,
  deleteExercise,
  getExerciseByName,
  getExercises,
} from "../../controllers/exercises.controllers";

const router = Router();

router.post("/", checkSession, createExercise);
router.post("/");

router.get("/", checkSession, getExercises);
router.get("/name", checkSession, getExerciseByName);

router.delete("/delete/:exercise_id", checkSession, deleteExercise);

export default router;
