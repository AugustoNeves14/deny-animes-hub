// ==========================================================================
// DenyAnimeHub - Arquivo de Configuração e Roteamento Centralizado
// Versão: 5.0 (FINAL DEFINITIVO - Funcionalidade Completa)
// ==========================================================================

// --- 1. IMPORTAÇÕES ---
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./models');
const { proteger } = require('./middleware/authMiddleware');
const { admin } = require('./middleware/adminMiddleware');
const upload = require('./middleware/uploadMiddleware'); // Importa o middleware de upload

// Controllers
const authController = require('./controllers/authController');
const postApiController = require('./controllers/postController');
const userApiController = require('./controllers/userController');
const animeApiController = require('./controllers/animeController'); // NOVO CONTROLLER

// --- 2. INICIALIZAÇÃO E CONFIGURAÇÃO DO EXPRESS ---
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))); // Serve a pasta de uploads
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware global para views
app.use(async (req, res, next) => {
    res.locals.userIsLoggedIn = !!req.cookies.token;
    if (req.user) res.locals.user = req.user;
    next();
});

// --- 3. DEFINIÇÃO DE ROTAS ---

// SEÇÃO A: ROTAS PÚBLICAS E DE USUÁRIO
app.get('/', async (req, res) => {
    try {
        const todosAnimes = await db.Anime.findAll({ order: [['titulo', 'ASC']] });
        res.render('index', { layout: false, page_name: 'index', titulo: 'Início', animes: todosAnimes });
    } catch (err) { res.status(500).render('500', { layout: false, error: err }); }
});

app.get('/login', (req, res) => {
    res.render('login', { layout: false, page_name: 'login-page', titulo: 'Login/Registro', erro: req.query.erro, sucesso: req.query.sucesso });
});

app.get('/noticias', async (req, res) => {
    try {
        const noticiaDestaque = await db.Post.findOne({ where: { emDestaque: true }, include: 'autor' });
        // CORREÇÃO: Usar 'createdAt' que é o padrão do Sequelize
        const noticiasRecentes = await db.Post.findAll({ where: { emDestaque: false }, order: [['createdAt', 'DESC']], limit: 10, include: 'autor' });
        res.render('noticias', { layout: false, page_name: 'noticias', titulo: 'Notícias', destaque: noticiaDestaque, recentes: noticiasRecentes });
    } catch (err) { res.status(500).render('500', { layout: false, error: err }); }
});

app.get('/anime/:id', async (req, res) => {
    try {
        const anime = await db.Anime.findByPk(req.params.id);
        if (!anime) return res.status(404).render('404', { layout: false, titulo: 'Anime não encontrado' });
        await anime.increment('views');
        res.render('detalhe-anime', { layout: false, page_name: 'anime-detail', titulo: anime.titulo, anime: anime });
    } catch (err) { res.status(500).render('500', { layout: false, error: err }); }
});

app.get('/explorar', (req, res) => {
    res.render('explorar', { layout: false, page_name: 'explorar', titulo: 'Explorar Animes' });
});

app.get('/perfil', proteger, (req, res) => {
    res.render('perfil', { layout: false, page_name: 'perfil', titulo: 'Meu Perfil', user: req.user });
});

app.get('/perfil/editar', proteger, (req, res) => {
    res.render('editar-perfil', { layout: false, page_name: 'editar-perfil', titulo: 'Editar Perfil', user: req.user });
});

app.get('/assistir/:animeId/:epNum', proteger, async(req, res) => {
    try {
        const anime = await db.Anime.findByPk(req.params.animeId);
        if (!anime) return res.status(404).render('404', { layout: false, titulo: 'Anime não encontrado'});
        
        const episodio = anime.episodios.find(ep => ep.numero.toString() === req.params.epNum);
        if(!episodio) return res.status(404).render('404', { layout: false, titulo: 'Episódio não encontrado'});

        res.render('player', { layout: false, page_name: 'player', titulo: `Assistindo: ${anime.titulo} - EP ${episodio.numero}`, anime, episodio });
    } catch(err) {
        res.status(500).render('500', { layout: false, error: err });
    }
});

app.post('/auth/registrar', authController.registrar);
app.post('/auth/login', authController.login);
app.get('/auth/logout', authController.logout);

// SEÇÃO B: PAINEL DE ADMINISTRAÇÃO E API INTERNA
app.get('/admin/dashboard', admin, async (req, res) => {
    try {
        const [totalAnimes, totalPosts, totalUsers] = await Promise.all([ db.Anime.count(), db.Post.count(), db.User.count() ]);
        res.render('admin/dashboard', { layout: false, title: 'Admin Dashboard', totalAnimes, totalPosts, totalUsers, user: req.user });
    } catch (err) { res.status(500).render('500', { layout: false, error: err }); }
});

const apiRouter = express.Router();
apiRouter.use(proteger); // Protege todas as rotas de API com login

// API DE UPLOADS (Protegida)
apiRouter.post('/upload/image', admin, upload.single('imagem'), (req, res) => {
    if (req.file) {
        res.json({ success: true, filePath: `/uploads/images/${req.file.filename}` });
    } else {
        res.status(400).json({ success: false, error: 'Falha no upload da imagem.' });
    }
});

// APIs do Admin
apiRouter.route('/posts').all(admin).get(postApiController.getAllPosts).post(postApiController.createPost);
apiRouter.route('/posts/:id').all(admin).put(postApiController.updatePost).delete(postApiController.deletePost);
apiRouter.route('/animes').all(admin).get(animeApiController.getAllAnimes).post(animeApiController.createAnime);
apiRouter.route('/animes/:id').all(admin).get(animeApiController.getAnimeById).put(animeApiController.updateAnime).delete(animeApiController.deleteAnime);
apiRouter.route('/animes/:id/episodes').all(admin).post(animeApiController.addEpisode);
apiRouter.route('/animes/:id/episodes/:epNum').all(admin).delete(animeApiController.deleteEpisode);
apiRouter.route('/users').all(admin).get(userApiController.getAllUsers);
apiRouter.route('/users/:id').all(admin).put(userApiController.updateUserByAdmin).delete(userApiController.deleteUserByAdmin);

// API do Usuário (para editar o próprio perfil)
apiRouter.put('/user/profile', userApiController.updateUserProfile);
apiRouter.post('/user/profile/avatar', upload.single('avatar'), userApiController.updateUserAvatar);
apiRouter.post('/user/profile/capa', upload.single('capa'), userApiController.updateUserCapa);

app.use('/api', apiRouter);

// ROTA DE ERRO 404 e 500
app.use((req, res, next) => res.status(404).render('404', { layout: false, titulo: 'Página Não Encontrada' }));
app.use((err, req, res, next) => {
    console.error("ERRO INESPERADO:", err.stack);
    res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: err });
});

// EXPORTAÇÃO
module.exports = app;