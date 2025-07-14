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

const leoleo = new Usuario("NotJotunnn", "10001")

for(let senhaCorreta = 0; senhaCorreta < 100000; senhaCorreta++) {
  for(let casas = 1; casas < 7; casas++) {
    if(leoleo.autentica("NotJotunnn", senhaCorreta.toString().padStart(casas, "0")) == `Usuário ${leoleo.nome} autenticado com sucesso.`) {
      console.log(`Senha encontrada! ${senhaCorreta.toString().padStart(casas, "0")}`)
      break
    }
  }
}