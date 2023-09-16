import { TableNames } from "../../enums";
import { ICity } from "../models";
import { Knex } from "../knex";

export const updateById = async (
  id: number,
  city: Omit<ICity, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(TableNames.city)
      .update(city)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao tentar atualizar registro!");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao tentar atualizar registro!");
  }
};
