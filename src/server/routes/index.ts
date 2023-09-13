import { Router } from "express";
import { citiesController } from "../controllers/";

const router = Router();

// Routes ->
router.get("/", (_, res) => {
  return res.send({
    title: "NodeJS (Typescript + Express) API",
    version: "0.0.1",
  });
});

router.post(
  "/cities",
  citiesController.createValidation,
  citiesController.create
);

router.get(
  "/cities",
  citiesController.getAllValidation,
  citiesController.getAll
);
// <- Routes

export { router };
