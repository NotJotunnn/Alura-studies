import { describe, expect, it, jest } from "@jest/globals";
import Editora from "../../models/editora";

describe("Testes da classe editora", () => {
  const objetoEditora = {
    nome: "Carlitos Jr",
    cidade: "Brasília",
    email: "c@c.com",
  };

  it("Deve instanciar uma editora nova", () => {
    const editora = new Editora(objetoEditora);

    expect(editora).toEqual(expect.objectContaining(objetoEditora));
  });

  it("Deve pegar pelo id usando método pegarPeloId", async () => {
    const editoras = await Editora.pegarEditoras();
    const id = editoras[editoras.length - 1].id;

    const editora = editoras.find((editora) => editora.id == id);

    Editora.pegarPeloId(id).then((data) =>
      expect(data).toEqual({ ...editora, id })
    );
  });

  it.skip("Deve salvar no banco de dados", () => {
    const editora = new Editora(objetoEditora);

    editora.salvar().then((data) => expect(data.nome).toBe("Carlitos Jr"));
  });

  it("Deve simular salvar no banco de dados", () => {
    const editora = new Editora(objetoEditora);

    editora.salvar = jest.fn().mockResolvedValue({
      id: 5,
      ...objetoEditora,
      created_at: "2025-05-29",
      updated_at: "2025-05-29"
    })

    editora.salvar().then((data) => expect(data.nome).toBe("Carlitos Jr"));
  });

  it.skip("Deve salvar no bd usando a sintaxe moderna", async () => {
    const editora = new Editora(objetoEditora);

    const dados = await editora.salvar();

    const retornado = await Editora.pegarPeloId(dados.id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    );
  });

  it.skip("Deve listar pelo menos uma editora", async () => {
    const editora = new Editora(objetoEditora);

    await editora.salvar();

    const retornado = await Editora.pegarEditoras();

    expect(retornado.length).toBeGreaterThan(0);
  });

  it("Deve atualizar uma editora usando o método atualizar", async () => {
    const id = 1;
    const editora = new Editora({ id, ...objetoEditora });

    const data = await editora.atualizar(id);
    Editora.pegarPeloId(1).then((result) => expect(result).toEqual(data[0]));
  });

  it("Deve atualizar uma editora usando o método salvar", async () => {
    const id = 1;
    const editora = new Editora({ id, ...objetoEditora });

    const data = await editora.salvar();
    Editora.pegarPeloId(1).then((result) => expect(result).toEqual(data[0]));
  });

  it.skip("Deve salvar uma editora usando o método criar", async () => {
    const editora = new Editora(objetoEditora);

    const data = await editora.criar();

    Editora.pegarPeloId(data.id).then((result) => expect(result).toEqual({...editora, id: data.id}));
  });

  it.skip("Deve remover uma editora usando o método excluir", async () => {
    const editorasOld = await Editora.pegarEditoras();
    const id = editorasOld[editorasOld.length - 1].id;

    await Editora.excluir(id);

    const editorasNew = await Editora.pegarEditoras();

    expect(editorasNew[editorasNew.length - 1]).not.toContainEqual({
      id,
      ...editorasNew[editorasNew.length - 1],
    });
  });

  it("Deve listar livros de uma certa editora", async () => {
    const editora = await Editora.pegarEditoras()
    const id = editora[0].id

    const livros = await Editora.pegarLivrosPorEditora(id)

    expect(livros.length).toBeGreaterThan(0)
  })
});
