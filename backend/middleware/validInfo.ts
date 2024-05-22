import { NextFunction, Request, Response } from "express";

module.exports = function (req: Request, res: Response, next: NextFunction) {
  const { email, name, password } = req.body;

  function validEmail(userEmail: string): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    console.log(!email.length);
    if (![email, name, password].every(Boolean)) {
      return res.status(500).send({
        error: "Missing Credentials",
      });
    } else if (!validEmail(email)) {
      return res.status(500).send({
        error: "Invalid Email",
      });
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(500).send({
        error: "Missing Credentials",
      });
    } else if (!validEmail(email)) {
      return res.status(500).send({
        error: "Invalid Email",
      });
    }
  }

  next();
};
