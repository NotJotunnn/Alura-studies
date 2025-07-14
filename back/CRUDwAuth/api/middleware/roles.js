const Database = require("../models")

const roles = (listaRoles) => {
  return async (req, res, next) => {
    const { usuarioId } = req

    const usuario = await Database.usuarios.findOne({
      include: [
        {
          model: Database.roles,
          as: "usuarios_roles",
          attributes: ["id", "nome"]
        }
      ],
      where: {
        id: usuarioId
      }
    })

    if(!usuario) return res.status(401).send({ message: "Usuário não cadastrado." })

    const rolesCadastradas = await usuario.usuarios_roles
      .map(role => role.nome)
      .some(role => listaRoles.includes(role));
    
    if(!rolesCadastradas) return res.status(401).send({ message: "Usuário não possui acesso à essa rota." })
    
    return next()
  }
}

module.exports = roles