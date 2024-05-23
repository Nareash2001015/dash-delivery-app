import express, { Router, Request, Response } from "express";
import User from "../database/models/user";
import { GetUserAuthInfoRequest } from "../types";

const router: Router = express.Router();
const authorization = require("../middleware/authorization");

router.get(
  "/:id",
  authorization,
  async (req: GetUserAuthInfoRequest, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      if (!req.user) {
        return res.status(403).send({
          error: "User not authenticated",
        });
      }
      const user: User | null = await User.findOne({
        where: { id: id },
      });
      if (!user) {
        return res.status(401).send({
          message: "The user does not exists",
        });
      }
      return res.status(200).json({ 
            id: user.id,
            name: user.name,
            address: user.address,
       });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);


export default router;