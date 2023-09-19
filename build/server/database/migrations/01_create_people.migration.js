"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const enums_1 = require("../../enums");
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        knex.schema
            .createTable(enums_1.TableNames.people, (table) => {
            table.bigIncrements("id").primary().index();
            table.string("fullname").index().notNullable();
            table.string("email").unique().notNullable();
            table
                .bigInteger("cityId")
                .index()
                .notNullable()
                .references("id")
                .inTable(enums_1.TableNames.city)
                .onUpdate("CASCADE")
                .onDelete("RESTRICT");
            table.comment("Tabela usada para armazenar pessoas no sistema.");
        })
            .then(() => {
            console.log(`# Tabela Criada: ${enums_1.TableNames.people}`);
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable(enums_1.TableNames.people).then(() => {
            console.log(`# Tabela Descartada: ${enums_1.TableNames.people}`);
        });
    });
}
exports.down = down;
