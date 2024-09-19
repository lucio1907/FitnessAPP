import sequelize from "sequelize";
import WorkoutsModel from "../../models/Workouts.models";
import NotFoundException from "../../errors/NotFoundException";
import UsersModel from "../../models/Users.models";
import WorkoutExersicesModel from "../../models/WorkoutExercises.models";
import ExercisesModel from "../../models/Exercises.models";

class GetWorkoutByNameService {
  private collection;

  constructor() {
    this.collection = WorkoutsModel;
  }

  public get = async (workout_name: string) => {
    const workout = await this.collection.findOne({
      where: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("workout_name")),
        workout_name.toLowerCase()
      ),
      attributes: {
        exclude: ["updatedAt", "user_id"],
      },
      include: [
        {
          model: UsersModel,
          as: "user",
          attributes: { exclude: ["password"] },
        },
        {
          model: WorkoutExersicesModel,
          attributes: { exclude: ["workout_id", "exercise_id"] },
          include: [
            {
              model: ExercisesModel,
              attributes: { exclude: ["sets", "reps", "weight"] },
            },
          ],
        },
      ],
    });

    if (workout === null) throw new NotFoundException(`${workout_name.toUpperCase()} doesn't exists`);

    if (workout.dataValues.workout_exercises.length === 0)
      return {
        message: "Done",
        workout_info: {
          ...workout.toJSON(),
          workout_exercises: "No exercises",
        },
      };
    return { message: "Done", workout_info: workout };
  };
}

const getWorkoutByNameService = new GetWorkoutByNameService();
export default getWorkoutByNameService;