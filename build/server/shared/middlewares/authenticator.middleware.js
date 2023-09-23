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
exports.authenticator = void 0;
const http_status_codes_1 = require("http-status-codes");
const authenticator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: { default: "Usuário não autenticado!" },
        });
    }
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: { default: "Usuário não autenticado!" },
        });
    }
    if (token !== "1234.5678.9012") {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: { default: "Usuário não autenticado!" },
        });
    }
    return next();
});
exports.authenticator = authenticator;
