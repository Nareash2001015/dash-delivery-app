import express, { Express } from "express";
import { PORT } from "./config";
import sequelize from "./database/connectDB";

const cors = require("cors");
const app: Express = express();

app.use(cors());
app.use(express.json());

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🔥`);
  });
} catch (error) {
  console.log(error);
}

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
