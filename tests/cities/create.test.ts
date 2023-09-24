import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - Create", () => {
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
  it("Criar um registro de cidade", async () => {
    const res = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Diadema",
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("number");
  });
  // <- Test 1

  // Test 2 ->
  it("Tentar criar um registro de cidade com nome curto", async () => {
    const res = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Di",
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.name");
  });
  // <- Test 2

  // Test 3 ->
  it("Tenta criar um registro de cidade sem token de acesso", async () => {
    const res = await testServer.post("/cities").send({
      name: "Diadema",
    });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });
  // <- Test 3
});
