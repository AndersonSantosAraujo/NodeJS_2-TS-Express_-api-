import { TableNames } from "../../../enums";
import { ICity } from "../../models";
import { Knex } from "../../knex";

export const create = async (
  city: Omit<ICity, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(TableNames.city).insert(city).returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao tentar cadastrar registro!");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao tentar cadastrar registro!");
  }
};
