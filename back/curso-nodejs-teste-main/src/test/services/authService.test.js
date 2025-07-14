/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
import { afterEach, describe, expect, it } from "@jest/globals";
import AuthService from "../../services/authService";

const authService = new AuthService();

afterEach(async () => {
  await authService.removerUsuarioDebug("leandro@teste.com.br");
});

describe("Testando a authService.cadastrarUsuario", () => {
  const usuarioMock = {
    email: "leandro@teste.com.br",
    nome: "Leandro",
    senha: "123",
  };

  it.each([
    ["Nome", { email: "leandro@teste.com.br", senha: "123" }, "O"],
    ["Email", { nome: "Leandro", senha: "123" }, "O"],
    ["Senha", { email: "leandro@teste.com.br", nome: "Leandro" }, "A"],
  ])(
    "O usuário deve possuir um nome, email e senha - Etapa %s",
    async (name, params, article) => {
      // Arrange
      const usuarioMockTemp = params;

      // Act
      const usuarioSalvo = authService.cadastrarUsuario(usuarioMockTemp);

      // Assert
      await expect(usuarioSalvo).rejects.toThrowError(
        `${article} ${name.toLowerCase()} de usuario é obrigatóri${article.toLowerCase()}.`
      );
    }
  );

  it("A senha do usuário precisa ser criptografada quando registrada no banco", async () => {
    const usuarioSalvo = await authService.cadastrarUsuario(usuarioMock);

    expect(usuarioSalvo).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        content: {
          id: expect.any(Number),
          ...usuarioMock,
          senha: expect.not.stringMatching(usuarioMock.senha),
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
      })
    );
  });

  it("Ao cadastrar o usuário, deve ser retornado uma mensagem informando que o usuário foi cadastrado", async () => {
    const usuarioSalvo = await authService.cadastrarUsuario(usuarioMock);

    expect(usuarioSalvo).toEqual(
      expect.objectContaining({
        message: expect.stringMatching("usuario criado"),
        content: {
          id: expect.any(Number),
          ...usuarioMock,
          senha: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
      })
    );
  });

  it("Ao cadastrar o usuário, validar o retorno do usuário", async () => {
    const usuarioSalvo = await authService.cadastrarUsuario(usuarioMock);

    expect(usuarioSalvo).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        content: {
          id: expect.any(Number),
          nome: expect.any(String),
          email: expect.any(String),
          senha: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
      })
    );
  });

  it("Não pode ser cadastrado um usuário com email duplicado", async () => {
    await authService.cadastrarUsuario(usuarioMock);

    const usuarioSalvoNovamente = authService.cadastrarUsuario(
      usuarioMock
    );

    await expect(usuarioSalvoNovamente).rejects.toThrowError("Email de usuário já existente");
  });
});
