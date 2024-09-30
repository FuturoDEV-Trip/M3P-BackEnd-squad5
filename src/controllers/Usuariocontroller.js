const Usuario = require("../models/Usuario");
const Destino = require('../models/Destino');
const { validarCPF } = require("../service/validacoes");
const axios = require("axios");

class Usuariocontroller {

  async cadastrarUsuario(req, res) {

    /*
      #swagger.tags = ['Usuário'],
      #swagger.summary = 'Cadastrar novo usuário'
      #swagger.parameters['body'] = {
          in: 'body',
          description: 'Este endpoint cria um novo usuário',
          schema: {
            $cpf_usuario: '06954171778',
            $nome_usuario: 'Mario Guerreiro',
            $sexo_usuario: 'Masculino',
            $cep_usuario: '88060-400',
            $email_usuario: 'mariog@gmail.com',
            $senha_usuario: '123456',
            $nascimento_usuario: '1984-06-26'
          }
      }
      #swagger.responses: [201] = {
          description: 'Usuário cadastrado com sucesso'
      },
      #swagger.responses: [400] = {
          description: 'Erro de validação, CPF inválido ou campos faltando'
      },
            #swagger.responses: [409] = {
          description: 'Usuário já cadastrado no sistema'
      },
      #swagger.responses: [500] = {
          description: 'Erro ao cadastrar o usuário'
      }
    */

    try {
      const { cpf_usuario, nome_usuario, sexo_usuario, cep_usuario, email_usuario, senha_usuario, nascimento_usuario } = req.body;
      let endereco_usuario = "";

      // Verificação do CPF 
      const cpfValido = await validarCPF(cpf_usuario);
      if (!cpfValido[0]) {
        return res.status(400).json({ message: cpfValido[1] });
      }

      // Verifica duplicidade de usuário
      const usuarioExistente = await Usuario.findOne({
        where: {
          cpf_usuario: cpf_usuario,
        },
      });
      if (usuarioExistente) {
        return res.status(409).json({ message: "Usuário já cadastrado no sistema" });
      }

      // Validação do CEP
      if (!cep_usuario) {
        return res.status(400).json({ message: "O CEP é obrigatório" });
      }

      // Busca o endereço a partir do CEP
      const response = await axios.get(
        `https://viacep.com.br/ws/${cep_usuario}/json/`
      );

      if (response.data && response.data.length > 0) {
        console.log(response.data[0].display_name)
        endereco_usuario = response.data[0].display_name;
      } else {
        endereco_usuario = "";
      }

      // Validação campo sexo 
      if (!sexo_usuario) {
        return res.status(400).json({ message: "O campo sexo é obrigatório" });
      }

      // Validação campo e-mail 
      if (
        email_usuario === "" ||
        email_usuario.indexOf("@") === -1 ||
        email_usuario.indexOf(".") === -1
      ) {
        return res.status(400).json({ message: "Informe um e-mail válido" });
      }

      // Validação da data de nascimento 
      if (!nascimento_usuario) {
        return res.status(400).json({ message: "A data de nascimento é obrigatória" });
      }

      if (!nascimento_usuario.match(/\d{4}-\d{2}-\d{2}/gm)) {
        return res.status(400).json({
          message: "A data de nascimento tem que ser no formato AAAA-MM-DD",
        });
      }

      // Validação da senha do usuário
      if (!senha_usuario) {
        return res.status(400).json({ message: "A senha do usuário é obrigatória" });
      }

      const novoUsuario = await Usuario.create({
        cpf_usuario,
        nome_usuario,
        sexo_usuario,
        cep_usuario,
        endereco_usuario,
        email_usuario,
        senha_usuario,
        nascimento_usuario,
      });

      res.status(201).json(novoUsuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Não foi possível cadastrar o usuário" });
    }
  }

  async listarUsuarios(req, res) {

    /*
      #swagger.tags = ['Usuário'],
      #swagger.summary = 'Listar todos os usuários'
      #swagger.description: 'Este endpoint lista todos os usuários cadastrados',
          schema: {
            $cpf_usuario: '06954171778',
            $nome_usuario: 'Mario Guerreiro',
            $sexo_usuario: 'Masculino',
            $cep_usuario: '88060-400',
            $email_usuario: 'mariog@gmail.com',
            $senha_usuario: '123456',
            $nascimento_usuario: '1984-06-26'
          }
      }
      #swagger.responses: [200] = {
      description: 'OK'
      },
      #swagger.responses: [404] = {
          description: 'Nenhum usuário encontrado'
      },
      #swagger.responses: [500] = {
          description: 'Erro ao listar usuários'
      }
    */

    try {
      const usuarios = await Usuario.findAll();
      if (usuarios.length === 0) {
        return res.status(404).json({ message: "Nenhum usuário encontrado" });
      }
      res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Não foi possível listar todos os usuários" });
    }
  }

  async listarUsuarioPorId(req, res) {

    /*
      #swagger.tags = ['Usuário'],
      #swagger.summary = 'Buscar usuário por ID'
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'Este endpoint busca usuário pelo ID',
          schema: {
            $cpf_usuario: '06954171778',
            $nome_usuario: 'Mario Guerreiro',
            $sexo_usuario: 'Masculino',
            $cep_usuario: '88060-400',
            $email_usuario: 'mariog@gmail.com',
            $senha_usuario: '123456',
            $nascimento_usuario: '1984-06-26'
          }
      }
      #swagger.responses: [200] = {
          description: 'OK'
      },
      #swagger.responses: [404] = {
      description: 'Usuário não encontrado'
      },
      #swagger.responses: [500] = {
          description: 'Erro ao buscar o usuário pelo ID'
      }
    */

    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(200).json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar o usuário pelo ID" });
    }
  }

