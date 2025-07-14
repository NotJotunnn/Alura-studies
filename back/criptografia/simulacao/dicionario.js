import { createHash } from "crypto";

class Usuario {
  constructor(nome, senha) {
    this.nome = nome;
    this.hash = this.criaHash(senha);
  }

  criaHash(senha) {
    return createHash("sha256").update(senha).digest("hex");
  }

  autentica(nome, senha) {
    if (nome === this.nome && this.criaHash(senha) === this.hash)
      return `Usuário ${nome} autenticado com sucesso.`;

    return "Usuário ou senha incorretos.";
  }
}

const senhasComuns = [
  "senha",
  "123456",
  "senha123",
  "admin",
  "blink182",
  "meuAniversario",
  "senha123456",
  "brasil",
  "102030",
];

const leoleo = new Usuario("NotJotunnn", "102030");

senhasComuns.map(senha => {
  if(leoleo.autentica("NotJotunnn", senha) == `Usuário ${leoleo.nome} autenticado com sucesso.`) {
    console.log(`Senha encontrada! ${senha}`)
  }
})
