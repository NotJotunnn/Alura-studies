const Database = require("../models")

const permissoes = (listaPermissoes) => {
  return async (req, res, next) => {
    const { usuarioId } = req

    const usuario = await Database.usuarios.findOne({
      include: [
        {
          model: Database.permissoes,
          as: "usuarios_permissoes",
          attributes: ["id", "nome"]
        }
      ],
      where: {
        id: usuarioId
      }
    })

    if(!usuario) return res.status(401).send({ message: "Usuário não cadastrado." })

    const permissoesCadastradas = usuario.usuarios_permissoes
      .map(permissao => permissao.nome)
      .some(permissao => listaPermissoes.includes(permissao))
    
    if(!permissoesCadastradas) return res.status(401).send({ message: "Usuário não possui permissão para acessar essa rota." })

    return next()
  }
}

module.exports = permissoes