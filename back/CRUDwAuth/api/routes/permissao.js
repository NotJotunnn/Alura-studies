const { Router } = require("express");
const PermissaoController = require("../controllers/permissaoController");

const router = Router();

router
  .post("/permissao", PermissaoController.cadastrarPermissao)
  .get("/permissao", PermissaoController.pegarPermissoes)
  .get("/permissao/id/:id", PermissaoController.pegarPermissaoPorId)
  .delete("/permissao/id/:id", PermissaoController.removerPermissao)
  .put("/permissao/id/:id", PermissaoController.atualizarPermissao);

module.exports = router;
