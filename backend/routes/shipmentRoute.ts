import express, { Router, Request, Response } from "express";
import { GetUserAuthInfoRequest, ShipmentAttributes } from "../types";
import Shipment from "../database/models/shipment";
import User from "../database/models/user";

const router: Router = express.Router();
const authorization = require("../middleware/authorization");

router.get(
  "/all",
  authorization,
  async (req: GetUserAuthInfoRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(403).send({
          error: "User not authenticated",
        });
      }
      const shipmentList: Promise<Shipment[]> = Shipment.findAll();
      return res.status(200).send(shipmentList);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

router.post(
  "/",
  authorization,
  async (req: GetUserAuthInfoRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(403).send({
          error: "User not authenticated",
        });
      }
      const shipmentAttributes: ShipmentAttributes = req.body;
      await Shipment.create(shipmentAttributes)
        .then((shipment) => {
          // Create JWT access token
          return res.status(202).send({
            shipment: shipment.id,
          });
        })
        .catch((error) => {
          return res.status(400).send(error);
        });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

router.get(
  "/user/:id",
  authorization,
  async (req: GetUserAuthInfoRequest, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      if (!req.user) {
        return res.status(403).send({
          error: "User not authenticated",
        });
      }
      const user: User | null = await User.findByPk(id);
      if (!user) {
        return res.status(401).send({
          message: "The user does not exists",
        });
      }
      const shipmentList: Promise<Shipment[]> = Shipment.findAll(
        {
            group: "userId",
            where : {
                userId: id
            }
        }
      )
      res.status(200).send(shipmentList);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

export default router;
