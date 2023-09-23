import { TableNames } from "../../../enums";
import { IUser } from "../../models";
import { Knex } from "../../knex";

export const getByEmail = async (email: string): Promise<IUser | Error> => {
  try {
    const result = await Knex(TableNames.user)
      .select("*")
      .where("email", "=", email)
      .first();

    if (result) return result;

    return new Error("Registro não encontrado!");
  } catch (error) {
    console.log(error);
    return new Error("Registro não encontrado!");
  }
};
