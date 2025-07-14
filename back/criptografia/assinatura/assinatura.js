import { generateKeyPairSync, createSign, createVerify } from "crypto";

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

let dados = "Essa string vai ser assinada";

// Assinatura

const assinador = createSign("rsa-sha256");

assinador.update(dados);

const assinatura = assinador.sign(privateKey, "hex");

// console.log(assinatura);

// Intermediário

dados += "Arquivo alterado"

// Envio desse documento ----- Chave pública, documento e assinatura

const verificador = createVerify("rsa-sha256");

verificador.update(dados);

const eVerificado = verificador.verify(publicKey, assinatura, "hex")

console.log(eVerificado)
