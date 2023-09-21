import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - GetById", () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const res = await testServer.post("/cities").send({
      name: "São Paulo",
    });

    cityId = res.body;
  });

  // Test 1 ->
  it("Buscar pessoa por ID", async () => {
    const res_ = await testServer.post("/people").send({
      fullname: "Anderson S A",
      email: "anderson@anderson.com",
      cityId: cityId,
    });

    expect(res_.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res_.body).toEqual("number");

    const res = await testServer.get(`/people/${res_.body}`).send();

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty("fullname");
  });
  // <- Test 1

  // Test 2 ->
  it("Tentar buscar pessoa que não exista", async () => {
    const res = await testServer.get("/people/99999").send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
  // <- Test 2
});
