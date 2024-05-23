import { NextFunction, Request, Response } from "express";
import { LoginDetails, UserAttributes } from "../types";

module.exports = function (req: Request, res: Response, next: NextFunction) {
  function validEmail(email: string): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  function validPassword(password: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@._#$!%*?&^])[A-Za-z\d@._#$!%*?&^]{8,40}$/.test(password);
  }

  if (req.path === "/register") {
    const registrationDetails: UserAttributes = req.body;

    if (![registrationDetails.email, registrationDetails.name, registrationDetails.password, registrationDetails.address].every(Boolean)) {
      return res.status(500).send({
        message: "Missing Fields",
      });
    } else if (!validEmail(registrationDetails.email)) {
      return res.status(500).send({
        message: "Invalid Email",
      });
    } else if (!validPassword(registrationDetails.password)) {
      return res.status(500).send({
        message: "Invalid Password",
      });
    }
  } else if (req.path === "/login") {
    const loginDetails: LoginDetails = req.body;
    if (![loginDetails.email, loginDetails.password].every(Boolean)) {
      return res.status(500).send({
        message: "Missing Credentials",
      });
    } else if (!validEmail(loginDetails.email)) {
      return res.status(500).send({
        message: "Invalid Email",
      });
    } else if (!validPassword(loginDetails.password)) {
      return res.status(500).send({
        message: "Invalid Password",
      });
    }
  }

  next();
};
