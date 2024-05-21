import { Model, DataTypes } from "sequelize";
import sequelize from "../connectDB";

class User extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
}

export default User;
