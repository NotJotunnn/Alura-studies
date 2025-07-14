const { hash } = require("bcryptjs");
const Database = require("../models");

class UsuarioService {
  async pegarTodosUsuarios() {
    return await Database.usuarios.findAll({
      include: [
        {
          model: Database.permissoes,
          as: "usuarios_permissoes",
          attributes: ["id", "nome"]
        },
        {
          model: Database.roles,
          as: "usuarios_roles",
          attributes: ["id", "nome"]
        }
      ]
    });
  }

  async pegarUsuarioPorid(id) {
    try {
      return await Database.usuarios.findOne({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new Error("Usuário não encontrado.");
    }
  }

  async atualizarUsuario(id, dto) {
    let user;

    try {
      user = await Database.usuarios.findOne({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new Error("Usuário não encontrado.");
    }

    if (dto.email) {
      const userMail = await Database.usuarios.findOne({
        where: {
          email: dto.email,
        },
      });

      if (userMail && userMail.id != user.id)
        throw new Error("Email já utilizado.");
    }

    try {
      await Database.usuarios.update(
        {
          ...user,
          ...dto,
          senha: dto.senha ? await hash(dto.senha, 8) : user.senha,
        },
        {
          where: {
            id,
          },
        }
      );

      return await Database.usuarios.findOne({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new Error("Erro ao atualizar usuário existente.");
    }
  }

  async deletarUsuario(id) {
    const user = await Database.usuarios.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new Error("Usuário não encontrado");

    try {
      await Database.usuarios.destroy({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new Error("Não foi possível deletar o usuário.");
    }
  }
}

module.exports = UsuarioService;
