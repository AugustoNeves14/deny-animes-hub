// ====================================================================================
// // DenyAnimeHub - Ponto de Entrada Principal (Versão Definitiva e Robusta)
// // ====================================================================================

// --- 1. IMPORTAÇÕES E CONFIGURAÇÃO INICIAL ---
require('dotenv').config(); // Garante que as variáveis de ambiente do .env sejam carregadas
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const multer = require('multer');
const { Sequelize, Op } = require('sequelize'); // ÚNICA importação de 'Op'

// --- 2. IMPORTAÇÕES DE MÓDULOS DA APLICAÇÃO ---
const db = require('./models');
const slugify = require('./utils/slugify');

// Middlewares
const { proteger, admin, protegerOpcional } = require('./middleware/authMiddleware');
const { processForm, uploadAvatar, uploadCapa, // Mantido para compatibilidade, se necessário
    uploadCapaPerfil, uploadCapaAnime, uploadVideoEpisodio } = require('./middleware/uploadMiddleware');

// Controllers
const authController = require('./controllers/authController');
const postApiController = require('./controllers/postController');
const userApiController = require('./controllers/userController');
const animeApiController = require('./controllers/animeController');
const episodioApiController = require('./controllers/episodioController');
const downloadController = require('./controllers/downloadController');
const interactionController = require('./controllers/interactionController');
const securityController = require('./controllers/securityController');

// Rotas
const authRoutes = require('./routes/authRoutes');

// --- 3. INICIALIZAÇÃO E CONFIGURAÇÃO DO EXPRESS ---
const app = express();
const PORT = process.env.PORT || 3000; // Usa a porta do ambiente ou 3000

// Configuração do View Engine (EJS)
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

// Middlewares essenciais do Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// --- 4. MIDDLEWARE GLOBAL DA APLICAÇÃO ---
app.use(protegerOpcional);
app.use((req, res, next) => {
    res.locals.user = req.user ? req.user.get({ plain: true }) : null;
    res.locals.userIsLoggedIn = !!req.user;
    next();
});

// ====================================================================================
// --- 5. ROTAS DE VISUALIZAÇÃO (FRONT-END & ADMIN) ---
// ====================================================================================

// --- Rotas Públicas e do Usuário ---
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

