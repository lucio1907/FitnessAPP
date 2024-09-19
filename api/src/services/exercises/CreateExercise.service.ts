import { Optional } from "sequelize";
import BadRequestException from "../../errors/BadRequestException";
import ExercisesModel from "../../models/Exercises.models";
import { Exercises, ExercisesBody } from "../../types/types";
import { v4 as uuid } from "uuid";
import sequelize from "sequelize";

class CreateExerciseService {
  private collection;

  constructor() {
    this.collection = ExercisesModel;
  }

  private checkExercise = async (exercise_name: string) => {
    const checked = await this.collection.findOne({
      where: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("exercise_name")),
        exercise_name.toLowerCase()
      ),
    });
    return checked;
  };

  public create = async (body: ExercisesBody) => {
    const { exercise_name, description, reps, sets, weight } = body;

    if ([exercise_name, reps, sets, weight].includes("")) throw new BadRequestException("Fields cannot be empty");

    const exerciseExists = await this.checkExercise(exercise_name);
    if (exerciseExists) throw new BadRequestException(`You have recorded ${exercise_name.toUpperCase()} before`);

    const newExercise: Optional<Exercises, any> = {
      exercise_id: uuid(),
      description: !description ? "No description" : description,
      exercise_name: exercise_name.toLowerCase(),
      reps,
      sets,
      weight,
    };

    await this.collection.create(newExercise);

    return { message: "New exercise created", data: newExercise };
  };
}

const createExerciseService = new CreateExerciseService();
export default createExerciseService;
