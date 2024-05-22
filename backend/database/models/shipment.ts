import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from "sequelize";
import { HOSTNAME, DATABASE, USERNAME, PASSWORD } from "../../config";

const sequelize: Sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOSTNAME,
  dialect: "postgres",
});

class Shipment extends Model {
  public id!: string; // Note that the `null assertion` `!` is required in strict mode.
}

Shipment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
  },
  {
    tableName: "shipment",
    sequelize: sequelize,
  }
);

sequelize.sync();

export default Shipment;
