// const axios = require("axios");

// async function buscarEndereco(cep) {
//   try {
//     const responseViaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
//     if (responseViaCep.data.erro) {
//       throw new Error("CEP inválido");
//     }
//     const { logradouro, bairro, localidade, uf } = responseViaCep.data;
//     const enderecoCompleto = `${logradouro}, ${bairro}, ${localidade} - ${uf}`;

//     const responseOpenStreetMap = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${logradouro},${bairro},${localidade},${uf}`);

//     let coordenadas = {};
//     if (responseOpenStreetMap.data && responseOpenStreetMap.data.length > 0) {
//       coordenadas = {
//         latitude: responseOpenStreetMap.data[0].lat,
//         longitude: responseOpenStreetMap.data[0].lon
//       };
//     }

//     return { enderecoCompleto, coordenadas, localidade };

//   } catch (error) {
//     throw new Error("Erro ao buscar o endereço pelo CEP");
//   }
// }

// module.exports = { buscarEndereco };

const axios = require("axios");

async function buscarEndereco(cep) {
  try {
    // Usando a API da AwesomeAPI para buscar informações do CEP
    const response = await axios.get(`https://cep.awesomeapi.com.br/json/${cep}`);

    if (!response.data) {
      throw new Error("CEP inválido");
    }

    // Extrai os dados retornados pela API
    const { address, district, city, state, lat, lng } = response.data;

    // Montando o endereço completo
    const enderecoCompleto = `${address}, ${district}, ${city} - ${state}`;

    // Coordenadas retornadas pela API, se disponíveis
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
