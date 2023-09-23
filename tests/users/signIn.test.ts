import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Users - SignIn", () => {
  beforeAll(async () => {
    await testServer.post("/signup").send({
      name: "Anderson",
      email: "anderson@gmail.com",
      password: "123456",
    });
  });

  // Test 1 ->
  it("Faz o login", async () => {
    const res = await testServer.post("/signin").send({
      email: "anderson@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty("accessToken");
  });
  // <- Test 1

  // Test 2 ->
  it("Tenta fazer login com senha errada", async () => {
    const res = await testServer.post("/signin").send({
      email: "anderson@gmail.com",
      password: "0044003300",
    });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });
  // <- Test 2

  // Test 3 ->
  it("Tenta fazer login com e-mail errado", async () => {
    const res = await testServer.post("/signin").send({
      email: "teste@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty("errors.default");
  });
  // <- Test 3

  // Test 4 ->
  it("Tenta fazer login sem senha", async () => {
    const res = await testServer.post("/signin").send({
      email: "anderson@gmail.com",
      password: "",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.password");
  });
  // <- Test 4

  // Test 5 ->
  it("Tenta fazer login sem e-mail", async () => {
    const res = await testServer.post("/signin").send({
      email: "",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });
  // <- Test 5
});
