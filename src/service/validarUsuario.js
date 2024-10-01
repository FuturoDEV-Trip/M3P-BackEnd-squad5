async function validarUsuario(dadosUsuario) {
    const {
        nome_usuario,
        email_usuario,
        senha_usuario,
        sexo_usuario,
        nascimento_usuario,
        cep_usuario,
    } = dadosUsuario;

    if (!nome_usuario || nome_usuario.length < 3 || nome_usuario.length > 33) {
        throw new Error('Nome deve conter entre 3 e 33 caracteres.');
    }

    if (
        email_usuario === "" ||
        email_usuario.indexOf("@") === -1 ||
        email_usuario.indexOf(".") === -1
      ) {
            throw new Error("Informe um e-mail válido.");    
        }

    if (!senha_usuario) {
        throw new Error("Senha é obrigatória.");      
    }

    if (!sexo_usuario) {
        throw new Error("Gênero é obrigatório.");
    }

    if (!nascimento_usuario) {
        throw new Error("Data de nascimento é obrigatória.");
    }

    if (!nascimento_usuario.match(/\d{4}-\d{2}-\d{2}/)) {
        throw new Error("Data de nascimento deve estar no formato AAAA-MM-DD.");
    }

    if (!cep_usuario) {
        throw new Error("CEP é obrigatório.");
    }

}

module.exports = { validarUsuario };