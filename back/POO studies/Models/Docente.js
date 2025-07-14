import { User } from "./User.js";
import { curso } from "./Curso.js";
import { horaAtual } from "../Service/index.js";

export class Docente extends User {
  constructor(nome, email, nascimento, role = "docente", ativo = true) {
    super(nome, email, nascimento, ativo, role);
  }
  aprovarEstudante(nome, nomeCurso) {
    const cursoEncontrado = curso.cursos.find(
      (curso) => curso.docente == this.nome && curso.nome == nomeCurso
    );
    if (!cursoEncontrado) return `\n[ERRO] [${horaAtual()}] Curso ${nomeCurso} não encontrado.\n`;

    const estudanteEncontrado = cursoEncontrado.estudantes.find(
      (estudante) => estudante.nome == nome
    );
    if (!estudanteEncontrado)
      return `\n[ERRO] [${horaAtual()}] Estudante ${nome} não encontrado no curso ${cursoEncontrado.nome}.\n`;

    if(estudanteEncontrado.status == "aprovado") return `\n[ERRO] [${horaAtual()}] Estudante ${nome} já aprovado no curso ${cursoEncontrado.nome}, responsável ${this.nome} às ${horaAtual()}.\n`;

    estudanteEncontrado.status = "aprovado";

    return `Estudante ${nome} aprovado com sucesso no curso ${cursoEncontrado.nome}, responsável ${this.nome} às ${horaAtual()}.`;
  }
  reprovarEstudante(nome, nomeCurso) {
    const cursoEncontrado = curso.cursos.find(
      (curso) => curso.docente == this.nome && curso.nome == nomeCurso
    );
    if (!cursoEncontrado) return `\n[ERRO] [${horaAtual()}] Curso ${nomeCurso} não encontrado.\n`;

    const estudanteEncontrado = cursoEncontrado.estudantes.find(
      (estudante) => estudante.nome == nome
    );
    if (!estudanteEncontrado)
      return `\n[ERRO] [${horaAtual()}] Estudante ${nome} não encontrado no curso ${cursoEncontrado.nome}.\n`;

    if(estudanteEncontrado.status == "reprovado") return `\n[ERRO] [${horaAtual()}] Estudante ${nome} já reprovado no curso ${cursoEncontrado.nome}, responsável ${this.nome} às ${horaAtual()}.\n`;

    estudanteEncontrado.status = "reprovado";

    return `Estudante ${nome} reprovado com sucesso no curso ${cursoEncontrado}, responsável ${this.nome} às ${horaAtual()}.`;
  }
}
