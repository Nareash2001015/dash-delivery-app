import { Response, Request, NextFunction } from "express";
import { JWT_SECRET } from "../config";
import { GetUserAuthInfoRequest } from "../types";

const jwt = require("jsonwebtoken");

module.exports = async (req: GetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const authorization: string | undefined = req.header("Authorization");

  if (!authorization) {
    return res.status(403).send({
      message: 'Unauthorized user',
    });
  }

  const token = authorization?.split(" ")[1]; 

  if (!token) {
    res.status(403).send({
      message: "Unauthorized user",
    });
  }
  try {
    const decoded: string = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    // throw(error);
    // res.status(403).send({
    //   message: "Invalid token",
    // });
  }
};
