const Database = require("../models")
const { v4: uuidv4 } = require("uuid")

class PermissaoService {
  async cadastrar(dto) {
    if(!dto.nome || !dto.descricao) throw new Error("Nome e/ou descricao não incluídos.")

    try {
      const permissao = await Database.permissoes.create({
        id: uuidv4(),
        ...dto
      })

      return permissao
    } catch (err) {
      throw new Error(`Não foi possível criar uma permissão nova: ${err.message}`)
    }
  }

  async pegar() {
    return await Database.permissoes.findAll()
  }

  async pegarPorId(id) {
    if(!id) throw new Error("Id não incluído.")

    try {
      return await Database.permissoes.findOne({
        where: {
          id
        }
      })
    } catch (err) {
      throw new Error(`Não foi possível retornar permissão: ${err.message}`)
    }
  }

  async deletar(id) {
    if(!id) throw new Error("Id não incluído.")

    try {
      const permissao = await Database.permissoes.findOne({
        where: {
          id
        }
      })

      if(!permissao) throw new Error("Permissão não cadastrada.")
    } catch (err) {
      throw new Error(err.msg)
    }

    try {
      await Database.permissoes.destroy({
        where: {
          id
        }
      })
    } catch (err) {
      throw new Error(`Permissão não pode ser deletada: ${err.message}`)
    }
  }

  async atualizar(id, dto) {
    if(!id) throw new Error("Id não incluído.")

    try {
      const permissao = await Database.permissoes.findOne({
        where: {
          id
        }
      })

      if(!permissao) throw new Error("Permissão não cadastrada.")
    } catch (err) {
      throw new Error(err.msg)
    }

    try {
      await Database.permissoes.update({
        ...dto
      }, {
        where: {
          id
        }
      })
    } catch (err) {
      throw new Error(`Permissão não pode ser atualizada: ${err.message}`)
    }
  }
}

module.exports = PermissaoService