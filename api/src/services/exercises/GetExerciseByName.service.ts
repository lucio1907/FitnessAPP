import ExercisesModel from "../../models/Exercises.models";
import sequelize from "sequelize";
import NotFoundException from "../../errors/NotFoundException";

class GetExerciseByNameService {
  private collection;

  constructor() {
    this.collection = ExercisesModel;
  }

  public get = async (exercise_name: string) => {
    const getExercise = await this.collection.findAll({
      where: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("exercise_name")),
        exercise_name.toLowerCase()
      ),
    });

    if (getExercise.length === 0) throw new NotFoundException(`${exercise_name} not found`);

    return getExercise;
  };
}

const getExerciseByNameService = new GetExerciseByNameService();
export default getExerciseByNameService;
