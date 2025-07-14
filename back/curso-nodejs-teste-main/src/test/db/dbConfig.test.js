import { describe, expect, it } from "@jest/globals";
import db from "../../db/dbconfig";
import Autor from "../../models/autor";

describe("Testes no dbConfig", () => {
  it("Teste de conexão com banco", async () => {
    const autorMock = new Autor({
      nome: "Jamil",
      nacionalidade: "brasileiro",
    });

    const autorSalvo = await db("autores").insert(autorMock)
      .then((retorno) => db("autores")
        .where("id", retorno[0]))
      .then((autorSelecionado) => autorSelecionado[0]);

    expect(autorSalvo).toEqual(expect.objectContaining({
      ...autorMock,
      id: expect.any(Number),
    }));

    await db("autores").where({ id: autorSalvo.id }).del();
  });
});
