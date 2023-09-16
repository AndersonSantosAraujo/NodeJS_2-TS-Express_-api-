import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { IBodyProps } from "../../interfaces";
import { validation } from "../../shared/middlewares";

// Middlewares ->
export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
    })
  ),
}));
// <- Middlewares

export const create: RequestHandler = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  //
  return res.status(StatusCodes.CREATED).json(1);
};
