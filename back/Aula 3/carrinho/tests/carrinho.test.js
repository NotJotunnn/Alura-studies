import Carrinho from "../carrinho";
import Item from "../item";

describe("Testes do carrinho", () => {
  it("Testa o carrinho para verificar se cria todas as variáveis com seus respectivos valores padrões", () => {
    const carrinho = new Carrinho();

    expect(carrinho.itens.length).toBe(0);
    expect(carrinho.subtotal).toBeNull();
    expect(carrinho.frete).toBeNull();
    expect(carrinho.total).toBeNull();
  });

  it("Testa método de adicionar item no carrinho", () => {
    const carrinho = new Carrinho();

    carrinho.adiciona(new Item("banana", 5, 5));

    expect(carrinho.itens[0]).toEqual({
      nome: "banana",
      valor: 5,
      quantidade: 5,
    });
  });

  it("Testa para ver implementação de frete", () => {
    const carrinho = new Carrinho();

    carrinho.adicionaFrete(35);

    expect(carrinho.frete).toBe(35);
    expect(carrinho.frete).not.toBeNull();
  });

  it("Testa método de calculaTotal", () => {
    const carrinho = new Carrinho();

    carrinho.adiciona(new Item("Maçã", 8, 4));

    expect(carrinho.itens[0]).toEqual({
      nome: "Maçã",
      valor: 8,
      quantidade: 4,
    });
    expect(carrinho.calculaTotal()).toBe(32);
  });

  it("Testa o funcionamento da classe por completo", () => {
    const carrinhoComFrete = new Carrinho();
    const carrinhoSemFrete = new Carrinho();
    const carrinhoVazio = new Carrinho();

    carrinhoComFrete.adiciona(new Item("banana", 5, 5));
    carrinhoComFrete.adicionaFrete(15);
    carrinhoComFrete.finalizaCompra();

    carrinhoSemFrete.adiciona(new Item("banana", 5, 5));
    carrinhoSemFrete.finalizaCompra();

    expect(carrinhoComFrete.itens[0]).toEqual({
      nome: "banana",
      valor: 5,
      quantidade: 5,
    });
    expect(carrinhoComFrete.frete).toBe(15);
    expect(carrinhoComFrete.frete).not.toBeNull();
    expect(carrinhoComFrete.subtotal).toBe(25);
    expect(carrinhoComFrete.total).toBe(40);

    expect(carrinhoSemFrete.itens[0]).toEqual({
      nome: "banana",
      valor: 5,
      quantidade: 5,
    });
    expect(carrinhoSemFrete.frete).toBeNull();
    expect(carrinhoSemFrete.subtotal).toBe(25);
    expect(carrinhoSemFrete.total).toBe(25);

    expect(carrinhoVazio.itens).toEqual([]);
    expect(carrinhoVazio.frete).toBeNull();
    expect(() => carrinhoVazio.finalizaCompra()).toThrow("Carrinho de compras vazio");
  });
});
