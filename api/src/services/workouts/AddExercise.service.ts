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

  private searchExercise = async (exercise_name: string, workout_id: string) => {
    const found = await this.exercisesCollection.findOne({
      where: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("exercise_name")),
        exercise_name.toLowerCase()
      ),
    });

    const foundInWorkout = await this.collection.findOne({ where: { workout_id, exercise_id: found?.dataValues.exercise_id } })
    console.log(foundInWorkout)

    return found
};

public add = async (body: WorkoutExercise) => {
  const { workout_id, exercise_name, day, sets, reps, weight } = body;

  if ([workout_id, exercise_name, day, sets, reps, weight].includes(""))
      throw new BadRequestException("Fields cannot be empty");

  // Buscar si el ejercicio ya existe en la rutina
  const exerciseFound = await this.searchExercise(exercise_name, workout_id);

  if (!exerciseFound) {
      const newExercise = {
          exercise_id: uuid(),
          exercise_name,
          sets,
          reps,
          weight
      };

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
          this.exercisesCollection.create(newExercise),
          this.collection.create(addToWorkout),
      ]);

      return { message: 'New exercise created and added to workout!', newExercise };
  }

  throw new BadRequestException(`${exercise_name} already exists in this workout.`);
};

}

const addExerciseService = new AddExerciseService();
export default addExerciseService;
