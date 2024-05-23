import {
  CreationOptional,
  DataTypes,
  Model,
  Optional,
  Sequelize,
} from "sequelize";
import { HOSTNAME, DATABASE, USERNAME, PASSWORD } from "../../config";
import { UserAttributes } from "../../types";

const sequelize: Sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOSTNAME,
  dialect: "postgres",
});

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
  declare email: string;
  declare password: string;
  declare role: string
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
      unique: true
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'customer'],
      defaultValue: 'customer',
    }
  },
  {
    tableName: "user",
    sequelize: sequelize, // this bit is important
  }
);
sequelize.sync();

export default User;