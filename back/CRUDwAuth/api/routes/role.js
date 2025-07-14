const { Router } = require("express");
const RoleController = require("../controllers/roleController");

const router = Router()

router
  .post("/role", RoleController.cadastrar)
  .get("/role", RoleController.pegarTodasRoles)
  .get("/role/id/:id", RoleController.pegarRolePorId)
  .delete("/role/id/:id", RoleController.deletarRole)
  .put("/role/id/:id", RoleController.atualizarRole)

module.exports = router