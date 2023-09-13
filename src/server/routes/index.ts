import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (_, res) => {
  return res.send({
    title: "Node Store API",
    version: "0.0.1",
  });
});

router.post("/test/:id", (req, res) => {
  console.log(req.params);

  return res.status(StatusCodes.ACCEPTED).json(req.body);
});

export { router };
