import express, { Express } from "express";
import { PORT } from "./config";
import sequelize from "./database/connectDB";
import authRoute from "./routes/auth";
import { error } from "console";

const cors = require("cors");
const app: Express = express();

app.use(cors());
app.use(express.json());

// Adding routes here
app.use("/auth", authRoute);

// Adding backend listener
try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🔥`);
  });
} catch (error) {
  console.log(error);
}

// Establish database connection
sequelize
  .authenticate()
  .then(async (): Promise<void> => {
    console.log("Connection has been established successfully.");
  })
  .catch((err): void => {
    console.error("Unable to connect to the database:", err);
  });
