const { proteger } = require('./authMiddleware');

const admin = (req, res, next) => {
    // Primeiro, verifica se o usuário está logado
    proteger(req, res, () => {
        // Se logado, verifica se é admin
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            res.status(403).send('Acesso negado. Apenas para administradores.');
        }
    });
};

module.exports = { admin };