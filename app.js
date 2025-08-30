// ====================================================================================
//
//      app.js - DenyAnimeHub (Versão Definitiva, Robusta e Full 100%)
//
// ====================================================================================

require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const multer = require('multer');
const { Op, Sequelize } = require('sequelize');

// --- 1. IMPORTAÇÃO DO DB PROXY ---
const db = require('./dbProxy');

// --- 2. UTILITÁRIOS ---
const slugify = require('./utils/slugify');

// --- 3. MIDDLEWARES ---
const { proteger, admin, protegerOpcional } = require('./middleware/authMiddleware');
const {
    processForm,
    uploadAvatar,
    uploadCapaPerfil,
    uploadCapaAnime,
    uploadVideoEpisodio
} = require('./middleware/uploadMiddleware');

// --- 4. CONTROLLERS ---
const authController = require('./controllers/authController');
const postApiController = require('./controllers/postController');
const userApiController = require('./controllers/userController');
const animeApiController = require('./controllers/animeController');
const episodioApiController = require('./controllers/episodioController');
const downloadController = require('./controllers/downloadController');
const interactionController = require('./controllers/interactionController');
const securityController = require('./controllers/securityController');

// --- 5. ROTAS ---
const authRoutes = require('./routes/authRoutes');

// ====================================================================================
// --- INICIALIZAÇÃO EXPRESS ---
const app = express();
const PORT = process.env.PORT || 3000;

// --- CONFIGURAÇÃO EJS ---
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

// --- MIDDLEWARES ESSENCIAIS ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- ARQUIVOS ESTÁTICOS ---
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// --- MIDDLEWARE GLOBAL ---
app.use(protegerOpcional);
app.use((req, res, next) => {
    res.locals.user = req.user ? req.user.get({ plain: true }) : null;
    res.locals.userIsLoggedIn = !!req.user;
    next();
});

// ====================================================================================
// --- ROTAS PÚBLICAS & USUÁRIO ---
// ====================================================================================
app.get('/', async (req, res) => {
    try {
        const [animesRecentes, animesPopulares] = await Promise.all([
            db.Anime.findAll({ order: [['createdAt', 'DESC']], limit: 24 }),
            db.Anime.findAll({ order: [['views', 'DESC']], limit: 5 })
        ]);
        res.render('index', { page_name: 'index', titulo: 'Início', animes: animesRecentes, topAnimes: animesPopulares });
    } catch (err) {
        console.error("Erro na página inicial:", err);
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: err });
    }
});

app.get('/animes', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const { search, genre, order, letter } = req.query;
        const limit = 24;
        const offset = (page - 1) * limit;

        const [topAnimes, recentAnimes, topDownloads] = await Promise.all([
            db.Anime.findAll({ order: [['views', 'DESC']], limit: 12 }),
            db.Anime.findAll({ order: [['createdAt', 'DESC']], limit: 12 }),
            db.Anime.findAll({ order: [['views', 'DESC']], limit: 12 }) // top downloads
        ]);

        let whereClause = {};
        if (search) whereClause.titulo = { [Op.iLike]: `%${search}%` };
        else if (letter) whereClause.titulo = { [Op.iLike]: `${letter}%` };
        if (genre) whereClause.generos = { [Op.iLike]: `%"${genre}"%` };

        let orderClause = [['createdAt', 'DESC']];
        if (order) {
            const [field, direction] = order.split('_');
            if (['titulo', 'views', 'createdAt'].includes(field) && ['asc', 'desc'].includes(direction)) {
                orderClause = [[field, direction.toUpperCase()]];
            }
        }

        const { count, rows: animes } = await db.Anime.findAndCountAll({ where: whereClause, order: orderClause, limit, offset });

        const allAnimesForGenres = await db.Anime.findAll({ attributes: ['generos'] });
        const genreSet = new Set(allAnimesForGenres.flatMap(a => { try { return JSON.parse(a.generos) } catch { return [] } }));
        const uniqueGenres = [...genreSet].sort();

        res.render('todos-animes', {
            titulo: 'Todos os Animes',
            animes,
            totalAnimes: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            uniqueGenres,
            query: req.query,
            topAnimes,
            recentAnimes,
            topDownloads
        });
    } catch (error) {
        console.error("ERRO AO CARREGAR ANIMES:", error);
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: 'Não foi possível carregar o catálogo de animes.' });
    }
});

