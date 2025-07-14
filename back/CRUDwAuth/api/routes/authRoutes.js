const { Router } = require("express")
const AuthController = require("../controllers/authController")

const router = Router()

router
  .post("/auth/cadastrar", AuthController.cadastrar)
  .post("/auth/login", AuthController.login)

module.exports = router