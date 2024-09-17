import { DataTypes } from "sequelize";
import sequelizeConfig from "../config/sequelize.config";
import WorkoutsModel from "./Workouts.models";
import ProgressModel from "./Progress.models";

const UsersModel = sequelizeConfig.define(
  "users",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue: "No phone",
    },
  },
  {
    timestamps: false,
  }
);

UsersModel.hasMany(WorkoutsModel, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

UsersModel.hasMany(ProgressModel, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

export default UsersModel;
