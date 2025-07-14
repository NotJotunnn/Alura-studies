const { Router } = require("express");
const UsuarioController = require("../controllers/usuarioController");
const autenticado = require("../middleware/autenticado");

const router = Router();

router
  .get("/usuarios", UsuarioController.pegarTodosUsuarios)
  .get("/usuarios/id/:id", UsuarioController.pegarUsuario)
  .put('/usuarios/id/:id', UsuarioController.atualizar)
  .delete('/usuarios/id/:id', UsuarioController.remover)

module.exports = router