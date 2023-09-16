import { TableNames } from "../../enums";
import { Knex } from "../knex";

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(TableNames.city).where("id", "=", id).del();

    if (result > 0) return;

    return new Error("Erro ao tentar apagar registro!");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao tentar apagar registro!");
  }
};
