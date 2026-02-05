import { Optional } from "sequelize";
import BadRequestException from "../../errors/BadRequestException";
import ProgressModel from "../../models/Progress.models";
import { Progress, ProgressBody } from "../../types/types";
import { v4 as uuid } from "uuid";
import UsersModel from "../../models/Users.models";
import ExercisesModel from "../../models/Exercises.models";
import sequelize from "sequelize";
import NotFoundException from "../../errors/NotFoundException";

class SaveProgressService {
  private collection;
  private exerciseCollection;
  private usersCollection;

  constructor() {
    this.collection = ProgressModel;
    this.exerciseCollection = ExercisesModel;
    this.usersCollection = UsersModel;
  }

  private searchExercise = async (exercise_name: string) => {
    const found = await this.exerciseCollection.findOne({
      where: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("exercise_name")),
        exercise_name.toLowerCase()
      ),
    });
    return found;
  };

  public save = async (body: ProgressBody) => {
    const { user_id, exercise_name, reps, sets, weight } = body;

    if ([user_id, exercise_name, reps, sets, weight].includes("")) throw new BadRequestException("Fields cannot be empty");

    const exerciseFound = await this.searchExercise(exercise_name);

    if (!exerciseFound) throw new NotFoundException("Exercise not found");

    const newProgress: Optional<Progress, any> = {
      id: uuid(),
      user_id,
      exercise_id: exerciseFound.dataValues.exercise_id,
      sets,
      reps,
      weight,
    };

    const [savedProgress, user] = await Promise.all([
      this.collection.create(newProgress),
      this.usersCollection.findByPk(user_id, {
        attributes: { exclude: ["password"] },
      }),
    ]);

    const {
      user_id: _user_id,
      exercise_id: _exercise_id,
      ...finalResponse
    } = savedProgress.dataValues;

    return {
      ...finalResponse,
      exercise: exerciseFound,
      user,
    };
  };
}

const saveProgressService = new SaveProgressService();
export default saveProgressService;
