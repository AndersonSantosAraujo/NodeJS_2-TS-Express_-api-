import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - Delete", () => {
  // Test 1 ->
  it("Excluir um registro de cidade", async () => {
    const res_ = await testServer.post("/cities").send({
      name: "Diadema",
    });

    expect(res_.statusCode).toEqual(StatusCodes.CREATED);

    const res = await testServer.delete(`/cities/${res_.body}`).send();

    expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  // <- Test 1

  // Test 2 ->
  it("Excluir um registro de cidade que não exista", async () => {
    const res = await testServer.delete("/cities/99999").send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
  // <- Test 2
});
