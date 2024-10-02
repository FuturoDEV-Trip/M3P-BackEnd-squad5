const Destino = require("../models/Destino");
const { buscarEndereco } = require("../service/buscarEndereco"); // Reutiliza o serviço de validação de endereço

class DestinoController {

  // Método para cadastrar um novo destino
  async cadastrarDestino(req, res) {
    try {
      const {
        descricao_destino,
        nome_destino,
        cep_destino,
        img_destino
      } = req.body;

      const usuarioAutenticado = req.payload ? req.payload.sub : null;

      // Validações básicas de campos obrigatórios
      if (!descricao_destino) {
        return res.status(400).json({ message: "A descrição é obrigatória" });
      }

      if (!cep_destino) {
        return res.status(400).json({ message: "O CEP é obrigatório!" });
      }

      if (!nome_destino) {
        return res.status(400).json({ message: "O nome do Destino é obrigatório" });
      }

      // Verifica se o destino já foi cadastrado por esse usuário
      const destinoExistente = await Destino.findOne({
        where: {
          cep_destino: cep_destino,
          id_usuario: usuarioAutenticado,
        },
      });

      if (destinoExistente) {
        return res.status(409).json({ message: "Destino já cadastrado para este usuário" });
      }

      // Busca o endereço e coordenadas utilizando o serviço buscarEndereco
      const { enderecoCompleto, coordenadas } = await buscarEndereco(cep_destino);

      if (!enderecoCompleto || !coordenadas.latitude || !coordenadas.longitude) {
        return res.status(400).json({ message: "Erro ao obter o endereço com base no CEP" });
      }

      // Cria o novo destino com o endereço e coordenadas obtidos
      const destino = await Destino.create({
        id_usuario: usuarioAutenticado,
        descricao_destino,
        nome_destino,
        cep_destino,
        img_destino,
        localidade_destino: enderecoCompleto, // Endereço completo obtido
        coordenadas_destino: `${coordenadas.latitude},${coordenadas.longitude}`, // Coordenadas obtidas
      });

      res.status(201).json(destino);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Não foi possível cadastrar o Destino" });
    }
  }

  // Método para excluir um destino
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

  // Método para alterar um destino existente
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

      res.status(200).json({ message: "Destino alterado com sucesso" });
      res.json(destino);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Não foi possível atualizar o Destino" });
    }
  }

  // Método para listar todos os destinos do usuário autenticado
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

  // Método para listar um destino específico
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
}

module.exports = new DestinoController();
