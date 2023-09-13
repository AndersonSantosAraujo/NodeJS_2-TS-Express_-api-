import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { ICity, IFilter } from "../../interfaces";
import { validation } from "../../shared/middlewares";

// Middlewares ->
export const createValidation = validation((getSchema) => ({
  body: getSchema<ICity>(
    yup.object().shape({
      name: yup.string().required().min(3),
    })
  ),
  query: getSchema<IFilter>(
    yup.object().shape({
      filter: yup.string().optional().min(3),
    })
  ),
}));
// <- Middlewares

export const create: RequestHandler = async (
  req: Request<{}, {}, ICity>,
  res: Response
) => {
  return res.sendStatus(StatusCodes.CREATED);
};
