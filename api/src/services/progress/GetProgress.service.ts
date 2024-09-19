import sequelize from "sequelize";
import ProgressModel from "../../models/Progress.models";
import ExercisesModel from "../../models/Exercises.models";
import NotFoundException from "../../errors/NotFoundException";
import UsersModel from "../../models/Users.models";

class GetProgressService {
  private collection;
  private exerciseCollection;

  constructor() {
    this.collection = ProgressModel;
    this.exerciseCollection = ExercisesModel;
  }

  public get = async (exercise_name: string) => {
    const exercise = await this.exerciseCollection.findOne({
      where: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("exercise_name")),
        exercise_name.toLowerCase()
      ),
    });

    if (!exercise) throw new NotFoundException(`${exercise_name.toUpperCase()} not found`);

    const progress = await this.collection.findOne({
      where: { exercise_id: exercise.dataValues.exercise_id },
      include: [
        {
          model: UsersModel,
          as: "user",
          attributes: { exclude: ["password"] },
        },
        {
          model: ExercisesModel,
        },
      ],
      attributes: { exclude: ["user_id", "exercise_id"] },
      order: [['date', 'DESC']] // Orderna por fecha de creación de forma descendente
    });
    
    if (progress === null) throw new NotFoundException('Progress not found');

    return { message: "Done", progress_info: progress };
  };
}

const getProgressService = new GetProgressService();
export default getProgressService;
