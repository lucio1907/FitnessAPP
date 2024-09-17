import { DataTypes } from "sequelize";
import sequelizeConfig from "../config/sequelize.config";
import WorkoutExersicesModel from "./WorkoutExercises.models";
import ProgressModel from "./Progress.models";

const ExercisesModel = sequelizeConfig.define(
  "exercises",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    exercise_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "No description",
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

ExercisesModel.belongsToMany(WorkoutExersicesModel, {
  through: WorkoutExersicesModel,
  foreignKey: "exercise_id",
  onDelete: "CASCADE",
});

ExercisesModel.hasMany(ProgressModel, {
  foreignKey: "exercise_id",
  onDelete: "CASCADE",
});

export default ExercisesModel;
