import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { IBodyProps } from "../../interfaces";
import { validation } from "../../shared/middlewares";
import { citiesProvider } from "../../database/providers";

// Middlewares ->
export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3).max(150),
    })
  ),
}));
// <- Middlewares

export const create: RequestHandler = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const result = await citiesProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
