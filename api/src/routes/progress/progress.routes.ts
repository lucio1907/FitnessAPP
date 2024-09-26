import { Router } from "express";
import checkSession from "../../middlewares/checkSession.middlewares";
import {
  deleteProgress,
  getProgress,
  getProgressByExerciseId,
  getProgressByUser,
  saveProgress,
} from "../../controllers/progress.controllers";

const router = Router();

router.get("/exercise", checkSession, getProgress);
router.get("/user-progress/:user_id", checkSession, getProgressByUser);
router.get("/user-progress/exercise/:exercise_id", checkSession, getProgressByExerciseId);

router.post("/save", checkSession, saveProgress);

router.delete("/delete/:id", checkSession, deleteProgress);

export default router;
