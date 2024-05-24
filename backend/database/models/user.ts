import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Optional,
  Sequelize,
} from "sequelize";
import { HOSTNAME, DATABASE, USERNAME, PASSWORD } from "../../config";
import { UserAttributes } from "../../types";
import Shipment from "./shipment";

const sequelize: Sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOSTNAME,
  dialect: "postgres",
});

class User extends Model<
  InferAttributes<User, { omit: "shipments" }>,
  InferCreationAttributes<User, { omit: "shipments" }>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
  declare email: string;
  declare password: string;
  declare role: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare getShipments: HasManyGetAssociationsMixin<Shipment>;
  declare shipments?: Shipment[];
  declare static associations: {
    projects: Association<User, Shipment>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    address: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "customer"],
      defaultValue: "customer",
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "user",
    sequelize: sequelize, // this bit is important
  }
);
sequelize.sync();

export default User;
