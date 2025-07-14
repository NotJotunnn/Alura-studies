import jwt from "jsonwebtoken"

const chave = "ChaveSuperSecreta"

const token = jwt.sign({
    mensagem: "Carros são chatos zzzz",
    curso: "Node & segurança"
  }, chave
)

// console.log(token.split('.'))

const tokenDecodificado = jwt.verify(token, chave)

console.log(new Date(tokenDecodificado.iat).getUTCFullYear())