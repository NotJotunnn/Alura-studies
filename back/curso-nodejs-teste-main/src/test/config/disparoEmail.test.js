import { describe, expect, it } from "@jest/globals";
import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
});

const verificarConexao = () => new Promise((resolver, reject) => {
  transporter.verify((error, success) => {
    if (error) reject(error);
    else resolver(success);
  });
});

describe("Testando disparo de email", () => {
  it("O sistema deve validar a conexão com o sistema de disparo de email", async () => {
    const validarConexao = await verificarConexao();

    expect(validarConexao).toStrictEqual(true);
  });

  it("O sistema deve enviar um email", async () => {
    const info = await transporter.sendMail({
      from: '"Example Team" <team@example.com>',
      to: "leandro.fcode@gmail.com",
      subject: "Hello",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    expect(info.response).toMatch("250 Accepted");
  });
});
