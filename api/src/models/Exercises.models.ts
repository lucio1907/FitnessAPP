import { DataTypes } from "sequelize";
import sequelizeConfig from "../config/sequelize.config";

const ExercisesModel = sequelizeConfig.define(
  "exercises",
  {
    exercise_id: {
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

export default ExercisesModel;