// --- NOTÍCIAS ---
app.get('/noticias', async (req, res) => {
    try {
        const [destaque, recentes] = await Promise.all([
            db.Post.findOne({ where: { emDestaque: true }, order: [['createdAt', 'DESC']] }),
            db.Post.findAll({ where: { emDestaque: [false, null] }, order: [['createdAt', 'DESC']], limit: 10 })
        ]);
        res.render('noticias', { page_name: 'noticias', titulo: 'Notícias', destaque, recentes });
    } catch (err) {
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: 'Falha ao carregar notícias.' });
    }
});

app.get('/noticias/:slug', async (req, res) => {
    try {
        const post = await db.Post.findOne({ where: { slug: req.params.slug } });
        if (!post) return res.status(404).render('404', { layout: false, titulo: 'Notícia não encontrada' });
        res.render('detalhe-post', { page_name: 'detalhe-post', titulo: post.titulo, post });
    } catch (err) {
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: 'Falha ao carregar a notícia.' });
    }
});

// --- DETALHE ANIME ---
app.get('/anime/:slug', proteger, async (req, res) => {
    try {
        const anime = await db.Anime.findOne({
            where: { slug: req.params.slug }
        });
        if (!anime) return res.status(404).render('404', { layout: false, titulo: 'Anime não encontrado' });
        await db.Anime.increment('views', { where: { slug: anime.slug } });
        res.render('detalhe-anime', { page_name: 'anime-detail', titulo: anime.titulo, anime });
    } catch (err) {
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: err });
    }
});

// --- PLAYER ---
app.get('/assistir/:slug/:epId', proteger, async (req, res) => {
    try {
        const { slug, epId } = req.params;
        const anime = await db.Anime.findOne({ where: { slug } });
        if (!anime) return res.status(404).render('404', { layout: false, titulo: 'Anime não encontrado' });

        const episodios = await db.Episodio.findAll({ where: { animeId: anime.id } });
        const episodioAtual = episodios.find(ep => ep.id.toString() === epId);
        if (!episodioAtual) return res.status(404).render('404', { layout: false, titulo: 'Episódio não encontrado' });

        const sugestoes = await db.Anime.findAll({ limit: 4 }); // Sugestões aleatórias
        res.render('assistir', {
            layout: 'layouts/main',
            page_name: 'player',
            initialAnime: anime,
            initialEpisode: episodioAtual,
            todosEpisodios: episodios,
            sugestoes,
            titulo: `Assistindo: ${anime.titulo} - Ep. ${episodioAtual.numero}`
        });
    } catch (err) {
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: err });
    }
});

// --- PERFIL ---
app.get('/perfil', proteger, async (req, res) => {
    try {
        const historico = await db.Historico.findAll({
            where: { userId: req.user.id },
            limit: 10,
            order: [['updatedAt', 'DESC']],
        });
        res.render('perfil', {
            page_name: 'perfil',
            titulo: 'Meu Perfil',
            user: req.user.get({ plain: true }),
            historico
        });
    } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: err });
    }
});

app.get('/perfil/editar', proteger, (req, res) => {
    res.render('editar-perfil', { page_name: 'editar-perfil', titulo: 'Editar Perfil' });
});

app.get('/login', (req, res) => {
    if (res.locals.userIsLoggedIn) return res.redirect('/');
    res.render('login', { layout: false, page_name: 'login-page', titulo: 'Login/Registro' });
});

app.get('/download/proxy', proteger, downloadController.proxyDownload);

// --- ADMIN DASHBOARD ---
app.get('/admin/dashboard', proteger, admin, async (req, res) => {
    try {
        const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));

        const [totalAnimes, totalPosts, totalUsers, newUsersData, newAnimesData] = await Promise.all([
            db.Anime.findAll().then(d => d.length),
            db.Post.findAll().then(d => d.length),
            db.User.findAll().then(d => d.length),
            db.User.findAll({ where: { createdAt: { [Op.gte]: sevenDaysAgo } } }),
            db.Anime.findAll({ where: { createdAt: { [Op.gte]: sevenDaysAgo } } })
        ]);

        res.render('admin/dashboard', {
            layout: false,
            title: 'Painel de Administração',
            totalAnimes,
            totalPosts,
            totalUsers,
            newUsersData: JSON.stringify(newUsersData),
            newAnimesData: JSON.stringify(newAnimesData)
        });
    } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: err });
    }
});

