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
exports.create = void 0;
const enums_1 = require("../../../enums");
const knex_1 = require("../../knex");
const services_1 = require("../../../shared/services");
const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield services_1.passwordCrypto.hashPassword(user.password);
        const [result] = yield (0, knex_1.Knex)(enums_1.TableNames.user)
            .insert(Object.assign(Object.assign({}, user), { password: hashedPassword }))
            .returning("id");
        if (typeof result === "object") {
            return result.id;
        }
        else if (typeof result === "number") {
            return result;
        }
        return new Error("Erro ao tentar cadastrar registro!");
    }
    catch (error) {
        console.log(error);
        return new Error("Erro ao tentar cadastrar registro!");
    }
});
exports.create = create;
