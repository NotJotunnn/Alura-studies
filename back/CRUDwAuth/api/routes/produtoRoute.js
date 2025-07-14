const { Router } = require('express')
const ProdutoController = require('../controllers/produtoController')
const autenticado = require('../middleware/autenticado')
const roles = require("../middleware/roles")
const permissoes = require("../middleware/permissoes")

const router = Router()

router.use(autenticado)

router
  .post('/produto' ,ProdutoController.cadastrarProduto)
  .get('/produto', permissoes(["Editar produto"]), ProdutoController.buscarTodosProdutos)
  .get('/produto/id/:id', ProdutoController.buscarProdutoPorId)
  .delete('/produto/id/:id', ProdutoController.deletarProdutoPorId)
  .put('/produto/id/:id', ProdutoController.editarProduto)

module.exports = router