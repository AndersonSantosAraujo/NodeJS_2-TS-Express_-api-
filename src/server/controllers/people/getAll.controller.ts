import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { IQueryPropsPeople } from "../../interfaces";
import { validation } from "../../shared/middlewares";
import { peopleProvider } from "../../database/providers/people";

// Middlewares ->
export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryPropsPeople>(
    yup.object().shape({
      page: yup.number().optional().moreThan(0),
      limit: yup.number().optional().moreThan(0),
      filter: yup.string().optional(),
    })
  ),
}));
// <- Middlewares

export const getAll: RequestHandler = async (
  req: Request<{}, {}, {}, IQueryPropsPeople>,
  res: Response
) => {
  const result = await peopleProvider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.filter || ""
  );
  const count = await peopleProvider.count(req.query.filter);

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
