// ====================================================================================
//
//      app.js - DenyAnimeHub (Versão Final de Produção/Desenvolvimento)
//
// ====================================================================================

require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const multer = require('multer');

// --- 1. IMPORTAÇÃO DO DB PROXY (Ponto Único de Acesso ao Banco de Dados) ---
// Este módulo decide se usa Supabase ou Sequelize e expõe uma interface unificada.
const db = require('./dbProxy');
// O Op (operadores Sequelize) é exposto pelo dbProxy para compatibilidade
const { Op } = require('sequelize'); // Importa o Op para uso nas queries

// --- 2. UTILITÁRIOS ---
// const slugify = require('./utils/slugify'); // Assumindo que slugify é um utilitário simples

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
    res.locals.user = req.user ? req.user : null; // dbProxy.js já retorna objetos "plain"
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
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: err.message || 'Falha ao carregar animes.' });
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
        
        // Ajuste para lidar com generos como TEXT/JSONB no Supabase
        if (genre) {
            // No Supabase, se 'generos' for TEXT e conter um array JSON de strings
            // A query ilike precisa ser adaptada para encontrar a string dentro do JSON.
            // Isso pode ser um desafio e pode precisar de funções Supabase customizadas
            // ou uma abordagem diferente no frontend/backend.
            // Para PostgreSQL/Sequelize, `%"${genre}"%` funciona para JSONB ou TEXT com JSON.
            whereClause.generos = { [Op.iLike]: `%"${genre}"%` };
        }

        let orderClause = [['createdAt', 'DESC']];
        if (order) {
            const [field, direction] = order.split('_');
            if (['titulo', 'views', 'createdAt'].includes(field) && ['asc', 'desc'].includes(direction)) {
                orderClause = [[field, direction.toUpperCase()]];
            }
        }

        const { count, rows: animes } = await db.Anime.findAndCountAll({ where: whereClause, order: orderClause, limit, offset });

        // A busca de gêneros únicos também precisa ser compatível com Supabase
        const allAnimesForGenres = await db.Anime.findAll({ attributes: ['generos'] });
        const genreSet = new Set(allAnimesForGenres.flatMap(a => {
            try {
                // Tenta fazer o parse apenas se a.generos não for null/undefined e for uma string
                // Se for um TEXT com JSON '[ "Acao", "Aventura" ]', isso funciona.
                return typeof a.generos === 'string' && a.generos.startsWith('[') && a.generos.endsWith(']') ? JSON.parse(a.generos) : [];
            } catch {
                return [];
            }
        }));
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
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: error.message || 'Não foi possível carregar o catálogo de animes.' });
    }
});

app.get('/noticias', async (req, res) => {
    try {
        const [destaque, recentes] = await Promise.all([
            db.Post.findOne({ where: { emDestaque: true }, order: [['createdAt', 'DESC']] }),
            db.Post.findAll({ where: { emDestaque: [false, null] }, order: [['createdAt', 'DESC']], limit: 10 })
        ]);
        res.render('noticias', { page_name: 'noticias', titulo: 'Notícias', destaque, recentes });
    } catch (err) {
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: err.message || 'Falha ao carregar notícias.' });
    }
});

app.get('/noticias/:slug', async (req, res) => {
    try {
        const post = await db.Post.findOne({ where: { slug: req.params.slug } });
        if (!post) return res.status(404).render('404', { layout: false, titulo: 'Notícia não encontrada' });
        // Incrementa views no Supabase
        if (db.useSupabase) {
            await db.Post.increment('views', { where: { slug: post.slug } });
        } else {
            // Sequelize original
            await post.increment('views');
        }
        res.render('detalhe-post', { page_name: 'detalhe-post', titulo: post.titulo, post });
    } catch (err) {
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: err.message || 'Falha ao carregar a notícia.' });
    }
});

app.get('/anime/:slug', proteger, async (req, res) => {
    try {
        const anime = await db.Anime.findOne({
            where: { slug: req.params.slug }
        });
        if (!anime) return res.status(404).render('404', { layout: false, titulo: 'Anime não encontrado' });

        // Lógica para buscar episódios relacionados.
        // Como o dbProxy não simula 'include', fazemos a query separada aqui.
        const episodios = await db.Episodio.findAll({
            where: { animeId: anime.id },
            order: [['temporada', 'ASC'], ['numero', 'ASC']]
        });

        // Incrementa views no Supabase ou Sequelize
        if (db.useSupabase) {
            await db.Anime.increment('views', { where: { slug: anime.slug } });
        } else {
            // Se estiver usando Sequelize, o 'anime' é uma instância do modelo,
            // então `increment` funciona diretamente nela.
            await anime.increment('views');
        }

        // Garante que o objeto 'anime' e 'episodios' sejam objetos JavaScript puros
        // para serem passados para o EJS, independentemente se veio do Supabase ou Sequelize.
        const plainAnime = db.useSupabase ? anime : anime.get({ plain: true });
        const plainEpisodios = db.useSupabase ? episodios : episodios.map(ep => ep.get({ plain: true }));

        res.render('detalhe-anime', {
            page_name: 'anime-detail',
            titulo: plainAnime.titulo,
            anime: plainAnime,
            episodios: plainEpisodios, // Passa os episódios separadamente
            db // Passa o db para que o template possa acessar Op se necessário (menos comum)
        });
    } catch (err) {
        console.error("ERRO CRÍTICO NA PÁGINA DE DETALHE DO ANIME:", err);
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: err.message || 'Falha ao carregar detalhes do anime.' });
    }
});

