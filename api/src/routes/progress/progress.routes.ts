import { Router } from "express";
import checkSession from "../../middlewares/checkSession.middlewares";
import {
  deleteProgress,
  getProgress,
  getProgressByUser,
  saveProgress,
} from "../../controllers/progress.controllers";

const router = Router();

router.get("/exercise", checkSession, getProgress);
router.get("/user-progress", checkSession, getProgressByUser);

router.post("/save", checkSession, saveProgress);

router.delete("/delete/:id", checkSession, deleteProgress);

export default router;
