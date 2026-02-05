import { DataTypes } from "sequelize";
import sequelizeConfig from "../config/sequelize.config";
import UsersModel from "./Users.models";
import ExercisesModel from "./Exercises.models";

const ProgressModel = sequelizeConfig.define(
  "progress",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: UsersModel,
        key: "user_id",
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
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

export default ProgressModel;
