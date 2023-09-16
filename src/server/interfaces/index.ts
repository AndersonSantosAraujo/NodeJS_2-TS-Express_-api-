import { ICity } from "../database/models";

export interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export interface IParamProps {
  id?: number;
}

export interface IBodyProps extends Omit<ICity, "id"> {}
