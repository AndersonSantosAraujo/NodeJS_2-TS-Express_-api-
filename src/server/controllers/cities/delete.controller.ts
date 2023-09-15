import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { IParamProps } from "../../interfaces";

// Middlewares ->
export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));
// <- Middlewares

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  // Temp Data ->
  if (Number(req.params.id) === 99999)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Registro não encontrado!",
      },
    });
  // <- Temp Data

  return res.status(StatusCodes.NO_CONTENT).send();
};
