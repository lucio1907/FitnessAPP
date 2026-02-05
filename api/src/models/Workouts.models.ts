import { DataTypes } from "sequelize";
import sequelizeConfig from "../config/sequelize.config";
import UsersModel from "./Users.models";

const WorkoutsModel = sequelizeConfig.define("workouts", {
  workout_id: {
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
      key: "user_id",
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
}, {
  hooks: {
    beforeCreate: (workout: any) => {
      if (!workout.description) {
        workout.description = "No description";
      }
    },
  },
});

export default WorkoutsModel;
