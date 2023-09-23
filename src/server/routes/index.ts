import { Router } from "express";
import {
  citiesController,
  peopleController,
  usersController,
} from "../controllers/";

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

// People ->
router.post(
  "/people",
  peopleController.createValidation,
  peopleController.create
);

router.get(
  "/people",
  peopleController.getAllValidation,
  peopleController.getAll
);

router.get(
  "/people/:id",
  peopleController.getByIdValidation,
  peopleController.getById
);

router.put(
  "/people/:id",
  peopleController.updateByIdValidation,
  peopleController.updateById
);

router.delete(
  "/people/:id",
  peopleController.deleteByIdValidation,
  peopleController.deleteById
);
//<- People

// Users ->
router.post(
  "/signup",
  usersController.signUpValidation,
  usersController.signUp
);

router.post(
  "/signin",
  usersController.signInValidation,
  usersController.signIn
);
//<- Users

// <- Routes

export { router };
