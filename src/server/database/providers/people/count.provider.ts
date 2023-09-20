import { TableNames } from "../../../enums";
import { Knex } from "../../knex";

export const count = async (filter = ""): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(TableNames.people)
      .where("fullname", "like", `%${filter}%`)
      .count<[{ count: number }]>("* as count");

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error(
      "Erro ao tentar consultar a quantidade total de registros!"
    );
  } catch (error) {
    console.log(error);
    return new Error(
      "Erro ao tentar consultar a quantidade total de registros!"
    );
  }
};
