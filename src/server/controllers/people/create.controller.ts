import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { IBodyPropsPeople } from "../../interfaces";
import { validation } from "../../shared/middlewares";
import { peopleProvider } from "../../database/providers/people";

// Middlewares ->
export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyPropsPeople>(
    yup.object().shape({
      fullname: yup.string().required().min(3),
      email: yup.string().required().email(),
      cityId: yup.number().integer().required(),
    })
  ),
}));
// <- Middlewares

export const create: RequestHandler = async (
  req: Request<{}, {}, IBodyPropsPeople>,
  res: Response
) => {
  const result = await peopleProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
