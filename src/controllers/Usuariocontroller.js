const Usuario = require("../models/Usuario");
const Destino = require("../models/Destino");
const { validarCPF } = require("../service/validarCpf");
const { validarUsuario } = require("../service/validarUsuario");
const { buscarEndereco } = require("../service/buscarEndereco");
const { Op } = require('sequelize');

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
      let coordenadas_usuario = {};

      await validarUsuario(req.body);

      const cpfValido = await validarCPF(cpf_usuario);
      if (!cpfValido[0]) {
        return res.status(400).json({ message: cpfValido[1] });
      }

      // Validação de duplicidade (CPF ou e-mail já cadastrado)
      const usuarioExistente = await Usuario.findOne({
        where: {
          [Op.or]: [{ cpf_usuario }, {email_usuario }]
        }
      });
      if (usuarioExistente) {
          const dadosCadastrados = usuarioExistente.email_usuario === email_usuario ? 'E-mail já cadastrado' : 'CPF já cadastrado';

        return res.status(409).json({ message: dadosCadastrados });
      }

      const { enderecoCompleto, coordenadas } = await buscarEndereco(cep_usuario);
      endereco_usuario = enderecoCompleto;
      coordenadas_usuario = coordenadas;

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

      if (error.message.includes("Nome deve conter entre 3 e 33 caracteres") || 
          error.message.includes("Informe um e-mail válido") || 
          error.message.includes("Senha é obrigatória") ||
          error.message.includes("Gênero é obrigatório") ||
          error.message.includes("Data de nascimento") ||
          error.message.includes("CEP é obrigatório")) {
        return res.status(400).json({ message: error.message });
      }

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
            $nome_usuario: 'Mario Guerreiro',
            $sexo_usuario: 'Masculino',
            $cep_usuario: '88060-400',
            $email_usuario: 'mariog@gmail.com',
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
      const usuarios = await Usuario.findAll({
        attributes: { exclude: ['cpf_usuario', 'senha_usuario'] }
      });
      
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
            $nome_usuario: 'Mario Guerreiro',
            $sexo_usuario: 'Masculino',
            $cep_usuario: '88060-400',
            $email_usuario: 'mariog@gmail.com',
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
      const usuario = await Usuario.findByPk(id, {
        attributes: { exclude: ['cpf_usuario', 'senha_usuario'] }
      });
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

      const { cpf_usuario, ...dadosAtualizados } = req.body;

      await usuario.update(dadosAtualizados);

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
      #swagger.security = [{
        "bearerAuth": []
      }]
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

      const usuarioAutenticadoId = req.payload ? req.payload.sub : null;

      if (!usuarioAutenticadoId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }


      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      if (usuarioAutenticadoId !== usuario.id) {
        return res.status(403).json({ error: "Você não tem permissão para editar este usuário" });
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
