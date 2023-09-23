import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { IQueryPropsCity } from "../../interfaces";
import { validation } from "../../shared/middlewares";
import { citiesProvider } from "../../database/providers/cities";

// Middlewares ->
export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryPropsCity>(
    yup.object().shape({
      id: yup.number().integer().optional().default(0),
      page: yup.number().optional().moreThan(0),
      limit: yup.number().optional().moreThan(0),
      filter: yup.string().optional(),
    })
  ),
}));
// <- Middlewares

export const getAll: RequestHandler = async (
  req: Request<{}, {}, {}, IQueryPropsCity>,
  res: Response
) => {
  const result = await citiesProvider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.filter || "",
    Number(req.query.id)
  );
  const count = await citiesProvider.count(req.query.filter);

  // Debug ->
  console.log("ID do Usuário -> ", req.headers.userID);
  // <- Debug

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message },
    });
  }

  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", count);

  return res.status(StatusCodes.OK).json(result);
};
