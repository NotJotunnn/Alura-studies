import { describe, expect, it } from "@jest/globals";
import AluguelLivroService from "../../services/aluguelLivroService";

const aluguelLivrosService = new AluguelLivroService();

describe("Testando aluguelLivroService", () => {
  it("Retornar a data de devolução do livro validando a quantidade de dias alugados", async () => {
    const dataAlugado = new Date("2025-01-01");
    const numeroDiasAlugado = 5;
    const dataDevolucaoMock = new Date("2025-01-06");

    const dataDevolucao = await aluguelLivrosService.calcularDataDevolucao(
      dataAlugado,
      numeroDiasAlugado,
    );

    expect(dataDevolucao).toStrictEqual(dataDevolucaoMock);
  });

  it("Data em que o livro foi alugado não pode ser nula", async () => {
    const dataAlugado = "";
    const numeroDiasAlugado = 5;

    const dataDevolucao = aluguelLivrosService.calcularDataDevolucao(
      dataAlugado,
      numeroDiasAlugado,
    );

    await expect(dataDevolucao).rejects.toThrowError("Dia de início do aluguel não especificado");
  });

  it("Numero de dias alugados tem que ser maior que 0", async () => {
    const dataAlugado = new Date("2025-01-01");
    const numeroDiasAlugado = 0;

    const dataDevolucao = aluguelLivrosService.calcularDataDevolucao(
      dataAlugado,
      numeroDiasAlugado,
    );

    await expect(dataDevolucao).rejects.toThrowError("Quantos dias alugados não especificado");
  });
});
