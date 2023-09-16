import { ICity } from "../database/models";

export interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export interface IParamProps {
  id?: number;
}

export interface IBodyProps extends Omit<ICity, "id"> {}
