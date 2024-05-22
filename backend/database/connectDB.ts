import User from "./models/user";
import Shipment from "./models/shipment";
import { HOSTNAME, DATABASE, USERNAME, PASSWORD } from "../config";
import { Sequelize } from "sequelize";

// There is a problem in Sequelize this imports 'undefined' when I use in other modules so I added this to all related files (sequelize duplicated)
const sequelize: Sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOSTNAME,
  dialect: "postgres",
});

// Assciations
User.hasMany(Shipment, { foreignKey: "user_id" });

export default sequelize;