// ==================================================================================================
// ROTA '/animes' COMPLETA E ROBUSTA - V10.0 (COM CARROSSÉIS E FILTROS FUNCIONAIS)
// ==================================================================================================
app.get('/animes', async (req, res) => {
    try {
        // [1] PARÂMETROS DE FILTRO E PAGINAÇÃO
        // Pegamos todos os possíveis parâmetros da URL.
        const page = parseInt(req.query.page) || 1;
        const { search, genre, order, letter } = req.query;
        const limit = 24; // Itens por página
        const offset = (page - 1) * limit;

        // [2] QUERIES PARA OS CARROSSÉIS (EXECUTADAS EM PARALELO PARA EFICIÊNCIA)
        // Estes dados são independentes dos filtros principais e sempre aparecem no topo.
        const [topAnimes, recentAnimes, topDownloads] = await Promise.all([
            db.Anime.findAll({ order: [['views', 'DESC']], limit: 12 }),
            db.Anime.findAll({ order: [['createdAt', 'DESC']], limit: 12 }),
            // ATENÇÃO: Supondo que você tenha uma coluna 'downloads'.
            // Se não tiver, troque 'downloads' por uma coluna existente como 'views' ou 'id'.
            db.Anime.findAll({ order: [['views', 'DESC']], // Usando 'views' como exemplo para "downloads". Mude se necessário.
                limit: 12 })
        ]);

        // [3] LÓGICA DE FILTRAGEM PARA O CATÁLOGO PRINCIPAL
        // Construímos a cláusula 'where' baseada nos filtros ativos.
        let whereClause = {};
        if (search) {
            // Se houver uma busca, ela tem prioridade sobre o filtro de letra.
            whereClause.titulo = { [Op.iLike]: `%${search}%` };
        } else if (letter) {
            // Se não houver busca, mas houver uma letra, filtramos por ela.
            whereClause.titulo = { [Op.iLike]: `${letter}%` };
        }
        if (genre) {
            // Adiciona o filtro de gênero (funciona em conjunto com os outros).
            // Esta busca funciona para campos de texto que armazenam JSON.
            whereClause.generos = { [Op.iLike]: `%"${genre}"%` };
        }

        // [4] LÓGICA DE ORDENAÇÃO
        // Define a ordem padrão e a altera se um parâmetro de ordem for fornecido.
        let orderClause = [['createdAt', 'DESC']]; // Padrão: mais recentes
        if (order) {
            const [field, direction] = order.split('_');
            if (['titulo', 'views', 'createdAt'].includes(field) && ['asc', 'desc'].includes(direction)) {
                orderClause = [[field, direction.toUpperCase()]];
            }
        }

        // [5] QUERY PRINCIPAL NO BANCO DE DADOS
        // Busca os animes para a página atual, contando o total para a paginação.
        const { count, rows: animes } = await db.Anime.findAndCountAll({
            where: whereClause,
            order: orderClause,
            limit,
            offset,
        });

        // [6] BUSCA DE TODOS OS GÊNEROS ÚNICOS PARA O DROPDOWN DE FILTRO
        // Esta lógica é eficiente pois só busca uma coluna e processa em memória.
        const allAnimesForGenres = await db.Anime.findAll({ attributes: ['generos'] });
        const genreSet = new Set(allAnimesForGenres.flatMap(a => {
            try {
                return JSON.parse(a.generos)
            } catch {
                return []
            }
        }));
        const uniqueGenres = [...genreSet].sort();

        // [7] RENDERIZAÇÃO DA PÁGINA COM TODOS OS DADOS NECESSÁRIOS
        // Enviamos tudo que o template 'todos-animes.ejs' precisa para funcionar.
        res.render('todos-animes', {
            // Dados para o título e meta tags
            titulo: 'Todos os Animes',
            // Dados para o catálogo principal e paginação
            animes: animes,
            totalAnimes: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            // Dados para os filtros
            uniqueGenres: uniqueGenres, // Essencial para o <select> de gêneros
            query: req.query, // Passa todos os parâmetros atuais para o EJS
            // [NOVO E ESSENCIAL] Dados para os carrosséis
            topAnimes: topAnimes,
            recentAnimes: recentAnimes,
            topDownloads: topDownloads
        });
    } catch (error) {
        // Tratamento de erro robusto
        console.error("ERRO FATAL AO CARREGAR A PÁGINA DE ANIMES:", error);
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: 'Não foi possível carregar o catálogo de animes. Por favor, tente novamente mais tarde.' });
    }
});

app.get('/noticias', async (req, res) => {
    try {
        const [destaque, recentes] = await Promise.all([
            db.Post.findOne({ where: { emDestaque: true }, include: 'autor', order: [['createdAt', 'DESC']] }),
            db.Post.findAll({ where: { emDestaque: [false, null] }, order: [['createdAt', 'DESC']], limit: 10, include: 'autor' })
        ]);
        res.render('noticias', { page_name: 'noticias', titulo: 'Notícias', destaque, recentes });
    } catch (err) {
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: 'Falha ao carregar notícias.' });
    }
});

app.get('/noticias/:slug', async (req, res) => {
    try {
        const post = await db.Post.findOne({ where: { slug: req.params.slug }, include: 'autor' });
        if (!post) return res.status(404).render('404', { layout: false, titulo: 'Notícia não encontrada' });
        await post.increment('views');
        res.render('detalhe-post', { page_name: 'detalhe-post', titulo: post.titulo, post });
    } catch (err) {
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: 'Falha ao carregar a notícia.' });
    }
});

app.get('/anime/:slug', proteger, async (req, res) => {
    try {
        const anime = await db.Anime.findOne({
            where: { slug: req.params.slug },
            include: [{ model: db.Episodio, as: 'episodios', order: [['temporada', 'ASC'],['numero', 'ASC']] }]
        });
        if (!anime) return res.status(404).render('404', { layout: false, titulo: 'Anime não encontrado' });
        await anime.increment('views');
        res.render('detalhe-anime', { page_name: 'anime-detail', titulo: anime.titulo, anime: anime.get({ plain: true }), db });
    } catch (err) {
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: err });
    }
});

