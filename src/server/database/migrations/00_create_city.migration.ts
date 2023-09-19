import { Knex } from "knex";
import { TableNames } from "../../enums";

export async function up(knex: Knex): Promise<void> {
  knex.schema
    .createTable(TableNames.city, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name", 150).checkLength("<=", 150).index().notNullable();

      table.comment("Tabela usada para armazenar cidades no sistema.");
    })
    .then(() => {
      console.log(`# Tabela Criada: ${TableNames.city}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TableNames.city).then(() => {
    console.log(`# Tabela Descartada: ${TableNames.city}`);
  });
}
