const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
    try {
        let token = req.headers['authorization'];

        if (!token) {
            console.log('Erro: Nenhum token foi fornecido');
            return res.status(401).json("Token não fornecido!");
        }

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
            if (err) {
                console.log('Erro na verificação do token:', err);
                return res.status(403).json("Token inválido ou expirado");
            }
            req.payload = decoded;
            next();
        });
    } catch (error) {
        console.error('Erro inesperado no auth middleware:', error.message);
        return res.status(401).json({ message: "Token inválido ou expirado", cause: error.message });
    }
}

module.exports = { auth };
