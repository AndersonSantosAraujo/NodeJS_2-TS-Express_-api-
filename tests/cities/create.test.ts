import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - Create", () => {
  // Test 1 ->
  it("Criar um registro de cidade", async () => {
    const res = await testServer.post("/cities").send({
      name: "Diadema",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("number");
  });
  // <- Test 1

  // Test 2 ->
  it("Tentar criar um registro de cidade com nome curto", async () => {
    const res = await testServer.post("/cities").send({
      name: "Di",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.name");
  });
  // <- Test 2
});
