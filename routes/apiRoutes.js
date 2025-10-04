// ====================================================================================
//
//              DenyAnimeHub - Roteador da API Principal (Versão Definitiva)
//
// Descrição:     Reflete EXATAMENTE a lógica do app.js original, mas em um arquivo
//                separado e organizado. Inclui a rota de upload de capa que estava
//                faltando e causava o erro 404.
//
// ====================================================================================

const express = require('express');
const router = express.Router();

// --- MÓDULO 1: IMPORTAÇÕES ---

// Middlewares
const { proteger, admin } = require('../middleware/authMiddleware');
const { 
    processForm,
    uploadAvatar, 
    uploadCapa, 
    uploadVideo 
} = require('../middleware/uploadMiddleware');

// Controllers
const postApiController = require('../controllers/postController');
const userApiController = require('../controllers/userController');
const animeApiController = require('../controllers/animeController');
const episodioApiController = require('../controllers/episodioController');

// --- MÓDULO 2: APLICAÇÃO DE MIDDLEWARES ---

// Aplicando middleware de proteção a TODAS as rotas da API
router.use(proteger);

// --- MÓDULO 3: ROTAS DE PERFIL DE USUÁRIO (NÃO-ADMIN) ---
router.put('/user/profile', userApiController.updateUserProfile);
router.post('/user/profile/avatar', uploadAvatar, userApiController.updateUserAvatar);
router.post('/user/profile/capa', uploadCapa, userApiController.updateUserCapa);

// --- MÓDULO 4: ROTAS DE ADMINISTRAÇÃO ---

// Aplicando middleware de 'admin' para todas as rotas de gerenciamento abaixo
router.use(admin);

// >>>>> ROTA CRÍTICA QUE ESTAVA FALTANDO NO SEU APP.JS <<<<<
// Esta rota é chamada pelo seu painel para fazer o upload da imagem ANTES de salvar o anime.
router.post('/upload/capa', uploadCapa, (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, error: 'Nenhum arquivo de capa recebido.' });
    }
    // Retorna o caminho do arquivo para o frontend usar.
    res.json({ success: true, filePath: `/uploads/capas/${req.file.filename}` });
});

// Rotas de CRUD para Animes
router.get('/animes', animeApiController.getAllAnimes);
router.get('/animes/:slug', animeApiController.getAnimeBySlug);
router.post('/animes', processForm, animeApiController.createAnime);
router.put('/animes/:slug', processForm, animeApiController.updateAnime);
router.delete('/animes/:slug', animeApiController.deleteAnime);

// Rotas de CRUD para Episódios
router.post('/episodios', processForm, episodioApiController.createEpisodio);
router.delete('/episodios/:id', episodioApiController.deleteEpisodio);

// Rotas de CRUD para Notícias/Posts
router.get('/posts', postApiController.getAllPosts);
router.get('/posts/slug/:slug', postApiController.getPostBySlug);
router.post('/posts', processForm, postApiController.createPost);
router.put('/posts/:id', processForm, postApiController.updatePost);
router.delete('/posts/:id', postApiController.deletePost);

// Rotas de CRUD para Usuários
router.get('/users', userApiController.getAllUsers);
router.delete('/users/:id', userApiController.deleteUserByAdmin);


// --- MÓDULO 5: EXPORTAÇÃO ---
module.exports = router;