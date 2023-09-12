import { server } from "./server/server";

server.listen(3333, () => {
  console.log("Server running on http://localhost:3333/");
});
