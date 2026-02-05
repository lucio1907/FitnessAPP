import { DataTypes } from "sequelize";
import sequelizeConfig from "../config/sequelize.config";
import WorkoutsModel from "./Workouts.models";
import ExercisesModel from "./Exercises.models";

const WorkoutExersicesModel = sequelizeConfig.define(
  "workout_exercises",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    workout_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: WorkoutsModel,
        key: "workout_id",
      },
    },
    exercise_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: ExercisesModel,
        key: "exercise_id",
      },
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.DECIMAL(5, 2),
    },
  },
  {
    timestamps: false,
  }
);

export default WorkoutExersicesModel;
