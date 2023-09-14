import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { IParamProps } from "../../interfaces";

// Middlewares ->
export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().optional().moreThan(0),
    })
  ),
}));
// <- Middlewares

export const getById = async (req: Request<IParamProps>, res: Response) => {
  console.log(req.params);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("GET BY ID: Não implementado!");
};
