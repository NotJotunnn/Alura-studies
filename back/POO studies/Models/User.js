import { curso } from "./Curso.js";
import { horaAtual } from "../Service/index.js";

export const users = [];

export class User {
  constructor(nome, email, nascimento, ativo = true, role) {
    this.id = users.filter((user) => user.ativo == true).length;
    this.nome = nome;
    this.email = email;
    this.nascimento = nascimento;
    this.role = role || "estudante";
    this.ativo = ativo;
    this.created_at = new Date();
    this.updated_at = new Date();

    users.push(this);
  }

  exibirInfo() {
    return `${this.nome} ${this.email}`;
  }

  exibirListaCursos() {
    const cursos = curso.listarCursos();

    if (cursos.length == 0)
      return `\n[ERRO] [${horaAtual()}] Nenhum curso disponível no momento... Volte mais tarde!\n`;
    return `Os seguintes cursos estão disponíveis: \n\t+${cursos
      .filter((curso) => curso.ativo === true)
      .map(
        (curso) =>
          `${curso.nome} - ${
            curso.vagas -
            curso.estudantes.filter((estudante) => estudante.ativo == true)
              .length
          } vagas`
      )
      .join("\n\t+")}`;
  }

  apagarPerfil() {
    const userExiste = users.indexOf(this);

    if (userExiste == -1)
      return `\n[ERRO] [${horaAtual()}] Usuário ${
        this.nome
      } não existe no banco de dados.\n`;

    this.ativo = false;
    curso.cursos.map((curso) => ({
      ...curso,
      estudantes: curso.estudantes.filter(
        (estudante) => estudante.id != this.id
      ),
    }));
    return `Usuário ${this.nome} foi apagado com sucesso às ${horaAtual()}.`;
  }

  criarPerfil() {
    const userExiste = users.indexOf(this);

    if (userExiste != -1) {
      this.ativo = true;
      this.id = users.filter((user) => user.ativo == true).length;

      return `Usuário ${this.nome} criado com sucesso às ${horaAtual()}.`;
    }

    return `\n[ERRO] [${horaAtual()}] Usuário ${
      this.nome
    } já existente no banco de dados.\n`;
  }

  matricularCurso(cursoEscolhido) {
    const cursos = curso.listarCursos();

    const cursoMatricular = cursos.find(
      (cursoListado) => cursoListado.nome === cursoEscolhido
    );

    if (cursoMatricular) {
      if (
        cursoMatricular.vagas -
          cursoMatricular.estudantes.filter(
            (estudante) => estudante.ativo == true
          ).length <=
        0
      )
        return `\n[ERRO] [${horaAtual()}] Curso "${cursoEscolhido}" não há mais vagas.\n`;

      if (
        !cursoMatricular.estudantes.find((estudante) => estudante.id == this.id)
      ) {
        const cursoMatriculado = curso.matricularCurso(this, cursoEscolhido);

        return `Matriculado com sucesso o aluno ${this.nome} ao curso ${
          cursoMatriculado.nome
        } do professor ${cursoMatriculado.docente} às ${horaAtual()}.`;
      }

      return `\n[ERRO] [${horaAtual()}] Estudante ${
        this.nome
      } já matriculado no curso "${cursoEscolhido}".\n`;
    }

    return `\n[ERRO] [${horaAtual()}] Curso "${cursoEscolhido}" não encontrado.\n`;
  }

  exibirCursosMatriculados() {
    const cursos = curso.listarCursos();

    let cursosMatriculados = [];

    cursos.map((curso) => {
      const eMatriculado = curso.estudantes.find(
        (estudante) => estudante.id == this.id
      );
      if (eMatriculado != undefined)
        cursosMatriculados.push(
          `${curso.nome} do professor ${curso.docente} às ${horaAtual(
            eMatriculado.matriculado_at
          )}`
        );
    });

    if (cursosMatriculados.length > 0) {
      return `O estudante ${
        this.nome
      } está matriculado nos seguintes cursos: \n\t-${cursosMatriculados.join(
        "\n\t-"
      )}`;
    }

    return `\n[ERRO] [${horaAtual()}] Usuário ${
      this.nome
    } não está matriculado em nenhum curso.\n`;
  }
}
