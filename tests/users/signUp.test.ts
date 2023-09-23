import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Users - SignUp", () => {
  // Test 1 ->
  it("Criar um registro de usuário", async () => {
    const res = await testServer.post("/signup").send({
      name: "Anderson",
      email: "anderson@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("number");
  });
  // <- Test 1

  // Test 2 ->
  it("Tentar criar um registro de usuário com e-mail já inserido", async () => {
    const res_ = await testServer.post("/signup").send({
      name: "Anderson",
      email: "anderson.teste@gmail.com",
      password: "123456",
    });

    expect(res_.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res_.body).toEqual("number");

    const res = await testServer.post("/signup").send({
      name: "Anderson",
      email: "anderson.teste@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
  // <- Test 2

  // Test 3 ->
  it("Tentar criar um registro de usuário sem e-mail", async () => {
    const res = await testServer.post("/signup").send({
      name: "Anderson",
      email: "",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });
  // <- Test 3

  // Test 4 ->
  it("Tentar criar um registro de usuário sem nome", async () => {
    const res = await testServer.post("/signup").send({
      name: "",
      email: "anderson.teste@anderson.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.name");
  });
  // <- Test 4

  // Test 5 ->
  it("Tentar criar um registro de usuário sem senha", async () => {
    const res = await testServer.post("/signup").send({
      name: "Anderson",
      email: "anderson.teste@anderson.com",
      password: "",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.password");
  });
  // <- Test 5

  // ---
  // Test 6 ->
  it("Tentar criar um registro de usuário com e-mail inválido", async () => {
    const res = await testServer.post("/signup").send({
      name: "Anderson",
      email: "anderson.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });
  // <- Test 6

  // Test 7 ->
  it("Tentar criar um registro de usuário com nome curto", async () => {
    const res = await testServer.post("/signup").send({
      name: "A",
      email: "anderson.teste@anderson.com",
      password: "123456",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.name");
  });
  // <- Test 7

  // Test 8 ->
  it("Tentar criar um registro de usuário com senha curta", async () => {
    const res = await testServer.post("/signup").send({
      name: "Anderson",
      email: "anderson.teste@anderson.com",
      password: "12",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.password");
  });
  // <- Test 8
});
