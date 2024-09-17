import { DataTypes } from "sequelize";
import sequelizeConfig from "../config/sequelize.config";
import UsersModel from "./Users.models";
import ExercisesModel from "./Exercises.models";
import WorkoutExersicesModel from "./WorkoutExercises.models";

const WorkoutsModel = sequelizeConfig.define("workouts", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: UsersModel,
      key: "id",
    },
  },
  workout_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "No description",
  },
});

WorkoutsModel.belongsTo(UsersModel, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

WorkoutsModel.belongsToMany(WorkoutExersicesModel, {
  through: WorkoutExersicesModel,
  foreignKey: "workout_id",
  onDelete: "CASCADE",
});

export default WorkoutsModel;
