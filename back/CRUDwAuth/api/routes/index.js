const bodyParser = require('body-parser')
 
const produto = require('./produtoRoute')
const usuario = require('./usuarioRoute')
const auth = require('./authRoutes')
const role = require("./role")
const permissao = require("./permissao")
const seguranca = require("./seguranca")

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    produto,
    usuario,
    role,
    permissao,
    seguranca,
  )
}
