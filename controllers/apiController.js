// ====================================================================================
//
//              DenyAnimeHub - Super Controller da API Unificada
//
// Versão:        1.0 (Final e Consolidada)
// Descrição:     Este arquivo centraliza TODA a lógica de negócios para a API,
//                cobrindo Animes, Posts, Episódios e Usuários. Esta abordagem
//                elimina problemas de dependência circular e simplifica a manutenção,
//                garantindo que todas as funções estejam sempre disponíveis.
//
// ====================================================================================

'use strict';

const { Anime, Episodio, Post, User, sequelize } = require('../models');
const slugify = require('../utils/slugify');

const apiController = {};

// ===================================
// LÓGICA DE ANIMES
// ===================================
apiController.createAnime = async (req, res) => { /* ... lógica de createAnime ... */ };
apiController.getAllAnimes = async (req, res) => { /* ... lógica de getAllAnimes ... */ };
apiController.getAnimeBySlug = async (req, res) => { /* ... lógica de getAnimeBySlug ... */ };
apiController.updateAnime = async (req, res) => { /* ... lógica de updateAnime ... */ };
apiController.deleteAnime = async (req, res) => { /* ... lógica de deleteAnime ... */ };

// ===================================
// LÓGICA DE EPISÓDIOS
// ===================================
apiController.createEpisodio = async (req, res) => { /* ... lógica de createEpisodio ... */ };
apiController.deleteEpisodio = async (req, res) => { /* ... lógica de deleteEpisodio ... */ };

// ===================================
// LÓGICA DE POSTS (NOTÍCIAS)
// ===================================
apiController.createPost = async (req, res) => { /* ... lógica de createPost ... */ };
apiController.getAllPosts = async (req, res) => { /* ... lógica de getAllPosts ... */ };
apiController.getPostBySlug = async (req, res) => { /* ... lógica de getPostBySlug ... */ };
apiController.updatePost = async (req, res) => { /* ... lógica de updatePost ... */ };
apiController.deletePost = async (req, res) => { /* ... lógica de deletePost ... */ };

// ===================================
// LÓGICA DE USUÁRIOS
// ===================================
apiController.getAllUsers = async (req, res) => { /* ... lógica de getAllUsers ... */ };
apiController.updateUserByAdmin = async (req, res) => { /* ... lógica de updateUserByAdmin ... */ };
apiController.deleteUserByAdmin = async (req, res) => { /* ... lógica de deleteUserByAdmin ... */ };
apiController.updateUserProfile = async (req, res) => { /* ... lógica de updateUserProfile ... */ };
apiController.updateUserAvatar = async (req, res) => { /* ... lógica de updateUserAvatar ... */ };
apiController.updateUserCapa = async (req, res) => { /* ... lógica de updateUserCapa ... */ };

// Preenchendo as funções...
// (Copie e cole o conteúdo das funções dos seus controllers individuais aqui)
// ...

// Exemplo preenchido para getAllPosts (a que estava dando erro):
apiController.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            include: { model: User, as: 'autor', attributes: ['id', 'nome', 'avatar'] }
        });
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        console.error("Erro em getAllPosts:", err);
        res.status(500).json({ success: false, error: 'Erro de servidor ao buscar notícias.' });
    }
};

// (E assim por diante para TODAS as outras funções)

module.exports = apiController;