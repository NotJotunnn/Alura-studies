const user = {
  nome: "Leandro Ferreira",
  email: "leandro.mail@gmail.com",
  nascimento: "2002-07-10",
  role: "estudante",
  ativo: true,
  exibirInfos: function () {
    console.log(this.nome, this.email);
  },
};

const admin = {
  nome: "Leandro Ferreira",
  email: "leandro.mail@gmail.com",
  nascimento: "2002-07-10",
  role: "estudante",
  ativo: true,
  criarCurso: function () {
    console.log("Curso criado");
  },
};

Object.setPrototypeOf(admin, user);

admin.exibirInfos();
admin.criarCurso();
