"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("./server/database/knex");
const server_1 = require("./server/server");
const port = process.env.PORT || 3333;
const startServer = () => {
    server_1.server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}/`);
    });
};
if (process.env.IS_LOCALHOST !== "true") {
    knex_1.Knex.migrate
        .latest()
        .then(() => {
        startServer();
    })
        .catch(console.log);
}
else {
    startServer();
}
