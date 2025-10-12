'use strict';
const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Middleware para popular `req.user` se um token JWT válido for encontrado.
 * NUNCA bloqueia a requisição, permitindo que rotas públicas funcionem.
 */
exports.protegerOpcional = async (req, res, next) => {
    let token;
    if (req.cookies && req.cookies.token) {
        try {
            const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            req.user = await User.findByPk(decoded.id, {
                attributes: { exclude: ['senha'] }
            });
        } catch (err) {
            // Token inválido ou expirado. Limpa o cookie e segue como não logado.
            res.clearCookie('token');
            req.user = null;
        }
    }
    return next();
};

/**
 * Middleware para PROTEGER rotas. Garante que apenas usuários autenticados prossigam.
 * Responde com JSON para rotas de API e redireciona para rotas de página.
 */
exports.proteger = (req, res, next) => {
    // `protegerOpcional` já deve ter tentado popular `req.user`.
    if (req.user && req.user.id) {
        // Usuário está logado e verificado, pode prosseguir.
        return next();
    }

    // Se não há usuário, o acesso é bloqueado.
    // VERIFICA SE A ROTA COMEÇA COM /api/
    if (req.originalUrl.startsWith('/api/')) {
        // Para requisições de API, retorna um erro 401 JSON. NÃO redireciona.
        return res.status(401).json({ success: false, error: 'Não autorizado. Faça o login para acessar este recurso.' });
    } else {
        // Para páginas normais, redireciona para a página de login.
        const redirectUrl = req.originalUrl;
        return res.redirect(`/login?erro=Acesso negado. Faça o login para continuar.&redirect=${encodeURIComponent(redirectUrl)}`);
    }
};

/**
 * Middleware para verificar se o usuário autenticado é um 'admin'.
 * DEVE ser usado sempre DEPOIS de `proteger`.
 */
exports.admin = (req, res, next) => {
    // `proteger` garante que `req.user` existe.
    if (req.user && req.user.role === 'admin') {
        // O usuário é um admin, pode prosseguir.
        return next();
    }
    
    // Se não for admin, o acesso é proibido.
    if (req.originalUrl.startsWith('/api/')) {
        // Para a API, retorna um erro 403 (Proibido) em JSON.
        return res.status(403).json({ success: false, error: 'Acesso negado. Recurso exclusivo para administradores.' });
    } else {
        // Para páginas normais, renderiza uma página de erro 403.
        return res.status(403).render('403', { layout: false, titulo: 'Acesso Negado' });
    }
};