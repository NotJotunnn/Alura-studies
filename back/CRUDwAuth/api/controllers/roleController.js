const RoleService = require("../services/roleService");

const roleService = new RoleService();

class RoleController {
  static async cadastrar(req, res) {
    const { nome, descricao } = req.body;

    if(!nome || !descricao) res.status(400).send({ message: "Dados nome e descricao não incluídos." })

    try {
      const role = await roleService.cadastrar({ nome, descricao })

      res.status(201).send({ message: "Role cadastrada com sucesso", data: role })
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async pegarTodasRoles(req, res) {
    try {
      const roles = await roleService.pegar()

      res.status(200).send({ message: "Roles adquiridas com sucesso.", data: roles })
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  }

  static async pegarRolePorId(req, res) {
    const { id } = req.params

    try {
      const role = await roleService.pegarPorId(id)

      res.status(200).send({ message: "Role adquirida com sucesso.", data: role })
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  }

  static async deletarRole(req, res) {
    const { id } = req.params

    try {
      await roleService.deletar(id)
      res.status(200).send({ message: "Role deletada com sucesso.", data: {} })
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  }

  static async atualizarRole(req, res) {
    const { id } = req.params
    const { nome, descricao } = req.body

    try {
      const role = await roleService.atualizar({ nome, descricao }, id)
      res.status(200).send({ message: "Role atualizada com sucesso.", data: role })
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  }
}

module.exports = RoleController;
