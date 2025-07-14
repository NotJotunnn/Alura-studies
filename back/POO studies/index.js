import { User, Admin, Docente, curso } from "./Models/index.js";

import { listarPerfis } from "./Service/index.js";

const newUser = new User("Carlos", "carlos@teste.com", "21-02-2004");
const newAdmin = new Admin("Juninho", "junipe@teste.com", "16-05-1995");
const newDocente = new Docente("Vieira", "vieira@teste.com", "03-12-2001");

// console.log(listarPerfis("docente"));

// console.log(newAdmin.criarCurso("Javascript", newDocente.nome, 20))
// console.log(newAdmin.criarCurso("Go", newDocente.nome, 20))
// console.log(newAdmin.criarCurso("Java", newDocente.nome, 20))

// ! Causa um erro por não haverem docentes com o nome de "Júlio Carlos"
// console.log(newAdmin.criarCurso("Javascript", "Julio Carlos", 20))

// ! Mostra todos os estudantes
// console.log(listarPerfis());

// console.log(newUser.matricularCurso("Javascript"))
// ! Erro estudante já matriculado
// console.log(newUser.matricularCurso("Javascript"))

// console.log(newDocente.aprovarEstudante(newUser.nome, "Javascript"))
// ! Erro estudante já aprovado
// console.log(newDocente.aprovarEstudante(newUser.nome, "Javascript"))

// ? Debugging
// console.log(curso.listarCursos()[0].estudantes)

// console.log(newUser.exibirCursosMatriculados())

// newUser.apagarPerfil()
// ! Erro usuário já apagado
// newUser.apagarPerfil()
// newUser.criarPerfil()

// console.log(listarPerfis());

// console.log(newAdmin.desativarPerfil(0));

// console.log(listarPerfis());
