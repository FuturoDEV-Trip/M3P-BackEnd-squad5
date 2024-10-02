const Destino = require("../models/Destino");
const axios = require("axios");
class DestinoController {
  
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
          message: "Usuario sem permissão para exclusão deste Destino",
        });
      }

      Destino.destroy({
        where: {
          id: id,
        },
      });

      res.status(204).json({ message: "Destino excluido com sucesso" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Não possível localizar o Destino" });
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
        return res.status(403).json({ message: "Usuario sem permissão" });
      }

      destino.update(req.body);

      await destino.save();

      res.status(200).json({ message: "Destino alterado com sucesso" });

      res.json(destino);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Não possível atualizar o Destino" });
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
        return res
          .status(404)
          .json({ message: "Usuario sem destino Cadastrado" });
      }

      const usuarioAutenticado = req.payload ? req.payload.sub : null;

      if (destino.id_usuario !== usuarioAutenticado) {
        return res.status(403).json({ message: "Usuario sem permissão" });
      }

      res.json(destino);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        error: "Não possível listar o Destino especifico",
        error: error,
      });
    }
  }

  async cadastrarDestino(req, res) {
   
    try {

      const {
        descricao_destino,
        nome_destino,
        cep_destino,
        img_destino }
        = req.body

      const usuarioAutenticado = req.payload ? req.payload.sub : null;


      if (!descricao_destino) {
        return res
          .status(400)
          .json({ message: "A descrição é obrigatória" });
      }

      if (!cep_destino) {
        return res
          .status(400)
          .json({ message: 'O cep é obrigatório!' })
      }

      if (!nome_destino) {
        return res
          .status(400)
          .json({ message: "o nome do Destino é obrigatório" });
      }

      const destinoExistente = await Destino.findOne({
        where: {
          cep_destino: cep_destino,
          id_usuario: usuarioAutenticado,
        },
      });

      if (destinoExistente) {
        return res
          .status(409)
          .json({ message: "Destino já cadastrado para este usuário" });
      }

      let buscaCoordenadas = await axios.get(`https://nominatim.openstreetmap.org/search?postalcode=${cep_destino}&format=json&addressdetails=1&limit=1`)
      let lat = null
      let lon = null
      let display_name = null

      if (buscaCoordenadas.data && buscaCoordenadas.data.length > 0) {
        lat = buscaCoordenadas.data[0].lat
        lon = buscaCoordenadas.data[0].lon
        display_name = buscaCoordenadas.data[0].display_name
      }
      const coordenadas = `${lat},${lon}`;

      const destino = await Destino.create({
        id_usuario: usuarioAutenticado,
        descricao_destino,
        nome_destino,
        cep_destino,
        img_destino,
        localidade_destino: display_name,
        coordenadas_destino: coordenadas,
      });

      res.status(201).json(destino);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Não possível cadastrar o Destino" });
    }
  }
}

module.exports = new DestinoController();
