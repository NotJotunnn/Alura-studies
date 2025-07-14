const SegurancaService = require("../services/segurancaService")

const segurancaService = new SegurancaService()

class SegurancaController {
  static async cadastrarACL(req, res) {
    const { roles, permissoes } = req.body
    const { usuarioId } = req

    try {
      const acl = await segurancaService.cadastrar({ roles, permissoes, usuarioId })

      res.status(201).send({ data: acl })
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  }

  static async cadastrarPermissoesRoles(req, res) {
    const { roleId, permissoes } = req.body

    try {
      const permissoesRole = await segurancaService.cadastrarPermissoesRole({ roleId, permissoes })

      res.status(201).send({ permissoesRole })
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  }
}

module.exports = SegurancaController