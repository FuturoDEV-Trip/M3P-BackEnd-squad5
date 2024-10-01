const axios = require("axios");

async function buscarEndereco(cep) {
    try {
        const responseViaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (responseViaCep.data.erro) {
            throw new Error("CEP inválido");
        }
        const { logradouro, bairro, localidade, uf } = responseViaCep.data;
        const enderecoCompleto = `${logradouro}, ${bairro}, ${localidade} - ${uf}`;

        const responseOpenStreetMap = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${logradouro},${bairro},${localidade},${uf}`);

        let coordenadas = {};
        if (responseOpenStreetMap.data && responseOpenStreetMap.data.length > 0) {
          coordenadas = {
            latitude: responseOpenStreetMap.data[0].lat,
            longitude: responseOpenStreetMap.data[0].lon
          };
        }

        return { enderecoCompleto, coordenadas };

    } catch (error) {
      throw new Error("Erro ao buscar o endereço pelo CEP");
    }
  }

  module.exports = { buscarEndereco };