// ====================================================================================
// --- ROTAS DE API ---
// ====================================================================================
app.use('/auth', authRoutes);

const apiRouter = express.Router();
app.use('/api', apiRouter);

// Middleware para proteger rotas com chave de API
const protegerComChaveApi = (req, res, next) => {
    const chaveApi = req.headers['x-api-key'];
    if (chaveApi && chaveApi === process.env.AUTOMATION_API_KEY) next();
    else res.status(401).json({ success: false, error: 'Acesso não autorizado. Chave de API inválida.' });
};

// --- Rotas API ---
apiRouter.post('/automacao/postar-anime-completo', protegerComChaveApi, animeApiController.createAnime);
apiRouter.post('/security/log-event', protegerOpcional, securityController.logSecurityEvent);

// Usuário autenticado
apiRouter.use(proteger);
apiRouter.put('/user/profile', userApiController.updateUserProfile);
apiRouter.post('/user/profile/avatar', uploadAvatar, userApiController.updateUserAvatar);
apiRouter.post('/user/profile/capa', uploadCapaPerfil, userApiController.updateUserCapa);
apiRouter.get('/comments/:animeId', interactionController.getComments);
apiRouter.post('/comments', interactionController.postComment);
apiRouter.post('/ratings', interactionController.postRating);

// Admin
apiRouter.use(admin);
apiRouter.post('/upload/capa', uploadCapaAnime, (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, error: 'Nenhum arquivo recebido.' });
    res.json({ success: true, filePath: `/uploads/capas/${req.file.filename}` });
});
apiRouter.post('/episodios/upload', uploadVideoEpisodio, episodioApiController.createEpisodioComUpload);

// CRUD completo
apiRouter.get('/animes', animeApiController.getAllAnimes);
apiRouter.get('/animes/:slug', animeApiController.getAnimeBySlug);
apiRouter.post('/animes', processForm, animeApiController.createAnime);
apiRouter.put('/animes/:slug', processForm, animeApiController.updateAnime);
apiRouter.delete('/animes/:slug', animeApiController.deleteAnime);

apiRouter.post('/episodios', processForm, episodioApiController.createEpisodioViaLink);
apiRouter.delete('/episodios/:id', episodioApiController.deleteEpisodio);

apiRouter.get('/posts', postApiController.getAllPosts);
apiRouter.get('/posts/:id', postApiController.getPostById);
apiRouter.post('/posts', processForm, postApiController.createPost);
apiRouter.put('/posts/:id', processForm, postApiController.updatePost);
apiRouter.delete('/posts/:id', postApiController.deletePost);

apiRouter.get('/users', userApiController.getAllUsers);
apiRouter.get('/users/:id', userApiController.getSingleUser);
apiRouter.put('/users/:id', userApiController.updateUserByAdmin);
apiRouter.delete('/users/:id', userApiController.deleteUserByAdmin);

apiRouter.get('/comments-admin', interactionController.getAllCommentsForAdmin);
apiRouter.get('/comments/:id', interactionController.getSingleComment);
apiRouter.put('/comments-admin/:id', interactionController.updateComment);
apiRouter.delete('/comments-admin/:id', interactionController.deleteComment);

// ====================================================================================
// --- TRATAMENTO DE ERROS E INICIALIZAÇÃO ---
// ====================================================================================

// 404
app.use((req, res) => {
    res.status(404).render('404', { layout: false, titulo: 'Página Não Encontrada' });
});

// 500
app.use((err, req, res, next) => {
    console.error("ERRO FATAL:", err.stack);
    if (err instanceof multer.MulterError) return res.status(400).json({ success: false, error: `Erro de upload: ${err.message}` });
    if (err.code === 'INVALID_FILE_TYPE') return res.status(400).json({ success: false, error: err.message });
    if (res.headersSent) return next(err);
    if (req.originalUrl.startsWith('/api/')) return res.status(500).json({ success: false, error: 'Ocorreu um problema inesperado no servidor.' });
    res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: 'Ocorreu um problema inesperado.' });
});

// ====================================================================================
// --- INICIALIZAÇÃO DO SERVIDOR ---
// ====================================================================================
db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('✅ Banco de dados sincronizado e pronto.');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor DenyAnimeHub no ar em: http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ FALHA CRÍTICA AO INICIAR O SERVIDOR:', err);
        process.exit(1);
    });

