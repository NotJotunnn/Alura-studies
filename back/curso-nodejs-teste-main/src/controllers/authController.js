import Usuario from "../models/usuario.js";
import AuthService from "../services/authService.js";

const authService = new AuthService();
class AuthController {
  static login = async (req, res) => {
    try {
      const { body } = req;

      if (!body.email) {
        return res.status(400).json({ message: "Email não incluido" });
      }
      if (!body.senha) {
        return res.status(400).json({ message: "Senha não incluida" });
      }

      const usuarioExiste = await Usuario.pegarPeloEmail(body.email);

      if (!usuarioExiste) {
        return res.status(400).json({ message: "Usuário não cadastrado" });
      }

      const login = await authService.login(body);

      return res.status(201).json(login);
    } catch (err) {
      if (err.message === "Usuario ou senha invalido.") {
        return res.status(400).json(err.message);
      }
      return res.status(500).json(err.message);
    }
  };

  static cadastrarUsuario = async (req, res) => {
    try {
      const { body } = req;
      const usuario = await authService.cadastrarUsuario(body);

      return res.status(201).json(usuario);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };
}

export default AuthController;
