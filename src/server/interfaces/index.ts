import { ICity, IPeople, IUser } from "../database/models";

export interface IQueryPropsCity {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export interface IQueryPropsPeople {
  page?: number;
  limit?: number;
  filter?: string;
}

export interface IParamProps {
  id?: number;
}

export interface IBodyPropsCity extends Omit<ICity, "id"> {}

export interface IBodyPropsPeople extends Omit<IPeople, "id"> {}

export interface IBodyPropsUser extends Omit<IUser, "id"> {}

export interface IBodyPropsUserT extends Omit<IUser, "id" | "name"> {}
