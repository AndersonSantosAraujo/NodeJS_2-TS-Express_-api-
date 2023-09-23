import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { IBodyPropsUserT } from "../../interfaces";
import { usersProvider } from "../../database/providers/users";

// Middlewares ->
export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyPropsUserT>(
    yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required(),
    })
  ),
}));
// <- Middlewares

export const signIn = async (
  req: Request<{}, {}, IBodyPropsUserT>,
  res: Response
) => {
  const { email, password } = req.body;

  const result = await usersProvider.getByEmail(email);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são inválidos",
      },
    });
  }

  if (password !== result.password) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são inválidos",
      },
    });
  } else {
    return res.status(StatusCodes.OK).json({ accessToken: "1234.5678.9012" });
  }
};
