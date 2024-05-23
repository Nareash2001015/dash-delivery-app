import {
  Model,
  DataTypes,
  CreationOptional,
  Sequelize,
  Optional,
} from "sequelize";
import { HOSTNAME, DATABASE, USERNAME, PASSWORD } from "../../config";
import { ShipmentAttributes } from "../../types";

const sequelize: Sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOSTNAME,
  dialect: "postgres",
});

type ShipmentCreationAttributes = Optional<ShipmentAttributes, "id">;

class Shipment extends Model<ShipmentAttributes, ShipmentCreationAttributes> {
  declare id: CreationOptional<number>;
  declare senderName: string;
  declare senderAddress: string;
  declare recipientName: string;
  declare recipientAddress: string;
  declare packageDescription: string;
  declare packageWeight: string;
  declare shipmentStatus: string;
}

Shipment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    senderName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    senderAddress: {
      type: new DataTypes.STRING(128),
      allowNull: false,
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
      defaultValue: "customer",
    }
  },
  {
    tableName: "shipment",
    sequelize: sequelize, // this bit is important
  }
);
sequelize.sync();

export default Shipment;
