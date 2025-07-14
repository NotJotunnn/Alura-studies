/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable class-methods-use-this */
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import Usuario from "../models/usuario.js";
import constants from "../config/constants.js";

class AuthService {
  async login(data) {
    try {
      const usuario = await Usuario.pegarPeloEmail(data.email);

      const senhaIguais = await bcryptjs.compare(data.senha, usuario.senha);

      if (!senhaIguais || !usuario) {
        throw new Error("Usuario ou senha invalido.");
      }

      const accessToken = jsonwebtoken.sign(
        {
          id: usuario.id,
          email: usuario.email,
        },
        constants.jsonSecret,
        {
          expiresIn: 86400,
        }
      );

      return { message: "Usuario conectado", accessToken };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async cadastrarUsuario(data) {
    try {
      if (!data.nome) throw new Error("O nome de usuario é obrigatório.");
      else if (!data.email) {
        throw new Error("O email de usuario é obrigatório.");
      } else if (!data.senha) {
        throw new Error("A senha de usuario é obrigatória.");
      }

      const usuarioJaExistente = await Usuario.pegarPeloEmail(data.email);

      if (usuarioJaExistente) throw new Error("Email de usuário já existente");

      // eslint-disable-next-line no-param-reassign
      data.senha = await bcryptjs.hash(data.senha, 8);

      const usuario = new Usuario(data);

      const resposta = await usuario.salvar(usuario);
      return { message: "usuario criado", content: resposta };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async removerUsuarioDebug(data) {
    try {
      const usuariosExistentes = (await Usuario.pegarUsuarios())
        // eslint-disable-next-line eqeqeq
        .filter((usuario) => usuario.email == data)
        .map((item) => item.id);

      usuariosExistentes.forEach((element) => {
        Usuario.excluir(element);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default AuthService;
