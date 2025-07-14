const Database = require("../models");
const { v4: uuidv4 } = require("uuid");

class RoleService {
  async cadastrar(dto) {
    const role = await Database.roles.findOne({
      where: {
        nome: dto.nome,
      },
    });

    if (role) throw new Error("Role já cadastrada");

    try {
      const newRole = await Database.roles.create({
        id: uuidv4(),
        ...dto,
      });

      return newRole;
    } catch (error) {
      throw new Error(`Erro ao cadastrar uma role: ${error.message}`);
    }
  }

  async pegar() {
    return await Database.roles.findAll();
  }

  async pegarPorId(id) {
    if (!id) throw new Error("Id não incluído.");

    try {
      const role = await Database.roles.findOne({
        where: {
          id,
        },
      });

      if(!role) throw new Error("Role não encontrada.")

      return role;
    } catch (err) {
      throw new Error(`Erro ao pegar role por id: ${err.message}`);
    }
  }

  async deletar(id) {
    if (!id) throw new Error("Id não incluído.");

    try {
      const role = await Database.roles.findOne({
        where: {
          id,
        },
      });

      if (!role) throw new Error("Role não cadastrada.");
    } catch (err) {
      throw new Error(`Erro ao pegar role por id: ${err.message}`);
    }

    try {
      await Database.roles.destroy({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new Error(`Erro ao apagar uma role: ${err.message}`);
    }
  }

  async atualizar(dto, id) {
    let role;

    try {
      role = await Database.roles.findOne({
        where: {
          id
        },
      });

      if (!role) throw new Error("Role não cadastrada.");
    } catch (err) {
      throw new Error(`Erro ao pegar role por id: ${err.message}`);
    }

    try {
      console.log(role.dataValues)
      await Database.roles.update(
        {
          ...dto,
        },
        {
          where: {
            id,
          },
        }
      );

      return {
        ...role.dataValues,
        ...dto
      }
    } catch (err) {
      throw new Error(`Erro ao atualizar uma role: ${err.message}`);
    }
  }
}

module.exports = RoleService;
