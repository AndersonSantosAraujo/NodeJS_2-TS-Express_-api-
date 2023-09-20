import { TableNames } from "../../../enums";
import { IPeople } from "../../models";
import { Knex } from "../../knex";

export const getById = async (id: number): Promise<IPeople | Error> => {
  try {
    const result = await Knex(TableNames.people)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) return result;

    return new Error("Registro não encontrado!");
  } catch (error) {
    console.log(error);
    return new Error("Registro não encontrado!");
  }
};
