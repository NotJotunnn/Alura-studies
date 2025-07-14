import { afterEach, beforeEach, describe, expect, it, jest, test } from "@jest/globals";
import app from "../../app";
import request from "supertest";

let server;

beforeEach(() => {
  const port = 8000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe("GET /editoras", () => {
  it("Deve retornar uma lista de editoras", async () => {
    const resposta = await request(app)
      .get("/editoras")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200);

    expect(resposta.body[0].email).toBe("c@c.com");
  });
});

let idResposta;

describe("POST /editoras", () => {
  it("Deve adicionar uma nova editora", async () => {
    const resposta = await request(app)
      .post("/editoras")
      .send({
        nome: "Carlos",
        cidade: "Brasília",
        email: "e@e.com",
      })
      .expect(201);

    idResposta = resposta.body.content.id;
  });

  it("Deve não adicionar nada ao passar um body vazio", async () => {
    const response = await request(app).post("/editoras").send({}).expect(400);

    expect(response.body.message).toBe("corpo vazio");
  });
});

describe("PUT /editoras/:id", () => {
  test.each([
    ["nome", { nome: "Carlitos" }],
    ["cidade", { cidade: "Brasilien" }],
    ["email", { email: "Carl@Carl.com" }],
  ])("Deve atualizar uma editora na coluna %s", async (chave, param) => {
    const requisicao = { request }
    const spy = jest.spyOn(requisicao, "request")
    await requisicao.request(app)
      .put(`/editoras/${idResposta}`)
      .send(param)
      .expect(204);
    
    expect(spy).toHaveBeenCalled()
  });
});

describe("GET /editoras/:id/livros", () => {
  it("Deve retornar livros de uma editora criada recentemente", async () => {
    const response = await request(app)
      .get(`/editoras/${idResposta}/livros`)
      .expect(200);

    expect(response.body.livros).toStrictEqual([]);
  });
});

describe("DELETE /editoras/:id", () => {
  it("Deve deletar um recurso adicionado", async () => {
    await request(app).delete(`/editoras/${idResposta}`).expect(200);
  });
});

describe("GET /editoras/:id", () => {
  it("Não deve retornar uma editora", async () => {
    const response = await request(app)
      .get(`/editoras/${idResposta}`)
      .expect(200);

    expect(response.body.data).toBeUndefined();
  });
});
