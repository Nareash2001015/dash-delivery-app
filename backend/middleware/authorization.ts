import { Response, Request } from "express";
import { JWT_SECRET } from "../config";

const jwt = require("jsonwebtoken");

module.exports = async (req: Request, res: Response, next: any) => {
  const token: string | undefined = req.header("token");
  if (!token) {
    res.status(403).send({
      error: "Unauthorized user",
    });
  }
  try {
    const verify = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res.status(403).send(error);
  }
};
