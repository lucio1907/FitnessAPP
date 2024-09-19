import sequelize from "sequelize";
import BadRequestException from "../../errors/BadRequestException";
import ExercisesModel from "../../models/Exercises.models";
import WorkoutExersicesModel from "../../models/WorkoutExercises.models";
import { WorkoutExercise } from "../../types/types";
import { v4 as uuid } from "uuid";

class AddExerciseService {
  private collection;
  private exercisesCollection;

  constructor() {
    this.collection = WorkoutExersicesModel;
    this.exercisesCollection = ExercisesModel;
  }

  private searchExersice = async (exercise_name: string) => {
    const found = await this.exercisesCollection.findOne({
      where: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("exercise_name")),
        exercise_name.toLowerCase()
      ),
    });

    return found;
  };

  public add = async (body: WorkoutExercise) => {
    const { workout_id, exercise_name, day, sets, reps, weight } = body;

    if ([workout_id, exercise_name, day, sets, reps, weight].includes(""))
      throw new BadRequestException("Fields cannot be empty");

    const exerciseFound = await this.searchExersice(exercise_name);

    if (!exerciseFound) {
        const newExercise = {
            exercise_id: uuid(),
            exercise_name,
            sets,
            reps,
            weight
        }

        const addToWorkout = {
            id: uuid(),
            workout_id,
            exercise_id: newExercise.exercise_id,
            day,
            sets,
            reps,
            weight
        };

        await Promise.all([
            await this.exercisesCollection.create(newExercise),
            await this.collection.create(addToWorkout),
        ])
        
        return { message: 'New exercise created and added to workout!', newExercise };
    }

    const exerciseInWorkout = await this.collection.findOne({ where: { exercise_id: exerciseFound.dataValues.exercise_id } })

    if (exerciseInWorkout) throw new BadRequestException(`${exercise_name} are in the workout already`);

    const addToWorkout = {
        id: uuid(),
        workout_id,
        exercise_id: exerciseFound.dataValues.exercise_id,
        day,
        sets,
        reps,
        weight
    };

    await this.collection.create(addToWorkout);

    return { message: 'Exercise added to workout', exercise_added: addToWorkout };
  };
}

const addExerciseService = new AddExerciseService();
export default addExerciseService;
