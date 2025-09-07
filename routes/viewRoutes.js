const express = require('express');
const router = express.Router();
const { proteger, admin } = require('../middleware/authMiddleware');
const db = require('../models');

// Rota Principal
router.get('/', async (req, res) => {
    // Sua lógica para a página inicial aqui
    res.render('index', { layout: false, title: 'Início' });
});

// Rota de Login
router.get('/login', (req, res) => {
    res.render('login', { layout: false, title: 'Login' });
});

// Rota do Painel de Admin (movida para cá para consistência)
router.get('/admin/dashboard', proteger, admin, async (req, res) => {
    try {
        const [totalAnimes, totalPosts, totalUsers] = await Promise.all([
            db.Anime.count(),
            db.Post.count(),
            db.User.count()
        ]);
        res.render('admin/dashboard', { 
            layout: false, 
            title: 'Painel de Administração', 
            totalAnimes, 
            totalPosts, 
            totalUsers, 
            user: req.user 
        });
    } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
        res.status(500).render('500', { layout: false, error: err, title: 'Erro' });
    }
});

// Adicione outras rotas de VIEW (como /perfil, /noticias, /anime/:id) aqui...

module.exports = router;