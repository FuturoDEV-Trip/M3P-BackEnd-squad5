const { stack } = require("sequelize/lib/utils");
const Destino = require("../models/Destino");
const { buscarEndereco } = require("../service/buscarEndereco");

class DestinoController {

  async listarDestinosPublicos(req, res) {
    try {
      const destinos = await Destino.findAll();
      res.status(200).json(destinos);
    } catch (error) {
      res.status(500).json({ error: "Não foi possível listar todos os destinos" });
    }
  }

  async listarTodos(req, res) {
    try {
      const usuarioAutenticado = req.payload ? req.payload.sub : null;
      const destino = await Destino.findAll({
        where: {
          id_usuario: usuarioAutenticado,
        },
      });
      res.json(destino);
    } catch (error) {
      res.status(500).json({ error: "Não foi possível listar os destinos" });
    }
  }

  async listarEspecifico(req, res) {
    try {
      const { id } = req.params;
      const destino = await Destino.findByPk(id);
      if (!destino) {
        return res.status(404).json({ message: "Destino não cadastrado" });
      }

      const usuarioAutenticado = req.payload ? req.payload.sub : null;

      if (destino.id_usuario !== usuarioAutenticado) {
        return res.status(403).json({ message: "Usuário sem permissão" });
      }

      res.json(destino);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Não foi possível listar o Destino" });
    }
  }

  async cadastrarDestino(req, res) {

    try {
      const {
        descricao_destino,
        nome_destino,
        cep_destino,
        img_destino,
        categoria_destino,
        complemento_destino,
        localidade_destino
      } = req.body;

      const usuarioAutenticado = req.payload ? req.payload.sub : null;

      if (!descricao_destino) {
        return res.status(400).json({ message: "A descrição é obrigatória" });
      }

      if (!cep_destino) {
        return res.status(400).json({ message: "O CEP é obrigatório!" });
      }

      if (!nome_destino) {
        return res.status(400).json({ message: "O nome do Destino é obrigatório" });
      }

      const destinoExistente = await Destino.findOne({
        where: {
          localidade_destino: localidade_destino,
          id_usuario: usuarioAutenticado,
        },
      });

      if (destinoExistente) {
        return res.status(409).json({ message: "Destino já cadastrado para este usuário" });
      }


      const { enderecoCompleto, coordenadas, localidade } = await buscarEndereco(cep_destino);

      if (!enderecoCompleto || !coordenadas.latitude || !coordenadas.longitude) {
        return res.status(400).json({ message: "Erro ao obter o endereço com base no CEP" });
      }

      const destino = await Destino.create({
        id_usuario: usuarioAutenticado,
        descricao_destino,
        nome_destino,
        cep_destino,
        img_destino,
        categoria_destino,
        localidade_destino: enderecoCompleto,
        cidade_destino: localidade,
        complemento_destino,
        latitude_destino: coordenadas.latitude,
        longitude_destino: coordenadas.longitude

      });


      res.status(201).json(destino);
    } catch (error) {
      console.error("Erro ao cadsatrar destino: ", error.message, error.stack);
      res.status(500).json({
        error: "Não foi possível cadastrar o Destino",
        detalhes: error.message,
        stack: error.stack
      });
    }
  }

  async alterarDestino(req, res) {
    try {
      const { id } = req.params;

      const destino = await Destino.findByPk(id);

      if (!destino) {
        return res.status(404).json({ message: "Destino não encontrado" });
      }

      const usuarioAutenticado = req.payload ? req.payload.sub : null;

      if (destino.id_usuario !== usuarioAutenticado) {
        return res.status(403).json({ message: "Usuário sem permissão" });
      }

      await destino.update(req.body);
      await destino.save();

      res.status(200).json({ message: "Destino alterado com sucesso", destino });

    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Não foi possível atualizar o Destino" });
    }
  }

  async excluirDestino(req, res) {
    try {
      const { id } = req.params;

      const destino = await Destino.findByPk(id);

      const usuarioAutenticado = req.payload ? req.payload.sub : null;
      if (!destino) {
        return res.status(404).json({ message: "Destino não encontrado" });
      }
      if (destino.id_usuario !== usuarioAutenticado) {
        return res.status(403).json({
          message: "Usuário sem permissão para exclusão deste Destino",
        });
      }

      await Destino.destroy({
        where: {
          id: id,
        },
      });

      res.status(204).json({ message: "Destino excluído com sucesso" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Não foi possível excluir o Destino" });
    }
  }
}

module.exports = new DestinoController();
