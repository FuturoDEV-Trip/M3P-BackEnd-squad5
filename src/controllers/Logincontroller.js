const { compare } = require("bcryptjs");
const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");

class LoginController {
  async login(req, res) {
    try {
      const { email_usuario, senha_usuario } = req.body;

      if (!email_usuario || !senha_usuario) {
        return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
      }

      const usuario = await Usuario.findOne({
        where: { email_usuario: email_usuario },
      });

      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }

      const senhaCorreta = await compare(senha_usuario, usuario.senha_usuario);

      if (!senhaCorreta) {
        return res.status(403).json({ mensagem: "Senha incorreta!" });
      }

      const payload = {
        sub: usuario.id,
        email: usuario.email_usuario,
        nome: usuario.nome_usuario,
      };

      const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: "1d" });
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
    let token = req.headers['authorization']; 

    if (!token) {
        return res.status(401).send('Token não fornecido!');
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trim();
    }

    try {
        const tokenDecode = await jwt.verify(token, process.env.SECRET_JWT);
        const usuario = await Usuario.findOne({ where: { id: tokenDecode.sub } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        await Usuario.update({ flag_usuario: false }, { where: { id: usuario.id } });

        return res.status(200).json({ message: "Usuário deslogado com sucesso!" });
    } catch (error) {
        console.error('Erro no logout:', error.message);  
        return res.status(500).json({ error: error.message, message: "Erro ao deslogar!" });
    }
}

}
module.exports = new LoginController();