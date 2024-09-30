const Usuario = require("../models/Usuario");
const { validarCPF } = require("../service/validacoes");
const axios = require("axios");
class Usuariocontroller {
  //--- Rota para cadastrar o usuário ---
  async cadastrarUsuario(req, res) {
    /*  
            #swagger.tags = ['Usuario'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Adiciona um novo Usuario',
                schema: {
                    $cpf_usuario: "06954171778",
                    $nome_usuario: "Mario Guerreiro",
                    $sexo_usuario: "Masculino",
                    $cep_usuario: "88060-400",
                    $email_usuario: "mariog@gmail.com",
                    $senha_usuario: "123456",
                    $nascimento_usuario: "1984-06-26"
            }
           }
           #swagger.summary = 'Cadastrar Novo Usuário'
            #swagger.responses: [201] = {
                 description: "Usuário criado com Sucesso"
              },
            #swagger.responses: [400] ={
                 description: "Campo Obrigatório"
            },
              #swagger.responses: [409] ={
                 description: "Usuário já existente"
            },
              #swagger.responses: [500] ={
                 description: "Erro Geral"
            }
    */

    try {
      const cpf_usuario = req.body.cpf_usuario;
      const nome_usuario = req.body.nome_usuario;
      const sexo_usuario = req.body.sexo_usuario;
      const cep_usuario = req.body.cep_usuario;
      const email_usuario = req.body.email_usuario;
      const senha_usuario = req.body.senha_usuario;
      const nascimento_usuario = req.body.nascimento_usuario;
      let endereco_usuario = "";

      // --- Verificação do CPF ---
      const cpfValido = await validarCPF(cpf_usuario);
      if (!cpfValido[0]) {
        return res.status(400).json({ message: cpfValido[1] });
      }
      // --- Verifica Duplicidade de usuário ---
      const usuarioExistente = await Usuario.findOne({
        where: {
          cpf_usuario: cpf_usuario,
        },
      });
      if (usuarioExistente) {
        return res
          .status(409)
          .json({ mensagem: "Usuario já cadastrado no sistema" });
      }

      //Validação do CEP
      if (!cep_usuario) {
        return res.status(400).json({ message: "O CEP é obrigatório" });
      }

      // --- Carregar endereço do cep fornecido ---
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&postalcode=${cep_usuario}&country=Brazil&limit=1`
      );

      if (response.data && response.data.length > 0) {
        endereco_usuario = response.data[0].display_name;
      } else {
        endereco_usuario = "";
      }

      // ---- Validação campo Sexo ----
      if (!sexo_usuario) {
        return res.status(400).json({ message: "O Campo sexo é obrigatório" });
      }

      // ---- Validação campo email ----
      if (
        email_usuario === "" ||
        email_usuario.indexOf("@") === -1 ||
        email_usuario.indexOf(".") === -1
      ) {
        return res.status(400).json({ message: "Informe um email válido" });
      }

      // ---- Validação da data de nascimento -----
      if (!nascimento_usuario) {
        return res
          .status(400)
          .json({ message: "A data de nascimento é obrigatória" });
      }

      //Validar senha do usuário
      if (!senha_usuario) {
        return res
          .status(400)
          .json({ message: "A senha do usuário é obrigatória" });
      }

      if (!nascimento_usuario.match(/\d{4}-\d{2}-\d{2}/gm)) {
        return res.status(400).json({
          message: "A data de nascimento tem que ser no formato AAAAMMDD",
        });
      }

      // --- INCLUI O NOVO USUARIO ---
      const usuario = await Usuario.create({
        cpf_usuario,
        nome_usuario,
        sexo_usuario,
        cep_usuario,
        endereco_usuario,
        email_usuario,
        senha_usuario,
        nascimento_usuario,
      });

      res.status(201).json(usuario);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Não fo possível cadastrar o usuario" });
    }
  }
}

module.exports = new Usuariocontroller();
