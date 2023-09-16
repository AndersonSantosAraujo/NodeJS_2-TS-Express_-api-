export interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export interface IParamProps {
  id?: number;
}

export interface ICity {
  id: number;
  name: string;
}

export interface IBodyProps extends Omit<ICity, "id"> {}
