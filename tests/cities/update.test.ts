import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - Update", () => {
  // Test 1 ->
  it("Atualiza um registro de cidade", async () => {
    const res_ = await testServer.post("/cities").send({
      name: "Diadema",
    });

    expect(res_.statusCode).toEqual(StatusCodes.CREATED);

    const res = await testServer.put(`/cities/${res_.body}`).send({
      name: "Diad",
    });

    expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  // <- Test 1

  // Test 2 ->
  it("Tenta atualizar um registro de cidade que não exista", async () => {
    const res = await testServer.put("/cities/99999").send({ name: "Diadema" });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
  // <- Test 2
});
