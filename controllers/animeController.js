'use strict';
const db = require('../models');
const slugify = require('../utils/slugify');
const { sendNotification } = require('../services/notificationService'); // Importa o serviço

// Objeto que conterá todas as funções do controller
const animeController = {};

// GET all animes
animeController.getAllAnimes = async (req, res) => {
    try {
        const animes = await db.Anime.findAll({ order: [['createdAt', 'DESC']], include: 'episodios' });
        res.status(200).json({ success: true, data: animes });
    } catch (error) {
        console.error("Erro ao buscar animes:", error);
        res.status(500).json({ success: false, error: 'Erro de servidor ao buscar animes.' });
    }
};

// GET single anime by slug
animeController.getAnimeBySlug = async (req, res) => {
    try {
        const anime = await db.Anime.findOne({ where: { slug: req.params.slug }, include: 'episodios' });
        if (!anime) {
            return res.status(404).json({ success: false, error: 'Anime não encontrado.' });
        }
        res.status(200).json({ success: true, data: anime });
    } catch (error) {
        console.error("Erro ao buscar anime por slug:", error);
        res.status(500).json({ success: false, error: 'Erro ao buscar anime.' });
    }
};

// CREATE a new anime
animeController.createAnime = async (req, res) => {
    try {
        const { titulo, sinopse, anoLancamento, generos, imagemCapa, classificacao, estudio, trailerUrl } = req.body;
        
        if (!titulo || !sinopse || !anoLancamento || !generos) {
            return res.status(400).json({ success: false, error: 'Campos como título, sinopse, ano e gêneros são obrigatórios.' });
        }

        const slug = slugify(titulo);

        const novoAnime = await db.Anime.create({
            titulo,
            slug,
            sinopse,
            anoLancamento,
            generos,
            imagemCapa: imagemCapa || '/images/placeholder_poster.png',
            classificacao: classificacao || null,
            estudio: estudio || null,
            trailerUrl: trailerUrl || null
        });

        // [INTEGRAÇÃO] Envia a notificação após o anime ser criado com sucesso
        // O .catch() garante que uma falha no envio de email não quebre a resposta principal para o admin
        sendNotification(novoAnime).catch(emailError => {
            console.error("Falha assíncrona ao enviar notificação de novo anime:", emailError);
        });

        res.status(201).json({ success: true, data: novoAnime });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ success: false, error: 'Um anime com este título ou slug já existe.' });
        }
        console.error("Erro ao criar anime:", error);
        res.status(500).json({ success: false, error: 'Erro no servidor ao criar anime.' });
    }
};

// UPDATE an anime
animeController.updateAnime = async (req, res) => {
    try {
        const slugParaAtualizar = req.params.slug;
        const { titulo, sinopse, anoLancamento, generos, imagemCapa, classificacao, estudio, trailerUrl } = req.body;
        
        const anime = await db.Anime.findOne({ where: { slug: slugParaAtualizar } });
        if (!anime) {
            return res.status(404).json({ success: false, error: 'Anime não encontrado para atualizar.' });
        }

        const novoSlug = titulo ? slugify(titulo) : anime.slug;

        await anime.update({
            titulo: titulo || anime.titulo,
            slug: novoSlug,
            sinopse: sinopse || anime.sinopse,
            anoLancamento: anoLancamento || anime.anoLancamento,
            generos: generos || anime.generos,
            imagemCapa: imagemCapa || anime.imagemCapa,
            classificacao: classificacao,
            estudio: estudio,
            trailerUrl: trailerUrl
        });

        res.status(200).json({ success: true, data: anime });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ success: false, error: 'Um anime com este novo título ou slug já existe.' });
        }
        console.error("Erro detalhado ao atualizar anime:", error);
        res.status(500).json({ success: false, error: 'Erro no servidor ao atualizar anime.' });
    }
};

// DELETE an anime
animeController.deleteAnime = async (req, res) => {
    try {
        const anime = await db.Anime.findOne({ where: { slug: req.params.slug } });
        if (!anime) {
            return res.status(404).json({ success: false, error: 'Anime não encontrado.' });
        }
        await anime.destroy();
        res.status(200).json({ success: true, message: 'Anime deletado com sucesso.' });
    } catch (error) {
        console.error("Erro ao deletar anime:", error);
        res.status(500).json({ success: false, error: 'Erro ao deletar anime.' });
    }
};

module.exports = animeController;