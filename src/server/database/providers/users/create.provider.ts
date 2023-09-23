import { TableNames } from "../../../enums";
import { IUser } from "../../models";
import { Knex } from "../../knex";

export const create = async (
  user: Omit<IUser, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(TableNames.user).insert(user).returning("id");

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
