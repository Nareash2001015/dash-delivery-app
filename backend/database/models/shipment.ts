import {
  Model,
  DataTypes,
  CreationOptional,
  Sequelize,
  Optional,
  HasManyGetAssociationsMixin,
  NonAttribute,
  InferCreationAttributes,
  InferAttributes,
  ForeignKey,
} from "sequelize";
import { HOSTNAME, DATABASE, USERNAME, PASSWORD } from "../../config";
import { ShipmentAttributes } from "../../types";
import User from "./user";

const sequelize: Sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOSTNAME,
  dialect: "postgres",
});

class Shipment extends Model<
  InferAttributes<Shipment>,
  InferCreationAttributes<Shipment>
> {
  declare id: CreationOptional<number>;
  declare recipientName: string;
  declare recipientAddress: string;
  declare packageDescription: string;
  declare packageWeight: string;
  declare shipmentStatus: string;
  declare user: NonAttribute<User>;
  declare getUser: HasManyGetAssociationsMixin<User>;
  declare userId: ForeignKey<User["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Shipment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    recipientName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    recipientAddress: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    packageDescription: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    packageWeight: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    shipmentStatus: {
      type: DataTypes.ENUM,
      values: ["pending", "in transit", "delivered"],
      defaultValue: "pending",
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "shipment",
    sequelize: sequelize, 
  }
);

// Define associations
User.hasMany(Shipment, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'shipment', 
});

Shipment.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'userId',
  as: 'user', 
});

sequelize.sync();

export default Shipment;
