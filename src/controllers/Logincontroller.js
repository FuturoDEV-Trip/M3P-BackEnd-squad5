const { compare, hash } = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { sign } = require("jsonwebtoken");

class LoginController {
  async login(req, res) {
    try {
      const email_usuario = req.body.email_usuario;
      const senha_usuario = req.body.senha_usuario;

      if (!email_usuario) {
        return res.status(400).json({ message: "O email é obrigatório" });
      }

      if (!senha_usuario) {
        return res.status(400).json({ message: "A senha é obrigatório" });
      }

      const usuario = await Usuario.findOne({
        where: { email_usuario: email_usuario },
      });

      if (!usuario) {
        return res
          .status(404)
          .json({
            error: "Nenhum usuario corresponde a email e senha fornecidos!",
          });
      }

      const hashSenha = await compare(senha_usuario, usuario.senha_usuario);

      if (hashSenha === false) {
        return res.status(403).json({ mensagem: "Usuário não encontrado" });
      }

      const payload = {
        sub: usuario.id,
        email: usuario.email_usuario,
        nome: usuario.nome_usuario,
      };

      const token = sign(payload, process.env.SECRET_JWT);

      res.status(200).json({ Token: token });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: error, message: "Algo deu errado!" });
    }
  }
}

module.exports = new LoginController();
