import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { IParamProps, IBodyPropsPeople } from "../../interfaces";
import { peopleProvider } from "../../database/providers/people";

// Middlewares ->
export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyPropsPeople>(
    yup.object().shape({
      fullname: yup.string().required().min(3),
      email: yup.string().required().email(),
      cityId: yup.number().integer().required(),
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
  req: Request<IParamProps, {}, IBodyPropsPeople>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parâmetro 'id' precisa ser informado.",
      },
    });
  }

  const result = await peopleProvider.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
