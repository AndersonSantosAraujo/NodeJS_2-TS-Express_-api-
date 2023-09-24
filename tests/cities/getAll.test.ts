import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - GetAll", () => {
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
  it("Buscar todos os registros de cidades", async () => {
    const res_ = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Diadema",
      });

    expect(res_.statusCode).toEqual(StatusCodes.CREATED);

    const res = await testServer
      .get("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(res.header["x-total-count"])).toBeGreaterThan(0);
    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body.length).toBeGreaterThan(0);
  });
  // <- Test 1

  // Test 2 ->
  it("Tenta buscar todos os registros de cidades sem token de acesso", async () => {
    const res_ = await testServer
      .post("/cities")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Diadema",
      });

    expect(res_.statusCode).toEqual(StatusCodes.CREATED);

    const res = await testServer.get("/cities").send();

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });
  // <- Test 2
});
