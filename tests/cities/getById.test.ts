import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - GetById", () => {
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

  // Test 1 ->
  it("Buscar cidade por ID", async () => {
    const res_ = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Diadema",
      });

    expect(res_.statusCode).toEqual(StatusCodes.CREATED);

    const res = await testServer
      .get(`/cities/${res_.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty("name");
  });
  // <- Test 1

  // Test 2 ->
  it("Tentar buscar cidade que não exista", async () => {
    const res = await testServer
      .get("/cities/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
  // <- Test 2

  // Test 3 ->
  it("Tenta buscar cidade por ID sem token de acesso", async () => {
    const res_ = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Diadema",
      });

    expect(res_.statusCode).toEqual(StatusCodes.CREATED);

    const res = await testServer.get(`/cities/${res_.body}`).send();

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });
  // <- Test 3
});
