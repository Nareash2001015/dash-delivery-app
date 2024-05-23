import express, { Express } from "express";
import { CLIENT_BASE_URL, PORT } from "./config";
import sequelize from "./database/connectDB";
import authRoute from "./routes/auth";

const cors = require("cors");
const app: Express = express();

const corsOptions = {
  origin: CLIENT_BASE_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
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
