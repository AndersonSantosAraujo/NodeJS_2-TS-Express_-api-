import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - GetAll", () => {
  // Test 1 ->
  it("Buscar todos os registros de cidades", async () => {
    const res_ = await testServer.post("/cities").send({
      name: "Diadema",
    });

    expect(res_.statusCode).toEqual(StatusCodes.CREATED);

    const res = await testServer.get("/cities").send();

    expect(Number(res.header["x-total-count"])).toBeGreaterThan(0);
    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body.length).toBeGreaterThan(0);
  });
  // <- Test 1
});
