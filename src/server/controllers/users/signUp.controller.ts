import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { IBodyPropsUser } from "../../interfaces";
import { validation } from "../../shared/middlewares";
import { usersProvider } from "../../database/providers/users";

// Middlewares ->
export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyPropsUser>(
    yup.object().shape({
      name: yup.string().required().min(3),
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(6),
    })
  ),
}));
// <- Middlewares

export const signUp: RequestHandler = async (
  req: Request<{}, {}, IBodyPropsUser>,
  res: Response
) => {
  const result = await usersProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
