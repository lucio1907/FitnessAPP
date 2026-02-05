import sequelize from "sequelize";
import BadRequestException from "../../errors/BadRequestException";
import WorkoutsModel from "../../models/Workouts.models";
import { WorkoutBodyUpdate } from "../../types/types";
import WorkoutExersicesModel from "../../models/WorkoutExercises.models";
import ExercisesModel from "../../models/Exercises.models";
import NotFoundException from "../../errors/NotFoundException";

class UpdateWorkoutService {
  private collection;
  private exersicesWorkoutCollection;
  private exersicesCollection;

  constructor() {
    this.collection = WorkoutsModel;
    this.exersicesWorkoutCollection = WorkoutExersicesModel;
    this.exersicesCollection = ExercisesModel;
  }

  public update = async (body: WorkoutBodyUpdate) => {
    const { workout_name, exercise_name, day, reps, sets, weight } = body;

    if ([workout_name, exercise_name, day, reps, sets, weight].includes(""))
      throw new BadRequestException("Fields cannot be empty");

    // Busca primero la rutina y luego el ejercicio a actualizar
    const [getWorkout, getExersice] = await Promise.all([
      this.collection.findOne({
        where: sequelize.where(
          sequelize.fn("LOWER", sequelize.col("workout_name")),
          workout_name.toLowerCase()
        ),
      }),
      this.exersicesCollection.findOne({
        where: sequelize.where(
          sequelize.fn("LOWER", sequelize.col("exercise_name")),
          exercise_name.toLowerCase()
        ),
      }),
    ]);

    if (!getWorkout)
      throw new NotFoundException(`${workout_name.toUpperCase()} not found`);
    if (!getExersice)
      throw new NotFoundException(`${exercise_name.toUpperCase()} not found`);

    // La tabla intermedia probablemente necesita tanto el workout_id como el exercise_id
    const workoutExerciseRecord = await this.exersicesWorkoutCollection.findOne(
      {
        where: {
          workout_id: getWorkout.dataValues.workout_id,
          exercise_id: getExersice.dataValues.exercise_id,
        },
      }
    );

    if (!workoutExerciseRecord)
      throw new NotFoundException(`Exercise not found in the workout`);

    const exerciseUpdated = {
      day,
      sets,
      reps,
      weight,
    };

    // Actualiza la tabla intermedia WorkoutExercisesModel
    await this.exersicesWorkoutCollection.update(exerciseUpdated, {
      where: {
        workout_id: getWorkout.dataValues.workout_id,
        exercise_id: getExersice.dataValues.exercise_id,
      },
    });

    return { message: "Exercise updated successfully" };
  };
}

const updateWorkoutService = new UpdateWorkoutService();
export default updateWorkoutService;
