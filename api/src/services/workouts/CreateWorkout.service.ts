import { Optional } from "sequelize";
import BadRequestException from "../../errors/BadRequestException";
import WorkoutsModel from "../../models/Workouts.models";
import { Workout, WorkoutBody } from "../../types/types";
import { v4 as uuid } from "uuid";
import sequelize from "sequelize";

class CreateWorkoutService {
  private collection;

  constructor() {
    this.collection = WorkoutsModel;
  }

  private checkWorkout = async (workout_name: string) => {
    const exists = await this.collection.findOne({
      where: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("workout_name")),
        workout_name.toLowerCase()
      ),
    });
    return exists;
  };

  public create = async (body: WorkoutBody) => {
    const { user_id, workout_name } = body;

    if ([user_id, workout_name].includes("")) throw new BadRequestException("Fields cannot be empty");

    const workout = await this.checkWorkout(workout_name);
    if (workout) throw new BadRequestException(`Workout ${workout_name.toUpperCase()} already exists`);

    const newWorkout: Optional<Workout, any> = {
      workout_id: uuid(),
      ...body,
    };

    await this.collection.create(newWorkout);

    return { message: "Workout created", newWorkout };
  };
}

const createWorkoutService = new CreateWorkoutService();
export default createWorkoutService;