app.get('/assistir/:slug/:epId', proteger, async (req, res) => {
    try {
        const { slug, epId } = req.params;
        const anime = await db.Anime.findOne({
            where: { slug },
            include: [{ model: db.Episodio, as: 'episodios' }]
        });
        if (!anime) return res.status(404).render('404', { layout: false, titulo: 'Anime não encontrado' });
        const episodioAtual = (anime.episodios || []).find(ep => ep.id.toString() === epId);
        if (!episodioAtual) return res.status(404).render('404', { layout: false, titulo: 'Episódio não encontrado' });

        const todosEpisodiosOrdenados = (anime.episodios || []).sort((a, b) => a.temporada - b.temporada || a.numero - b.numero);

        const sugestoes = await db.Anime.findAll({
            where: { id: { [Op.ne]: anime.id } },
            order: Sequelize.literal('RANDOM()'),
            limit: 4
        });

        res.render('assistir', {
            layout: 'layouts/main',
            page_name: 'player',
            initialAnime: anime.get({ plain: true }),
            initialEpisode: episodioAtual.get({ plain: true }),
            todosEpisodios: todosEpisodiosOrdenados.map(ep => ep.get({ plain: true })),
            sugestoes: sugestoes.map(s => s.get({ plain: true })),
            titulo: `Assistindo: ${anime.titulo} - Ep. ${episodioAtual.numero}`
        });
    } catch (err) {
        console.error("ERRO CRÍTICO NA PÁGINA DO PLAYER:", err);
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: err });
    }
});

