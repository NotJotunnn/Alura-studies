const { compare } = require("bcrypt");
const { getDb } = require("../util/database");


class User {
  constructor(username, email, senha) {
    this.username = username;
    this.email = email;
    this.senha = senha;
  }

  async save() {
    const db = getDb();

    return db.collection("users").insertOne(this);
  }

  static async findOne(dto) {
    const db = getDb();

    const conta = await db.collection("users").findOne({email: dto.email})

    if(await compare(dto.senha, conta.senha)) return conta

    return null
  }
}

module.exports = User;
