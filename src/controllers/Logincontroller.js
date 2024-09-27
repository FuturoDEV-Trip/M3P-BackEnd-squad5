const { compare, hash } = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { sign } = require("jsonwebtoken");

class LoginController {
  async login(req, res) {
    /*  
       #swagger.tags = ['Usuario'],
       #swagger.parameters['body'] = {
            in: 'body',
            description: 'criar o Token do Usuário',
            schema: {
                 $email_usuario: "mariog@gmail.com",
                 $senha_usuario: "123456"
            }
          }
          #swagger.summary = 'Gerar Token para o usuário'
          #swagger.responses: [200] = {
                 description: "Token criado com Sucesso"
              },
          #swagger.responses: [400] ={
                 description: "Campo Obrigatório"
            },
          #swagger.responses: [403] ={
                 description: "Usuário sem Permissão"
            },            
          #swagger.responses: [404] ={
                 description: "Usuário não encontrado"
            },
           #swagger.responses: [500] ={
                 description: "Erro Geral"
            }          
   */
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
