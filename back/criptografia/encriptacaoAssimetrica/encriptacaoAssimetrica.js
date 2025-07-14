import { generateKeyPairSync, publicEncrypt, privateDecrypt } from "crypto";

const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,

  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

// console.log(privateKey, publicKey)

const dadosCriptografados = publicEncrypt(publicKey, Buffer.from("mensagemSuperSecreta"))

// console.log(dadosCriptografados.toString("hex"))

// ---- Msg transmitida -----

const dadosDecriptografados = privateDecrypt(privateKey, dadosCriptografados)

console.log(dadosDecriptografados.toString("utf-8"))