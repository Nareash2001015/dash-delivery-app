import { Sequelize } from "sequelize";
import { HOSTNAME, DATABASE, USERNAME, PASSWORD } from "../config";
import { DataTypes } from "sequelize";
import User from "./models/user";
import Shipment from "./models/shipment";

const sequelize: Sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOSTNAME,
  dialect: "postgres",
});

Shipment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    tableName: "shipment",
    sequelize: sequelize, // this bit is important
  }
);
sequelize.sync();

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    tableName: "user",
    sequelize: sequelize, // this bit is important
  }
);

User.hasMany(Shipment, { foreignKey: "user_id" });
sequelize.sync();

export default sequelize;
