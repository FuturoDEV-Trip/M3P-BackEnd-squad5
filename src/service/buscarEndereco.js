const axios = require("axios");

async function buscarEndereco(cep) {
  try {
    const response = await axios.get(`https://cep.awesomeapi.com.br/json/${cep}`);

    if (!response.data) {
      throw new Error("CEP inválido");
    }

    const { address, district, city, state, lat, lng } = response.data;

    const enderecoCompleto = `${address}, ${district}, ${city} - ${state}`;

    const coordenadas = {
      latitude: lat || null,
      longitude: lng || null,
    };

    return { enderecoCompleto, coordenadas, localidade: city };

  } catch (error) {
    console.error("Erro ao buscar o endereço pelo CEP:", error.message);
    throw new Error("Erro ao buscar o endereço pelo CEP");
  }
}

module.exports = { buscarEndereco };
