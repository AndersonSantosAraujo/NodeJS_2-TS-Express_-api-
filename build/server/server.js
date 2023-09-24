"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
require("./shared/services/translations-yup.service");
const routes_1 = require("./routes");
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const path_1 = __importDefault(require("path"));
const server = (0, express_1.default)();
exports.server = server;
server.use((0, serve_favicon_1.default)(path_1.default.join(__dirname, "public", "favicon.ico")));
server.use((0, cors_1.default)({
    origin: ((_a = process.env.ENABLED_CORS) === null || _a === void 0 ? void 0 : _a.split(";")) || [],
}));
server.use(express_1.default.json());
server.use(routes_1.router);
