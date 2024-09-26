import NotFoundException from "../../errors/NotFoundException";
import ExercisesModel from "../../models/Exercises.models";
import ProgressModel from "../../models/Progress.models";
import UsersModel from "../../models/Users.models";

class GetProgressByUserService {
  private collection;

  constructor() {
    this.collection = ProgressModel;
  }

  public get = async (user_id: string) => {
    const getUserProgress = await this.collection.findAll({
      where: { user_id },
      include: [
        {
          model: UsersModel,
          as: "user",
          attributes: { exclude: ["password"] },
        },
        {
          model: ExercisesModel,
          attributes: { exclude: ["sets", "reps", "weight"] },
        },
      ],
      attributes: { exclude: ["user_id", "exercise_id"] },
    });

    if (getUserProgress.length === 0)
      throw new NotFoundException("Progress not found");
    return { message: "Done", userProgress: getUserProgress };
  };
}

const getProgressByUserService = new GetProgressByUserService();
export default getProgressByUserService;
