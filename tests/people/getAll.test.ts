import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - GetAll", () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const res = await testServer.post("/cities").send({
      name: "São Paulo",
    });

    cityId = res.body;
  });

  // Test 1 ->
  it("Buscar todos os registros de pessoas", async () => {
    const res_ = await testServer.post("/people").send({
      fullname: "Anderson S A",
      email: "anderson@anderson.com",
      cityId: cityId,
    });

    expect(res_.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res_.body).toEqual("number");

    const res = await testServer.get("/people").send();

    expect(Number(res.header["x-total-count"])).toBeGreaterThan(0);
    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body.length).toBeGreaterThan(0);
  });
  // <- Test 1
});
