import { Router } from "express";
import { citiesController } from "../controllers/";

const router = Router();

// Routes ->
// Index ->
router.get("/", (_, res) => {
  return res.send({
    title: "NodeJS (Typescript + Express) API",
    version: "0.0.1",
  });
});
// <- Index

// Cities ->
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

router.get(
  "/cities/:id",
  citiesController.getByIdValidation,
  citiesController.getById
);

router.put(
  "/cities/:id",
  citiesController.updateByIdValidation,
  citiesController.updateById
);

router.delete(
  "/cities/:id",
  citiesController.deleteByIdValidation,
  citiesController.deleteById
);
//<- Cities

// <- Routes

export { router };
