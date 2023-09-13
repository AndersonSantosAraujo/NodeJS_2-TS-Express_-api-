import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { ICity } from "../../interfaces";

const bodyValidation: yup.Schema<ICity> = yup.object().shape({
  name: yup.string().required().min(3),
});

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  let validateData: ICity | undefined = undefined;

  // Yup Validation ->
  try {
    validateData = await bodyValidation.validate(req.body);
  } catch (error) {
    const yupError = error as yup.ValidationError;

    return res.json({
      errors: {
        default: yupError.message,
      },
    });
  }
  // <- Yup Validation

  console.log(validateData);

  return res.sendStatus(StatusCodes.CREATED);
};