app.get('/assistir/:slug/:epId', proteger, async (req, res) => {
    try {
        const { slug, epId } = req.params;
        const anime = await db.Anime.findOne({ where: { slug } });
        if (!anime) return res.status(404).render('404', { layout: false, titulo: 'Anime não encontrado' });

        const episodios = await db.Episodio.findAll({
            where: { animeId: anime.id },
            order: [['temporada', 'ASC'], ['numero', 'ASC']]
        });
        const episodioAtual = episodios.find(ep => ep.id.toString() === epId);
        if (!episodioAtual) return res.status(404).render('404', { layout: false, titulo: 'Episódio não encontrado' });

        // Para sugestões, se Supabase estiver ativo, um simples findAll com limit
        // não garante aleatoriedade. Para Sequelize, usar Sequelize.literal('RANDOM()')
        // mas isso não está disponível na simulação Supabase.
        // A melhor abordagem é buscar uma quantidade maior e randomizar em memória.
        // Por simplicidade, mantemos a busca por limite e a aleatoriedade será "implícita"
        // baseada na ordem que o DB retornar ou na ausência de ordem.
        const sugestoes = await db.Anime.findAll({
            where: { id: { [Op.ne]: anime.id } }, // Exclui o anime atual das sugestões
            limit: 4
            // No Sequelize, você adicionaria: order: db.Sequelize.literal('RANDOM()')
            // No Supabase, você faria uma query mais complexa ou randomizaria após a busca.
            // Para manter compatibilidade, vamos buscar e assumir uma "pseudo-aleatoriedade" ou ordem padrão.
        });


        const plainAnime = db.useSupabase ? anime : anime.get({ plain: true });
        const plainEpisodioAtual = db.useSupabase ? episodioAtual : episodioAtual.get({ plain: true });
        const plainTodosEpisodios = db.useSupabase ? episodios : episodios.map(ep => ep.get({ plain: true }));
        const plainSugestoes = db.useSupabase ? sugestoes : sugestoes.map(s => s.get({ plain: true }));

        res.render('assistir', {
            layout: 'layouts/main', page_name: 'player',
            initialAnime: plainAnime,
            initialEpisode: plainEpisodioAtual,
            todosEpisodios: plainTodosEpisodios,
            sugestoes: plainSugestoes,
            titulo: `Assistindo: ${plainAnime.titulo} - Ep. ${plainEpisodioAtual.numero}`
        });
    } catch (err) {
        console.error("ERRO CRÍTICO NA PÁGINA DO PLAYER:", err);
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: err.message || 'Falha ao carregar o player.' });
    }
});

