import { Router } from "express";
import checkSession from "../../middlewares/checkSession.middlewares";
import {
  addExercise,
  createWorkout,
  deleteWorkout,
  getAllWorkouts,
  getWorkout,
  getWorkoutByUser,
  updateWorkout,
} from "../../controllers/workouts.controllers";

const router = Router();

router.post("/", checkSession, createWorkout);
router.post("/add-exercise", checkSession, addExercise);

router.get("/", checkSession, getAllWorkouts);
router.get("/:workout_id", checkSession, getWorkout);
router.get("/user/:user_id", checkSession, getWorkoutByUser);

router.put("/update-workout", checkSession, updateWorkout);

router.delete("/delete/:workout_id", checkSession, deleteWorkout);

export default router;
