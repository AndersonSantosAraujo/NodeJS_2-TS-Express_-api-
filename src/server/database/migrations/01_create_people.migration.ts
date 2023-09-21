import { Knex } from "knex";
import { TableNames } from "../../enums";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TableNames.people, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("fullname").index().notNullable();
      table.string("email").unique().notNullable();
      table
        .bigInteger("cityId")
        .index()
        .notNullable()
        .references("id")
        .inTable(TableNames.city)
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      table.comment("Tabela usada para armazenar pessoas no sistema.");
    })
    .then(() => {
      console.log(`# Tabela Criada: ${TableNames.people}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TableNames.people).then(() => {
    console.log(`# Tabela Descartada: ${TableNames.people}`);
  });
}
