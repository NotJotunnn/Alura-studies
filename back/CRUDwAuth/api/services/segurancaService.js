
const Sequelize = require('sequelize')
const Database = require('../models')

class SegurancaService {
  async cadastrar(dto) {
    const usuario = await Database.usuarios.findOne({
      include: [
        {
          model: Database.roles,
          as: "usuarios_roles",
          attributes: ["id", "nome", "descricao"]
        },
        {
          model: Database.permissoes,
          as: "usuarios_permissoes",
          attributes: ["id", "nome", "descricao"]
        }
      ],
      where: {
        id: dto.usuarioId
      }
    })

    if(!usuario) throw new Error("Usuário não cadastrado.")

    const rolesCadastradas = await Database.roles.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.roles
        }
      }
    })

    const permissoesCadastradas = await Database.permissoes.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.permissoes
        }
      }
    })

    await usuario.removeUsuarios_roles(usuario.usuario_roles)
    await usuario.removeUsuarios_permissoes(usuario.usuarios_permissoes)

    await usuario.addUsuarios_roles(rolesCadastradas)
    await usuario.addUsuarios_permissoes(permissoesCadastradas)

    const novoUsuario = await Database.usuarios.findOne({
      include: [
        {
          model: Database.roles,
          as: "usuarios_roles",
          attributes: ["id", "nome", "descricao"]
        },
        {
          model: Database.permissoes,
          as: "usuarios_permissoes",
          attributes: ["id", "nome", "descricao"]
        }
      ],
      where: {
        id: dto.usuarioId
      }
    })

    return novoUsuario
  }

  async cadastrarPermissoesRole(dto) {
    const role = await Database.roles.findOne({
      include: [
        {
          model: Database.permissoes,
          as: "role_permissoes",
          attributes: ["id", "nome", "descricao"]
        }
      ]
    })

    if(!role) throw new Error("Role não cadastrada.")

    const permissoesCadastradas = await Database.permissoes.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.permissoes
        }
      }
    })

    await role.removeRole_permissoes(role.role_permissoes)
    await role.addRole_permissoes(permissoesCadastradas)

    const novaRole = await Database.roles.findOne({
      include: [{
        model: Database.permissoes,
        as: "role_permissoes",
        attributes: ["id", "nome", "descricao"]
      }],
      where: {
        id: dto.roleId
      }
    })

    return novaRole
  }
}

module.exports = SegurancaService