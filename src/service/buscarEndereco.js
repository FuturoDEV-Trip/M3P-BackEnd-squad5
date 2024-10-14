const axios = require("axios");

async function buscarEndereco(cep) {
    try {

      console.log(`Buscando endereço para CEP: ${cep}`);
        const responseViaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (responseViaCep.data.erro) {
          console.error(`CEP inválido: ${cep}`);
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
        } else {
          console.error(`Erro ao buscar as coordenadas para o endereço: ${enderecoCompleto}`);
        }

        return { enderecoCompleto, coordenadas, localidade };

    } catch (error) {
      console.error('Erro ao buscar o endereço pelo CEP', error);
      throw new Error("Erro ao buscar o endereço pelo CEP");
    }
  }

  module.exports = { buscarEndereco };