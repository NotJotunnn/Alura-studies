import { createCipheriv, randomBytes, createDecipheriv } from "crypto";

const mensagem = "demonstracaoDoCurso";

const chave = randomBytes(32);

const vI = randomBytes(16);

const cifra = createCipheriv("aes256", chave, vI);
const decifra = createDecipheriv("aes256", chave, vI);

const mensagemCifrada = cifra.update(mensagem, "utf-8", "hex") + cifra.final('hex');
const mensagemDecifrada = decifra.update(mensagemCifrada, "hex", "utf-8") + decifra.final("utf-8");

console.log(mensagemCifrada, mensagemDecifrada)
