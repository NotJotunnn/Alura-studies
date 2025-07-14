const UsuarioService = require("../services/usuarioService.js");

const usuarioService = new UsuarioService();

class UsuarioController {
  static async pegarTodosUsuarios(req, res) {
    const usuarios = await usuarioService.pegarTodosUsuarios();

    res.status(200).send({ data: usuarios });
  }

  static async pegarUsuario(req, res) {
    const { id } = req.params;

    if (!id) res.status(400).send({ message: "Dado id não preenchido." });

    try {
      const usuario = await usuarioService.pegarUsuarioPorid(id);

      res.status(200).send({ data: usuario });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async atualizar(req, res) {
    const { id } = req.params;

    if (!id) res.status(400).send({ message: "Dado id não preenchido." });

    try {
      const usuario = await usuarioService.atualizarUsuario(id, req.body);

      res.status(200).send({ data: usuario });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async remover(req, res) {
    const { id } = req.params;

    if (!id) res.status(400).send({ message: "Dado id não preenchido." });

    try {
      await usuarioService.deletarUsuario(id);

      res.status(200).send({ message: "Usuário deletado com sucesso" });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
}

module.exports = UsuarioController;
