const { compare } = require("bcryptjs");
const Database = require("../models");
const { sign } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");
const { v4: uuidv4 } = require("uuid");
const { hash } = require("bcryptjs");

class AuthService {
  async login(dto) {
    if (!dto.email || !dto.senha)
      throw new Error("Email e senha não incluídos.");

    const usuario = await Database.usuarios.findOne({
      attributes: ["id", "email", "senha"],
      where: {
        email: dto.email,
      },
    });

    if (!usuario) throw new Error("Usuário não cadastrado.");

    const senhaIguais = await compare(dto.senha, usuario.senha);

    if (!senhaIguais) throw new Error("Usuário ou senha inválida.");

    const accessToken = sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      jsonSecret.secret,
      {
        expiresIn: "8W",
      }
    );

    return { accessToken };
  }

  async cadastrarUsuario(dto) {
    const usuario = await Database.usuarios.findOne({
      where: {
        email: dto.email,
      },
    });

    if (usuario) throw new Error("Usuário já cadastrado.");

    try {
      const novoUsuario = await Database.usuarios.create({
        id: uuidv4(),
        ...dto,
        senha: await hash(dto.senha, 8),
      });

      return novoUsuario;
    } catch (err) {
      throw new Error(`Erro ao cadastrar novo usuário. ${err.message}`);
    }
  }
}

module.exports = AuthService;
