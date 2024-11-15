const Destino = require("../models/Destino");
const axios = require("axios");
class DestinoController {
  //Rota para excluir informações de um destino específico cadastrado pelo usuário.
  async excluirDestino(req, res) {
    /*  
       #swagger.tags = ['Destino']
       #swagger.summary = 'Rota para Excluir um Destino do usuário Logado'
       #swagger.description = 'Rota para excluir informações de um destino específico cadastrado pelo usuário.'
       
       #swagger.responses: [204] = {
             description: "Destino excluido com sucesso"
       },
       #swagger.responses: [401] ={
            description: "Usuario sem permissão."
       },
       #swagger.responses: [403] ={
            description: "Usuario sem permissão para exclusão deste Destino"
       },
       #swagger.responses: [404] ={
            description: "Destino não encontrado"
       },
       #swagger.responses: [500] ={
            description: "Erro Geral"
       }
    */
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

  //Rota para alterar informações de um destino específico cadastrado pelo usuário.
  async alterarDestino(req, res) {
    /*  
       #swagger.tags = ['Destino']
       #swagger.summary = 'Alterar o Destino do usuário Logado'
       #swagger.parameters['id'] = { 
           description: 'Alterar um Destino'
       }
       #swagger.responses: [200] = {
             description: "Destino alterado com sucesso"
       },
       #swagger.responses: [401] ={
            description: "Usuario sem permissão."
       },
       #swagger.responses: [403] ={
            description: "Usuario sem permissão para alteração deste Destino"
       },
       #swagger.responses: [404] ={
            description: "Destino não encontrado"
       },
       #swagger.responses: [500] ={
            description: "Erro Geral"
       }
    */

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

  //Rota para listar todos os locais cadastrados pelo usuário autenticado.
  async listarTodos(req, res) {
    /*  
       #swagger.tags = ['Destino']
       #swagger.description = 'Rota para listar todos os locais cadastrados pelo usuário autenticado.'
       #swagger.summary = 'Listar todos os destinos do usuário logado'

       #swagger.responses: [200] = {
             description: "Destino listado com sucesso"
       },
       #swagger.responses: [401] ={
            description: "Usuario sem permissão."
       },
       #swagger.responses: [403] ={
            description: "Usuario sem permissão para listar Destinos de outro usuário"
       },
       #swagger.responses: [404] ={
            description: "Destino não encontrado"
       },
       #swagger.responses: [500] ={
            description: "Erro Geral"
       }
    */

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

  //Rotas para listar informações detalhadas de um destino específico cadastrado pelo usuário logado
  async listarEspecifico(req, res) {
    /*  
       #swagger.tags = ['Destino']
       #swagger.summary = 'Listar Destino especifico do Usuário'
       #swagger.responses: [200] = {
             description: "Destino Listado com sucesso"
       },
       #swagger.responses: [401] ={
            description: "Usuario sem permissão."
       },
       #swagger.responses: [403] ={
            description: "Usuario sem permissão para listar Destino de outro usuário"
       },
       #swagger.responses: [404] ={
            description: "Destino não encontrado"
       },
       #swagger.responses: [500] ={
            description: "Erro Geral"
       }

    */
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

  //Rota para cadastrar um destino para o usuário logado.
  async cadastrarDestino(req, res) {
  /*  
    #swagger.tags = ['Destino'],
       #swagger.parameters['body'] = { 
         in: 'body',
           description: 'Adiciona um novo Destino',
           schema:{
               $id_usuario: 1,
               $localidade_destino: "Praias de Floripa",
               $uf_destino: "SC",
               $nome_destino: "no do destino",
           }
       }
       #swagger.summary = 'Cadastrar Novo Destino'
       #swagger.responses: [201] = {
             description: "Destino cadastrado com sucesso"
       },
       #swagger.responses: [401] ={
            description: "Usuario sem permissão"
       },
       #swagger.responses: [404] ={
            description: "Destino não encontrado"
       },
       #swagger.responses: [409] ={
            description: "Destino já cadastrado para este Usuário"
       },       
       #swagger.responses: [500] ={
            description: "Erro Geral"
       }
   */
    try {
      const id_usuario = req.body.id_usuario;
      const localidade_destino = req.body.localidade_destino;
      const uf_destino = req.body.uf_destino;
      const nome_destino = req.body.nome_destino;

      const usuarioAutenticado = req.payload ? req.payload.sub : null;

      if (!id_usuario) {
        return res
          .status(400)
          .json({ message: "o código do usuário é obrigatório" });
      }

      if (!localidade_destino) {
        return res
          .status(400)
          .json({ message: "A localidade é obrigatória" });
      }

      if (!uf_destino) {
        return res
          .status(400)
          .json({ message: "o Estado é obrigatório" });
      }

      if (!nome_destino) {
        return res
          .status(400)
          .json({ message: "o nome do Destino é obrigatório" });
      }

      const destinoExistente = await Destino.findOne({
        where: {
          localidade_destino: localidade_destino,
          uf_destino: uf_destino,
          id_usuario: usuarioAutenticado,
        },
      });

      if (destinoExistente) {
        return res
          .status(409)
          .json({ message: "Destino já cadastrado para este usuário" });
      }
      // Pegar as informações da localidade solicitada
      let response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&county=${localidade_destino}&state=${uf_destino}`
      );
      let descricao = null;
      let latitude = null;
      let longitude = null;
      let coordenadas = null;

      if (response.data && response.data.length > 0) {
        descricao = response.data[0].display_name;
        latitude = response.data[0].lat;
        longitude = response.data[0].lon;
        coordenadas = `Latitude: ${latitude} - Longitude: ${longitude}`;
      }

      const destino = await Destino.create({
        id_usuario,
        descricao_destino: descricao,
        nome_destino,
        uf_destino,
        localidade_destino,
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
