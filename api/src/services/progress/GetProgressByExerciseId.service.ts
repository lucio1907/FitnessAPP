import NotFoundException from "../../errors/NotFoundException";
import ExercisesModel from "../../models/Exercises.models";
import ProgressModel from "../../models/Progress.models";

class GetProgressByExerciseIdService {
  private collection;

  constructor() {
    this.collection = ProgressModel;
  }

  public get = async (exercise_id: string) => {
    const exerciseProgress = await this.collection.findAll({
      where: { exercise_id },
      include: [{ model: ExercisesModel, attributes: { exclude: ["sets", "reps", "weight"] } }],
      attributes: { exclude: ["exercise_id"] },
    });

    if (exerciseProgress.length === 0)
      throw new NotFoundException(`Exercise with ID: ${exercise_id} not found`);

    return { message: "Done", exerciseProgress };
  };
}

const getProgressByExerciseIdServie = new GetProgressByExerciseIdService();
export default getProgressByExerciseIdServie;