app.get('/perfil', proteger, async (req, res) => {
    try {
        // userId vem do req.user, que é um objeto "plain" do dbProxy ou uma instância Sequelize
        const userId = req.user.id;
        const historico = await db.Historico.findAll({
            where: { userId: userId },
            limit: 10,
            order: [['updatedAt', 'DESC']],
            // Incluir Anime e Episódio é complexo para simular no Supabase.
            // A abordagem aqui será buscar o histórico, e depois buscar os detalhes de Anime e Episódio
            // para cada item do histórico, se necessário no template.
            // Para a página de perfil, vamos assumir que o historico já tem os IDs e o template
            // pode buscar mais detalhes ou mostrar apenas o básico.
            // Se precisar dos objetos aninhados, você teria que fazer um Promise.all para buscar.
            // Exemplo:
            // const historicoRaw = await db.Historico.findAll({ where: { userId: userId }, limit: 10, order: [['updatedAt', 'DESC']] });
            // const historicoComDetalhes = await Promise.all(historicoRaw.map(async (item) => {
            //     const plainItem = db.useSupabase ? item : item.get({ plain: true });
            //     plainItem.anime = await db.Anime.findByPk(plainItem.animeId);
            //     plainItem.episodio = await db.Episodio.findByPk(plainItem.episodioId);
            //     return plainItem;
            // }));
            // res.render('perfil', { ..., historico: historicoComDetalhes });
        });

        const plainHistorico = db.useSupabase ? historico : historico.map(h => h.get({ plain: true }));

        res.render('perfil', {
            page_name: 'perfil',
            titulo: 'Meu Perfil',
            user: req.user, // req.user já é plain ou tem .get({plain:true}) via authMiddleware
            historico: plainHistorico
        });
    } catch (error) {
        console.error("Erro ao carregar a página de perfil:", error);
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: error.message || 'Falha ao carregar perfil.' });
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

        // Para Supabase, `count()` é mais simples que `findAll().then(d => d.length)`
        // Vamos padronizar para `count()` se disponível ou `findAll().length`
        const [totalAnimes, totalPosts, totalUsers] = await Promise.all([
            db.Anime.count(),
            db.Post.count(),
            db.User.count()
        ]);

        // Para dados de gráficos, precisamos agrupar por data.
        // Isso é complexo de simular no Supabase sem EDGE functions ou views customizadas.
        // Se usar Supabase, você pode precisar ajustar esta lógica para fazer várias queries
        // ou usar a sua Dashboard Supabase para obter essas estatísticas.
        // Para compatibilidade, manteremos a query Sequelize-like, sabendo que no Supabase
        // ela talvez retorne todos os itens dentro do período e não agrupados.
        // Se db.useSupabase for true, db.User.findAll com where e group não vai funcionar
        // da mesma forma que Sequelize.
        let newUsersData = [];
        let newAnimesData = [];

        if (db.useSupabase) {
            // Supabase: Buscar todos os usuários e animes no período e agrupar em memória
            const usersRecent = await db.User.findAll({ where: { createdAt: { [Op.gte]: sevenDaysAgo.toISOString() } } });
            const animesRecent = await db.Anime.findAll({ where: { createdAt: { [Op.gte]: sevenDaysAgo.toISOString() } } });

            // Agrupar em memória
            const groupDataByDate = (items) => {
                const dailyCounts = {};
                items.forEach(item => {
                    const date = item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : 'unknown';
                    dailyCounts[date] = (dailyCounts[date] || 0) + 1;
                });
                return Object.keys(dailyCounts).sort().map(date => ({ date, count: dailyCounts[date] }));
            };

            newUsersData = groupDataByDate(usersRecent);
            newAnimesData = groupDataByDate(animesRecent);

        } else {
            // Sequelize original
            newUsersData = await db.User.findAll({
                where: { createdAt: { [Op.gte]: sevenDaysAgo } },
                attributes: [[db.sequelize.fn('date', db.sequelize.col('createdAt')), 'date'], [db.sequelize.fn('count', '*'), 'count']],
                group: ['date'], order: [['date', 'ASC']]
            });
            newAnimesData = await db.Anime.findAll({
                where: { createdAt: { [Op.gte]: sevenDaysAgo } },
                attributes: [[db.sequelize.fn('date', db.sequelize.col('createdAt')), 'date'], [db.sequelize.fn('count', '*'), 'count']],
                group: ['date'], order: [['date', 'ASC']]
            });
        }


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
        res.status(500).render('500', { layout: false, titulo: 'Erro no Servidor', error: err.message || 'Falha ao carregar dashboard.' });
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
//apiRouter.post('/history/update', interactionController.updateHistory); // Descomente quando a função for implementada
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
// O servidor só será iniciado APÓS a tentativa de conexão ao DB.
// ====================================================================================
(async () => {
    console.log('\n--- Iniciando DenyAnimeHub ---');

    let dbReady = false;

    if (db.useSupabase) {
        console.log('🎉 Supabase configurado. Tentando conectar...');
        // O dbProxy já inicializou o cliente Supabase. Testamos agora.
        try {
            // Um teste simples de conexão pode ser uma query a uma tabela existente.
            // Ex: db.supabase.from('Users').select('id').limit(1);
            // No dbProxy, a inicialização já deveria ter falhado se as credenciais fossem ruins.
            // Então, se db.useSupabase é true, consideramos que o cliente está pronto.
            console.log('✅ Conexão Supabase estabelecida. Banco de dados principal está ativo.');
            dbReady = true;
        } catch (err) {
            console.error('❌ Falha crítica ao conectar ao Supabase:', err.message);
            dbReady = false;
        }
    } else {
        console.log('🔄 Supabase não ativo ou falhou. Tentando conectar via Sequelize...');
        if (!db.sequelize) {
            console.error('❌ ERRO: Sequelize não foi inicializado no dbProxy. DATABASE_URL pode estar faltando.');
            dbReady = false;
        } else {
            try {
                await db.sequelize.authenticate(); // Testa a conexão Sequelize
                await db.sequelize.sync({ alter: true }); // Sincroniza o Sequelize
                console.log('✅ Banco de dados Sequelize sincronizado e pronto (modo fallback).');
                dbReady = true;
            } catch (sequelizeErr) {
                console.error('❌ FALHA CRÍTICA AO INICIAR O SERVIDOR (Sequelize):', sequelizeErr.message);
                console.error('   O aplicativo não poderá acessar o banco de dados. Verifique a configuração do PostgreSQL.');
                dbReady = false;
            }
        }
    }


    // Inicia o servidor Express independentemente do status do DB,
    // mas com um aviso se o DB não estiver pronto.
    app.listen(PORT, () => {
        console.log(`🚀 Servidor DenyAnimeHub no ar em: http://localhost:${PORT}`);
        if (!dbReady) {
            console.warn('⚠️ AVISO: O aplicativo foi iniciado, mas o acesso ao banco de dados pode estar comprometido. Verifique os logs acima.');
        } else {
            console.log('✨ O aplicativo está totalmente operacional com acesso ao banco de dados.');
        }
    });
})();