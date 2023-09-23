import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { jwtToken } from "../services";

export const authenticator: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: "Usuário não autenticado!" },
    });
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: "Usuário não autenticado!" },
    });
  }

  const jwtData = jwtToken.verify(token);

  if (jwtData === "JWT_SECRET_NOT_FOUND") {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: "Erro ao tentar verificar o token!" },
    });
  } else if (jwtData === "INVALID_TOKEN") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: "Usuário não autenticado!" },
    });
  }

  req.headers.userID = jwtData.uid.toString();

  return next();
};
