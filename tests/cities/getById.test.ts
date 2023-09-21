import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - GetById", () => {
  // Test 1 ->
  it("Buscar cidade por ID", async () => {
    const res_ = await testServer.post("/cities").send({
      name: "Diadema",
    });

    expect(res_.statusCode).toEqual(StatusCodes.CREATED);

    const res = await testServer.get(`/cities/${res_.body}`).send();

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty("name");
  });
  // <- Test 1

  // Test 2 ->
  it("Tentar buscar cidade que não exista", async () => {
    const res = await testServer.get("/cities/99999").send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
  // <- Test 2
});
