import express, { Express } from "express";
import { PORT } from "./config";

const app: Express = express();

try{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} 🔥`);
    })
} catch (error) {
    console.log(error)
}