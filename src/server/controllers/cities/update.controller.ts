import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { IParamProps, IBodyPropsCity } from "../../interfaces";
import { citiesProvider } from "../../database/providers/cities";

// Middlewares ->
export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyPropsCity>(
    yup.object().shape({
      name: yup.string().required().min(3),
    })
  ),
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().optional().moreThan(0),
    })
  ),
}));
// <- Middlewares

export const updateById = async (
  req: Request<IParamProps, {}, IBodyPropsCity>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parâmetro 'id' precisa ser informado.",
      },
    });
  }

  const result = await citiesProvider.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
