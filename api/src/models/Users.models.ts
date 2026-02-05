import { DataTypes } from "sequelize";
import sequelizeConfig from "../config/sequelize.config";

const UsersModel = sequelizeConfig.define(
  "users",
  {
    user_id: {
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
      allowNull: false,
      defaultValue: "No phone",
    },
  },
  {
    timestamps: false,
  }
);

export default UsersModel;
