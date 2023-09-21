import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - Create", () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const res = await testServer.post("/cities").send({
      name: "São Paulo",
    });

    cityId = res.body;
  });

  // Test 1 ->
  it("Criar um registro de pessoa", async () => {
    const res = await testServer.post("/people").send({
      fullname: "Anderson S A",
      email: "anderson@anderson.com",
      cityId: cityId,
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("number");
  });
  // <- Test 1

  // Test 2 ->
  it("Tentar criar um registro de pessoa com nome curto", async () => {
    const res = await testServer.post("/people").send({
      fullname: "An",
      email: "anderson@anderson.com",
      cityId: cityId,
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.fullname");
  });
  // <- Test 2

  // Test 3 ->
  it("Tentar criar um registro de pessoa sem nome", async () => {
    const res = await testServer.post("/people").send({
      fullname: "",
      email: "anderson@anderson.com",
      cityId: cityId,
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.fullname");
  });
  // <- Test 3

  // Test 4 ->
  it("Tentar criar um registro de pessoa com email incorreto", async () => {
    const res = await testServer.post("/people").send({
      fullname: "Anderson",
      email: "anderson.com",
      cityId: cityId,
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });
  // <- Test 4

  // Test 5 ->
  it("Tentar criar um registro de pessoa com e-mail já inserido", async () => {
    const res_ = await testServer.post("/people").send({
      fullname: "Anderson",
      email: "anderson@gmail.com",
      cityId: cityId,
    });

    expect(res_.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res_.body).toEqual("number");

    const res = await testServer.post("/people").send({
      fullname: "Anderson",
      email: "anderson@gmail.com",
      cityId: 1,
    });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
  // <- Test 5

  // Test 6 ->
  it("Tentar criar um registro de pessoa sem email", async () => {
    const res = await testServer.post("/people").send({
      fullname: "Anderson",
      email: "",
      cityId: cityId,
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.email");
  });
  // <- Test 6

  // Test 7 ->
  it("Tentar criar um registro de pessoa com ID de cidade inexistente", async () => {
    const res = await testServer.post("/people").send({
      fullname: "Anderson",
      email: "anderson@anderson.com",
      cityId: 999999,
    });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
  // <- Test 7

  // Test 8 ->
  it("Tentar criar um registro de pessoa sem ID de cidade", async () => {
    const res = await testServer.post("/people").send({
      fullname: "Anderson",
      email: "anderson@anderson.com",
      cityId: "",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.cityId");
  });
  // <- Test 8

  // Test 9 ->
  it("Tentar criar um registro sem nenhuma propriedade", async () => {
    const res = await testServer.post("/people").send({});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.fullname");
    expect(res.body).toHaveProperty("errors.body.email");
    expect(res.body).toHaveProperty("errors.body.cityId");
  });
  // <- Test 9
});
