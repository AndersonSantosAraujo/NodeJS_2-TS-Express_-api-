import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { IBodyPropsUserT } from "../../interfaces";
import { usersProvider } from "../../database/providers/users";
import { jwtToken, passwordCrypto } from "../../shared/services";

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

  const user = await usersProvider.getByEmail(email);

  if (user instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são inválidos",
      },
    });
  }

  const passwordMatch = await passwordCrypto.verifyPassword(
    password,
    user.password
  );

  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são inválidos",
      },
    });
  } else {
    const accessToken = jwtToken.sign({ uid: user.id });

    if (accessToken === "JWT_SECRET_NOT_FOUND") {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: "Erro ao tentar gerar o token de acesso!",
        },
      });
    }

    return res.status(StatusCodes.OK).json({ accessToken });
  }
};
