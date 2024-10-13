const axios = require('axios');

async function validarCPF(cpf) {
  cpf = cpf.replace(/\D+/g, ""); // Remove pontos e traços
  if (!cpf) {
    return [false, "CPF deve ser obrigatório"];
  }

  if (cpf.length !== 11) {
    return [false, "CPF inválido. Deve conter 11 dígitos."];
  }

  // Realiza a validação dos dígitos verificadores
  const primeiroDigitoValido = await validarDigito(cpf, 9);
  const segundoDigitoValido = await validarDigito(cpf, 10);

  if (!primeiroDigitoValido || !segundoDigitoValido) {
    return [false, "Digito Incorreto."];
  }

  return [true];
}

async function validarDigito(cpf, posicao) {
  const soma = cpf
    .slice(0, posicao)
    .split("")
    .reduce(
      (acc, digit, index) => acc + parseInt(digit) * (1+posicao - index),
      0
    );

  const resto = soma  % 11;
  const digitoVre = resto < 2 ? 0 : 11 - resto;
  const digitoVerificador = parseInt(cpf.charAt(posicao));

  return digitoVre === digitoVerificador;
}

module.exports = { validarCPF };
