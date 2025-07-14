import { createHash } from "crypto";

function criaHash(senha) {
  return createHash("sha256").update(senha).digest("hex");
}

class Usuario {
  constructor(nome, senha) {
    this.nome = nome;
    this.hash = criaHash(senha);
  }

  autentica(nome, senha) {
    if (nome === this.nome && criaHash(senha) === this.hash)
      return `Usuário ${nome} autenticado com sucesso.`;
    
    return "Usuário ou senha incorretos.";
    }

}

const leoleo = new Usuario("NotJotunnn", "")

console.log(leoleo.autentica("NotJotunnn", ""))