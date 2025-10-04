const Anime = require('../models/Anime');
const Post = require('../models/Post');

// @desc    Renderiza o dashboard principal do admin
// @route   GET /admin/dashboard
exports.getDashboard = async (req, res) => {
    try {
        const totalAnimes = await Anime.countDocuments();
        const totalPosts = await Post.countDocuments();
        res.render('admin/dashboard', {
            layout: 'admin_layout', // Usaremos um layout diferente para o admin
            titulo: 'Admin Dashboard',
            totalAnimes,
            totalPosts,
            user: req.user
        });
    } catch (err) {
        res.status(500).send('Erro no servidor do admin');
    }
};

// @desc    Mostra o formulário para adicionar novo anime
// @route   GET /admin/add-anime
exports.getAddAnimeForm = (req, res) => {
    res.render('admin/add-anime', {
        layout: 'admin_layout',
        titulo: 'Adicionar Anime',
        user: req.user
    });
};

// @desc    Cria um novo anime
// @route   POST /admin/add-anime
exports.createAnime = async (req, res) => {
    try {
        // Adicionar lógica de upload de imagem da capa aqui com Multer
        // Por agora, vamos assumir que o caminho da imagem é passado no corpo
        await Anime.create(req.body);
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(400).send('Erro ao criar anime');
    }
};

// @desc    Mostra o formulário para adicionar novo post
// @route   GET /admin/add-post
exports.getAddPostForm = (req, res) => {
    res.render('admin/add-post', {
        layout: 'admin_layout',
        titulo: 'Adicionar Notícia',
        user: req.user
    });
};

// @desc    Cria uma nova notícia/post
// @route   POST /admin/add-post
exports.createPost = async (req, res) => {
    try {
        const postData = {
            ...req.body,
            autor: req.user._id,
            autorNome: req.user.nome
        };
        await Post.create(postData);
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(400).send('Erro ao criar post');
    }
};