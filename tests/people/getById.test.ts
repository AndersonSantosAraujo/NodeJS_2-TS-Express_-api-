import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - GetById", () => {
  let accessToken = "";

  beforeAll(async () => {
    await testServer.post("/signup").send({
      name: "Test",
      email: "test@test.com",
      password: "123456",
    });

    const res = await testServer.post("/signin").send({
      email: "test@test.com",
      password: "123456",
    });

    accessToken = res.body.accessToken;
  });

  let cityId: number | undefined = undefined;

  beforeAll(async () => {
    const res = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "São Paulo",
      });

    cityId = res.body;
  });

  // Test 1 ->
  it("Buscar pessoa por ID", async () => {
    const res_ = await testServer
      .post("/people")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullname: "Anderson S A",
        email: "anderson@anderson.com",
        cityId: cityId,
      });

    expect(res_.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res_.body).toEqual("number");

    const res = await testServer
      .get(`/people/${res_.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty("fullname");
  });
  // <- Test 1

  // Test 2 ->
  it("Tentar buscar pessoa que não exista", async () => {
    const res = await testServer
      .get("/people/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
  // <- Test 2

  // Test 3 ->
  it("Tenta buscar pessoa por ID sem token de acesso", async () => {
    const res_ = await testServer
      .post("/people")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        fullname: "Anderson S A",
        email: "anderson@gmail.com",
        cityId: cityId,
      });

    expect(res_.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res_.body).toEqual("number");

    const res = await testServer.get(`/people/${res_.body}`).send();

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });
  // <- Test 3
});
