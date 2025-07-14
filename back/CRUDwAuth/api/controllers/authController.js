const AuthService = require("../services/authService");

const authService = new AuthService();

class AuthController {
  static async login(req, res) {
    const { email, senha } = req.body;

    try {
      const login = await authService.login({ email, senha });

      res.status(200).send({ data: login })
    } catch (err) {
      res.status(401).send({ message: err.message })
    }
  }

  static async cadastrar(req, res) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha)
      res
        .status(400)
        .send({ message: "Dados nome, email e senha não preenchidos." });

    try {
      const usuario = await authService.cadastrarUsuario({
        nome,
        email,
        senha,
      });

      res.status(201).send(usuario);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
}

module.exports = AuthController;