  async atualizarUsuario(req, res) {

    /*
      #swagger.tags = ['Usuário'],
      #swagger.summary = 'Atualizar usuário por ID'
          #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID do usuário ao ser atualizado',
          required: true,
          schema: {
            type: 'string'
          }
        }
      #swagger.parameters['body'] = {
          in: 'body',
          description: 'Este endpoint permite editar informações do usuário por ID',
          schema: {
            $cpf_usuario: '06954171778',
            $nome_usuario: 'Mario Guerreiro',
            $sexo_usuario: 'Masculino',
            $cep_usuario: '88060-400',
            $email_usuario: 'mariog@gmail.com',
            $senha_usuario: '123456',
            $nascimento_usuario: '1984-06-26'
          }
      }
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses: [200] = {
          description: 'Usuário atualizado com sucesso'
      },
      #swagger.responses: [403] = {
          description: 'Você não tem permissão para editar este usuário'
      },
      #swagger.responses: [404] = {
      description: 'Usuário não encontrado'
      },
      #swagger.responses: [500] = {
          description: 'Erro ao buscar o usuário pelo ID'
      }
    */

    try {
      const { id } = req.params;

      const usuarioAutenticadoId = req.payload ? req.payload.sub : null;

      if (!usuarioAutenticadoId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json( { message: "Usuário não encontrado" });
      }

      if (usuarioAutenticadoId !== usuario.id) {
        return res.status(403).json({ error: "Você não tem permissão para editar este usuário" });
      }

      await usuario.update(req.body);

        res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar o usuário" });
    }
  }

  async deletarUsuario(req, res) {

    /*
      #swagger.tags = ['Usuário'],
      #swagger.summary = 'Deletar usuário por ID'
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'Este endpoint permite remover um usuário por ID',
          required: true,
          schema: {
            type: 'string'
          }
      }
      #swagger.responses: [200] = {
          description: 'Usuário deletado com sucesso'
      },
      #swagger.responses: [403] = {
          description: 'Este usuário não pode ser deletado pois tem destinos associados'
      },
      #swagger.responses: [404] = {
      description: 'Usuário não encontrado'
      },
      #swagger.responses: [500] = {
          description: 'Erro ao buscar o usuário pelo ID'
      }
    */

    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const destinosAssociados = await Destino.count({ where: {id_usuario: usuario.id} });

      if (destinosAssociados > 0) {
        return res.status(403).json({ error: "Este usuário não pode ser deletado pois tem destinos associados" });
      }

      await usuario.destroy();
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao deletar o usuário" });
    }
  }
}

module.exports = new Usuariocontroller();