app.get('/perfil', proteger, async (req, res) => {
    try {
        const historico = await db.Historico.findAll({
            where: { userId: req.user.id },
            limit: 10,
            order: [['updatedAt', 'DESC']],
            include: [{ model: db.Anime, as: 'anime' }, { model: db.Episodio, as: 'episodio' }]
        });
        res.render('perfil', { page_name: 'perfil', titulo: 'Meu Perfil', user: req.user.get({ plain: true }), historico: historico.map(h => h.get({ plain: true })) });
    } catch (error) {
        console.error("Erro ao carregar a página de perfil:", error);
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error });
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


// --- Rota do Painel de Admin ---
app.get('/admin/dashboard', proteger, admin, async (req, res) => {
    try {
        const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
        const [totalAnimes, totalPosts, totalUsers, newUsersData, newAnimesData] = await Promise.all([
            db.Anime.count(),
            db.Post.count(),
            db.User.count(),
            db.User.findAll({
                where: { createdAt: { [Op.gte]: sevenDaysAgo } },
                attributes: [[db.sequelize.fn('date', db.sequelize.col('createdAt')), 'date'], [db.sequelize.fn('count', '*'), 'count']],
                group: ['date'],
                order: [['date', 'ASC']]
            }),
            db.Anime.findAll({
                where: { createdAt: { [Op.gte]: sevenDaysAgo } },
                attributes: [[db.sequelize.fn('date', db.sequelize.col('createdAt')), 'date'], [db.sequelize.fn('count', '*'), 'count']],
                group: ['date'],
                order: [['date', 'ASC']]
            })
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
// --- 6. ROTAS DE API (usadas pelo Painel de Admin e outras interações) ---
// ====================================================================================
app.use('/auth', authRoutes);

const apiRouter = express.Router();
app.use('/api', apiRouter);

// --- Rotas Públicas da API ---
const protegerComChaveApi = (req, res, next) => {
    const chaveApi = req.headers['x-api-key'];
    if (chaveApi && chaveApi === process.env.AUTOMATION_API_KEY) next();
    else res.status(401).json({ success: false, error: 'Acesso não autorizado. Chave de API inválida.' });
};
apiRouter.post('/automacao/postar-anime-completo', protegerComChaveApi, animeApiController.createAnime);
apiRouter.post('/security/log-event', protegerOpcional, securityController.logSecurityEvent);

// --- Rotas Protegidas para Usuários Autenticados ---
apiRouter.use(proteger);
apiRouter.put('/user/profile', userApiController.updateUserProfile);
apiRouter.post('/user/profile/avatar', uploadAvatar, userApiController.updateUserAvatar);
apiRouter.post('/user/profile/capa', uploadCapaPerfil, userApiController.updateUserCapa);
// apiRouter.post('/history/update', interactionController.updateHistory); // Descomente quando a função for implementada
apiRouter.get('/comments/:animeId', interactionController.getComments);
apiRouter.post('/comments', interactionController.postComment);
apiRouter.post('/ratings', interactionController.postRating);

// --- Rotas Protegidas para Administradores ---
apiRouter.use(admin);

// Uploads
apiRouter.post('/upload/capa', uploadCapaAnime, (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, error: 'Nenhum arquivo recebido.' });
    res.json({ success: true, filePath: `/uploads/capas/${req.file.filename}` });
});
apiRouter.post('/episodios/upload', uploadVideoEpisodio, episodioApiController.createEpisodioComUpload);

// CRUD Animes
apiRouter.get('/animes', animeApiController.getAllAnimes);
apiRouter.get('/animes/:slug', animeApiController.getAnimeBySlug);
apiRouter.post('/animes', processForm, animeApiController.createAnime);
apiRouter.put('/animes/:slug', processForm, animeApiController.updateAnime);
apiRouter.delete('/animes/:slug', animeApiController.deleteAnime);

// CRUD Episódios
apiRouter.post('/episodios', processForm, episodioApiController.createEpisodioViaLink);
apiRouter.delete('/episodios/:id', episodioApiController.deleteEpisodio);

// CRUD Posts (Notícias)
apiRouter.get('/posts', postApiController.getAllPosts);
apiRouter.get('/posts/:id', postApiController.getPostById); // Rota para buscar por ID
apiRouter.post('/posts', processForm, postApiController.createPost);
apiRouter.put('/posts/:id', processForm, postApiController.updatePost);
apiRouter.delete('/posts/:id', postApiController.deletePost);

// CRUD Usuários
apiRouter.get('/users', userApiController.getAllUsers);
apiRouter.get('/users/:id', userApiController.getSingleUser);
apiRouter.put('/users/:id', userApiController.updateUserByAdmin);
apiRouter.delete('/users/:id', userApiController.deleteUserByAdmin);

// CRUD Comentários (Admin)
apiRouter.get('/comments-admin', interactionController.getAllCommentsForAdmin);
apiRouter.get('/comments/:id', interactionController.getSingleComment);
apiRouter.put('/comments-admin/:id', interactionController.updateComment);
apiRouter.delete('/comments-admin/:id', interactionController.deleteComment);

// ====================================================================================
// --- 7. TRATAMENTO DE ERROS E INICIALIZAÇÃO ---
// ====================================================================================

// Middleware para rotas não encontradas (404)
app.use((req, res, next) => {
    res.status(404).render('404', { layout: false, titulo: 'Página Não Encontrada' });
});

// Middleware para tratamento de erros genéricos (500)
app.use((err, req, res, next) => {
    console.error("ERRO FATAL:", err.stack);

    if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, error: `Erro de upload: ${err.message}.` });
    }
    if (err.code === 'INVALID_FILE_TYPE') {
        return res.status(400).json({ success: false, error: err.message });
    }

    // Se a resposta já foi enviada, delega para o próximo handler de erro do Express
    if (res.headersSent) {
        return next(err);
    }

    // Para requisições de API, envia um erro JSON
    if (req.originalUrl.startsWith('/api/')) {
        return res.status(500).json({ success: false, error: 'Ocorreu um problema inesperado no servidor.' });
    }

    // Para requisições normais, renderiza a página de erro
    res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: 'Ocorreu um problema inesperado.' });
});

// --- Inicialização do Servidor ---
db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('✅ Banco de dados sincronizado e pronto.');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor Akatsuki no ar em: http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ FALHA CRÍTICA AO INICIAR O SERVIDOR:', err);
        process.exit(1);
    });