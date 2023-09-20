import { TableNames } from "../../../enums";
import { IPeople } from "../../models";
import { Knex } from "../../knex";

export const updateById = async (
  id: number,
  people: Omit<IPeople, "id">
): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(TableNames.city)
      .where("id", "=", people.cityId)
      .count<[{ count: number }]>("* as count");

    if (count === 0) {
      return new Error("A cidade usada no cadastro não foi encontrada!");
    }

    const result = await Knex(TableNames.people)
      .update(people)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao tentar atualizar registro!");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao tentar atualizar registro!");
  }
};
