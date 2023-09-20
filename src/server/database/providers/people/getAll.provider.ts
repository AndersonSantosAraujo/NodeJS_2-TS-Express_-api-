import { TableNames } from "../../../enums";
import { IPeople } from "../../models";
import { Knex } from "../../knex";

export const getAll = async (
  page: number,
  limit: number,
  filter: string
): Promise<IPeople[] | Error> => {
  try {
    const result = await Knex(TableNames.people)
      .select("*")
      .where("fullname", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao tentar consultar registros!");
  }
};
