import {
  afterEach,
  beforeEach,
  describe,
  it,
} from "@jest/globals";
import request from "supertest";
import app from "../../app";

let servidor;

beforeEach(() => {
  const porta = 8000;
  servidor = app.listen(porta);
});

afterEach(() => {
  servidor.close();
});

describe("Testando authRoutes.login", () => {
  const loginMock = {
    email: "leandro@test.com.br",
    senha: "123",
  };

  it.each([
    ["Senha", { email: "leandro@test.com.br" }, "a"],
    ["Email", { senha: "123" }, "o"],
  ])(
    "O login deve possuir email e senha para autenticar - Etapa %s",
    async (name, params, article) => {
      await request(servidor)
        .post("/login")
        .send(params)
        .expect(400)
        .then((response) => expect(response.body).toEqual(expect.objectContaining({
          message: `${name} não incluid${article}`,
        })));
    },
  );

  it("O login deve validar se o usuário está cadastrado", async () => {
    await request(servidor)
      .post("/login")
      .send(loginMock)
      .expect(400)
      .then((response) => expect(response.body).toEqual(expect.objectContaining({
        message: "Usuário não cadastrado",
      })));
  });

  it("O login deve validar se o email e a senha estão corretos", async () => {
    await request(servidor)
      .post("/cadastrar")
      .send({
        nome: "Leandro",
        email: "leandro2@test.com.br",
        senha: "123",
      });

    await request(servidor)
      .post("/login")
      .send({
        email: "leandro2@test.com.br",
        senha: "123",
      })
      .expect(201);
  });

  it("O login deve validar se está sendo retornado um accessToken", async () => {
    await request(servidor)
      .post("/login")
      .send({
        email: "leandro2@test.com.br",
        senha: "123",
      })
      .expect(201)
      .then((response) => expect(response.body).toEqual(expect.objectContaining({
        message: "Usuario conectado",
        accessToken: expect.any(String),
      })));
  });
});
