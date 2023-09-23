import { Knex } from "knex";
import { TableNames } from "../../enums";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TableNames.user, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name").notNullable().checkLength(">", 3);
      table.string("email").index().unique().notNullable().checkLength(">", 5);
      table.string("senha").notNullable().checkLength(">", 6);

      table.comment("Tabela usada para armazenar usuários no sistema.");
    })
    .then(() => {
      console.log(`# Tabela Criada: ${TableNames.user}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TableNames.user).then(() => {
    console.log(`# Tabela Descartada: ${TableNames.user}`);
  });
}
