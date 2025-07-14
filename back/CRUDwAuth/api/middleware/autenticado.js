const { verify, decode } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).send({ message: "Token de acesso não informado." });

  const [, accessToken] = token.split(" ");

  try {
    verify(accessToken, jsonSecret.secret);
    const { id, email } = decode(accessToken)

    req.usuarioId = id
    req.usuarioEmail = email

    return next()
  } catch (err) {
    res.status(401).send({ Message: "Usuário não autorizado." });
  }
};
