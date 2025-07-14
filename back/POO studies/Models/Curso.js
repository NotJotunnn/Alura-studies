import { horaAtual } from "../Service/index.js";

export default class Curso {
  constructor() {
    this.cursos = [];
  }

  criarCurso(nome, docente, vagas, ativo = true) {
    this.cursos.push({
      id: this.cursos.length,
      nome,
      docente,
      vagas,
      ativo,
      estudantes: [],
      created_at: new Date(),
      updated_at: new Date()
    });

    return `Curso ${nome} criado com sucesso às ${horaAtual()}`;
  }

  matricularCurso(user, cursoNome) {
    const cursoEscolhido = this.cursos.find(curso => curso.nome == cursoNome)

    const userMatriculado = {
      ...user,
      status: "estudando",
      matriculado_at: new Date()
    }

    cursoEscolhido.estudantes.push(userMatriculado)
    cursoEscolhido.updated_at = new Date()

    return cursoEscolhido
  }

  listarCursos() {
    return this.cursos;
  }
}

export const curso = new Curso();

