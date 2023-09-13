import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { ICity, IFilter } from "../../interfaces";

const bodyValidation: yup.Schema<ICity> = yup.object().shape({
  name: yup.string().required().min(3),
});

// Middleware ->
export const createBodyValidator: RequestHandler = async (req, res, next) => {
  // Yup Validation ->
  try {
    await bodyValidation.validate(req.body, {
      abortEarly: false,
    });

    return next();
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (!error.path) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors,
    });
  }
  // <- Yup Validation
};
// <- Middleware

const queryValidation: yup.Schema<IFilter> = yup.object().shape({
  filter: yup.string().required().min(3),
});

// Middleware ->
export const createQueryValidator: RequestHandler = async (req, res, next) => {
  // Yup Validation ->
  try {
    await queryValidation.validate(req.query, {
      abortEarly: false,
    });

    return next();
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (!error.path) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors,
    });
  }
  // <- Yup Validation
};
// <- Middleware

export const create: RequestHandler = async (
  req: Request<{}, {}, ICity>,
  res: Response
) => {
  console.log(req.body);

  return res.sendStatus(StatusCodes.CREATED);
};
