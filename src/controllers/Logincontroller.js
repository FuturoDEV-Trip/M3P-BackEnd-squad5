const { compare, hash } = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { sign } = require("jsonwebtoken");

class LoginController {
  async login(req, res) {
    try {
      const { email_usuario, senha_usuario } = req.body;

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

      const token = sign(payload, process.env.SECRET_JWT, { expiresIn: "1d" });
      await Usuario.update({ flag_usuario: true },
        { where: { id: usuario.id } }
      )

      res.status(200).json({
        Token: token,
        usuario: {
          id: usuario.id,
          nome_usuario: usuario.nome_usuario,
          email_usuario: usuario.email_usuario,
          cep_usuario: usuario.cep_usuario,
          endereco_usuario: usuario.endereco_usuario,
          nascimento_usuario: usuario.nascimento_usuario,
          sexo_usuario: usuario.sexo_usuario,
          flag_usuario: usuario.flag_usuario,
        },
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: error, message: "Algo deu errado!" });
    }
  }

  async logout(req, res) {
    try {
      const userId = req.usuario.id;
      await Usuario.update(
        { flag_usuario: false },
        { where: { id: userId } }
      );
      res.status(200).json({ message: "Usuário deslogado com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message, message: "Erro ao deslogar!" });
    }
  }
}
module.exports = new LoginController();