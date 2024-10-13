const Usuario = require("../models/Usuario");
const Destino = require("../models/Destino");
const { validarCPF } = require("../service/validarCpf");
const { validarUsuario } = require("../service/validarUsuario");
const { Op } = require('sequelize');

class Usuariocontroller {

  async cadastrarUsuario(req, res) {

    try {
      const { cpf_usuario, nome_usuario, sexo_usuario, cep_usuario, endereco_usuario, email_usuario, senha_usuario, nascimento_usuario } = req.body;

      await validarUsuario(req.body);

      const cpfValido = await validarCPF(cpf_usuario);
      if (!cpfValido[0]) {
        return res.status(400).json({ message: cpfValido[1] });
      }

      const usuarioExistente = await Usuario.findOne({
        where: {
          [Op.or]: [{ cpf_usuario }, {email_usuario }]
        }
      });
      if (usuarioExistente) {
          const dadosCadastrados = usuarioExistente.email_usuario === email_usuario ? 'E-mail já cadastrado' : 'CPF já cadastrado';

        return res.status(409).json({ message: dadosCadastrados });
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
    try {
        const { nome_usuario, email_usuario } = req.query;  

        let whereCondition = {};

        if (nome_usuario) {
            whereCondition.nome_usuario = nome_usuario;
        }

        if (email_usuario) {
            whereCondition.email_usuario = email_usuario;
        }

        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['cpf_usuario', 'senha_usuario'] },
            where: whereCondition 
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
