import { Router } from "express";
import {
  citiesController,
  peopleController,
  usersController,
} from "../controllers/";
import { authenticator } from "../shared/middlewares";

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
  authenticator,
  citiesController.createValidation,
  citiesController.create
);

router.get(
  "/cities",
  authenticator,
  citiesController.getAllValidation,
  citiesController.getAll
);

router.get(
  "/cities/:id",
  authenticator,
  citiesController.getByIdValidation,
  citiesController.getById
);

router.put(
  "/cities/:id",
  authenticator,
  citiesController.updateByIdValidation,
  citiesController.updateById
);

router.delete(
  "/cities/:id",
  authenticator,
  citiesController.deleteByIdValidation,
  citiesController.deleteById
);
//<- Cities

// People ->
router.post(
  "/people",
  authenticator,
  peopleController.createValidation,
  peopleController.create
);

router.get(
  "/people",
  authenticator,
  peopleController.getAllValidation,
  peopleController.getAll
);

router.get(
  "/people/:id",
  authenticator,
  peopleController.getByIdValidation,
  peopleController.getById
);

router.put(
  "/people/:id",
  authenticator,
  peopleController.updateByIdValidation,
  peopleController.updateById
);

router.delete(
  "/people/:id",
  authenticator,
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
