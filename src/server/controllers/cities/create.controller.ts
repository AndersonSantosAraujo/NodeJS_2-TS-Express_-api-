import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ICity } from "../../interfaces";

export const create = (req: Request<{}, {}, ICity>, res: Response) => {
  console.log(req.body);

  return res.sendStatus(StatusCodes.CREATED);
};
