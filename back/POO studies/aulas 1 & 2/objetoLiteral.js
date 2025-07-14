const user = {
  nome: "Leandro Ferreira",
  email: "leandro.mail@gmail.com",
  nascimento: "2002-07-10",
  role: "estudante",
  ativo: true,
  exibirInfos: function() {
    console.log(this.nome, this.email);
  },
}

// user.exibirInfos()