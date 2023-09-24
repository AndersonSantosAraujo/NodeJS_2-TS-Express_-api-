import express from "express";
import cors from "cors";
import "dotenv/config";
import "./shared/services/translations-yup.service";
import { router } from "./routes";
import favicon from "serve-favicon";
import path from "path";

const server = express();

server.use(favicon(path.join(__dirname, "public", "favicon.ico")));

server.use(
  cors({
    origin: process.env.ENABLED_CORS?.split(";") || [],
  })
);

server.use(express.json());

server.use(router);

export { server };
