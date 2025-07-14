import Item from "../item.js";

describe("Testes dos itens", () => {
  it("Cada item deve ter três campos: Nome, valor, quantidade", () => {
    const item = new Item("Banana", 5, 5);

    expect(item.nome).toBe("Banana");
    expect(item.valor).toBe(5);
    expect(item.quantidade).toBe(5);
  });

  it("Testa o método pegaValorTotalItem para retornar valor * quantidade de cada item", () => {
    const item = new Item("Açaí", 23.9, 1);

    expect(item.pegaValorTotalItem()).toBe(23.9);
  });
});
