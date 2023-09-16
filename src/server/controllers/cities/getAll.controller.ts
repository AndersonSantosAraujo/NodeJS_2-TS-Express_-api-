import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { IQueryProps } from "../../interfaces";
import { validation } from "../../shared/middlewares";

// Middlewares ->
export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().optional().moreThan(0),
      limit: yup.number().optional().moreThan(0),
      filter: yup.string().optional(),
    })
  ),
}));
// <- Middlewares

export const getAll: RequestHandler = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  // Temp Res ->
  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", 1);
  // <- Temp Res

  return res.status(StatusCodes.OK).json(res);
};
