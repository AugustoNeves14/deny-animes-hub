const express = require('express');
const router = express.Router();
const { admin } = require('../middleware/adminMiddleware'); // Middleware de segurança
const Anime = require('../models/Anime');
const Post = require('../models/Post');
const User = require('../models/User');

// =========================================================================
// ROTA PRINCIPAL DO PAINEL ADMIN
// Renderiza a página "Single-Page Application" do painel
// =========================================================================
router.get('/', admin, (req, res) => {
    // A rota principal /admin agora renderiza o painel completo.
    // Opcional: pode redirecionar para /admin/dashboard
    res.redirect('/admin/dashboard');
});

router.get('/:page', admin, (req, res) => {
    const page = req.params.page || 'dashboard'; // 'dashboard' é o padrão
    res.render('admin', { // Renderiza sempre a mesma view: 'admin.ejs'
        title: `Admin | ${page.charAt(0).toUpperCase() + page.slice(1)}`,
        user: req.user,
        currentPage: page // Passa a página atual para a view saber qual seção mostrar
    });
});


// =========================================================================
// ROTAS DE API INTERNA (usadas pelo JavaScript da página admin.ejs)
// Essas rotas retornam dados em JSON.
// =========================================================================

// Protege todas as rotas de API abaixo para serem acessadas apenas por admins
const apiRouter = express.Router();
apiRouter.use(admin);

// API: Obter dados para o Dashboard
apiRouter.get('/dashboard-stats', async (req, res) => {
    try {
        const totalAnimes = await Anime.countDocuments();
        const totalPosts = await Post.countDocuments();
        const totalUsers = await User.countDocuments();
        res.json({ success: true, totalAnimes, totalPosts, totalUsers });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro ao buscar estatísticas.' });
    }
});

// API: Posts
apiRouter.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ dataCriacao: -1 }).populate('autor', 'nome');
        res.json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro ao buscar posts.' });
    }
});

apiRouter.post('/posts', async (req, res) => {
    try {
        const postData = { ...req.body, autor: req.user._id, autorNome: req.user.nome };
        const newPost = await Post.create(postData);
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

apiRouter.put('/posts/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({ success: false, error: 'Post não encontrado.' });
        res.json({ success: true, data: updatedPost });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

apiRouter.delete('/posts/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ success: false, error: 'Post não encontrado.' });
        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro ao deletar post.' });
    }
});


// Monta o roteador da API interna sob a rota /admin/api
router.use('/api', apiRouter);


module.exports = router;