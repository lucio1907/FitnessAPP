import { Router } from "express";
import checkSession from "../../middlewares/checkSession.middlewares";
import {
  addExercise,
  createWorkout,
  deleteWorkout,
  getAllWorkouts,
  getWorkout,
  updateWorkout,
} from "../../controllers/workouts.controllers";

const router = Router();

router.post("/", checkSession, createWorkout);
router.post("/add-exercise", checkSession, addExercise);

router.get("/", checkSession, getAllWorkouts);
router.get("/workoutname", checkSession, getWorkout);

router.put("/update-workout", checkSession, updateWorkout);

router.delete("/delete/:workout_id", checkSession, deleteWorkout);

export default router;
