const PermissaoService = require("../services/permissaoService")

const permissaoService = new PermissaoService()

class PermissaoController {
  static async cadastrarPermissao(req, res) {
    const { nome, descricao } = req.body

    try {
      const permissao = await permissaoService.cadastrar({nome, descricao})

      res.status(201).send({ message: "Permissão criada com sucesso", data: permissao })
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  }

  static async pegarPermissoes(req, res) {
    try {
      const permissoes = await permissaoService.pegar()

      res.status(200).send({ message: "Todas permissões retornadas com sucesso", data: permissoes })
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  }

  static async pegarPermissaoPorId(req, res) {
    const { id } = req.params

    try {
      const permissao = await permissaoService.pegarPorId(id)

      res.status(200).send({ message: "Permissão retornada com sucesso", data: permissao })
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  }

  static async removerPermissao(req, res) {
    const { id } = req.params

    try {
      await permissaoService.deletar(id)

      res.status(200).send({ message: "Permissão deletada com sucesso", data: {} })
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  }

  static async atualizarPermissao(req, res) {
    const { id } = req.params
    const { nome, descricao } = req.body

    try {
      const permissao = await permissaoService.atualizar(id, { nome, descricao })

      res.status(200).send({ message: "Permissão atualizada com sucesso" , data: permissao })
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  }
}

module.exports = PermissaoController