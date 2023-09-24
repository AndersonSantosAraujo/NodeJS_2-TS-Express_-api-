import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - Update", () => {
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
  it("Atualiza um registro de cidade", async () => {
    const res_ = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Diadema",
      });

    expect(res_.statusCode).toEqual(StatusCodes.CREATED);

    const res = await testServer
      .put(`/cities/${res_.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Diad",
      });

    expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  // <- Test 1

  // Test 2 ->
  it("Tenta atualizar um registro de cidade que não exista", async () => {
    const res = await testServer
      .put("/cities/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: "Diadema" });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
  // <- Test 2

  // Test 3 ->
  it("Tenta atualizar um registro de cidade sem token de acesso", async () => {
    const res_ = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Diadema",
      });

    expect(res_.statusCode).toEqual(StatusCodes.CREATED);

    const res = await testServer.put(`/cities/${res_.body}`).send({
      name: "Diad",
    });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });
  // <- Test 3
});
