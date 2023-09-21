import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - Update", () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const res = await testServer.post("/cities").send({
      name: "São Paulo",
    });

    cityId = res.body;
  });

  // Test 1 ->
  it("Atualiza um registro de pessoa", async () => {
    const res_ = await testServer.post("/people").send({
      fullname: "Anderson S A",
      email: "anderson@anderson.com",
      cityId: cityId,
    });

    expect(res_.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res_.body).toEqual("number");

    const res = await testServer.put(`/people/${res_.body}`).send({
      fullname: "Anderson",
      email: "anderson@anderson.com",
      cityId: cityId,
    });

    expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  // <- Test 1

  // Test 2 ->
  it("Tenta atualizar um registro de pessoa que não exista", async () => {
    const res = await testServer.put("/people/99999").send({
      fullname: "Anderson",
      email: "anderson@anderson.com",
      cityId: cityId,
    });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
  // <- Test 2
});
