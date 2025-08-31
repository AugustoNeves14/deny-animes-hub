'use strict';

const db = require('../models');
const { convertToEmbedUrl } = require('../utils/linkConverter.js');
const fs = require('fs').promises;
const path = require('path');
const { sendNotification } = require('../services/notificationService'); // Importa o serviço

const episodioController = {};

/**
 * Deleta de forma segura um arquivo de vídeo físico do servidor.
 * @param {string} filePath - O caminho relativo do arquivo a ser deletado.
 */
const deletarArquivoDeVideo = async (filePath) => {
    if (!filePath || filePath.includes('default-') || !filePath.startsWith('/uploads/videos/')) {
        return;
    }
    try {
        const fullPath = path.join(__dirname, '..', 'public', filePath);
        await fs.unlink(fullPath);
        console.log(`[Episodio Controller] Arquivo de vídeo deletado com sucesso: ${fullPath}`);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.error(`[Episodio Controller] Falha ao deletar arquivo de vídeo físico: ${filePath}`, err);
        }
    }
};

/**
 * Função interna para criar episódio e disparar notificação.
 * @param {object} episodioData - Os dados do episódio a ser criado.
 * @param {object} res - O objeto de resposta do Express.
 */
const createAndNotify = async (episodioData, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const novoEpisodio = await db.Episodio.create(episodioData, { transaction });
        const animeAssociado = await db.Anime.findByPk(novoEpisodio.animeId, { transaction });

        if (animeAssociado) {
            // [INTEGRAÇÃO] Envia a notificação com os dados do anime e do novo episódio
            sendNotification(animeAssociado, novoEpisodio).catch(err => {
                console.error("Falha assíncrona ao enviar notificação de novo episódio:", err);
            });
        }
        
        await transaction.commit();
        res.status(201).json({ success: true, data: novoEpisodio });

    } catch (error) {
        await transaction.rollback();
        console.error("[Episodio Controller] Erro na transação de criação de episódio:", error);
        
        // Se a criação no DB falhar e for um upload, deleta o arquivo órfão
        if (episodioData.tipoVideo === 'upload' && episodioData.urlVideo) {
            await deletarArquivoDeVideo(episodioData.urlVideo);
        }
        res.status(500).json({ success: false, error: 'Erro interno no servidor ao criar episódio.' });
    }
};

/**
 * @route   POST /api/episodios
 * @desc    Cria um novo episódio a partir de um link externo.
 */
episodioController.createEpisodioViaLink = async (req, res) => {
    try {
        const { animeId, numero, titulo, urlVideo, tipoVideo, temporada } = req.body;
        const numEpisodio = parseInt(numero, 10);
        const numTemporada = parseInt(temporada, 10);
        const idAnime = parseInt(animeId, 10);

        if (!idAnime || !numEpisodio || !numTemporada || !tipoVideo || !urlVideo) {
            return res.status(400).json({ success: false, error: 'Dados essenciais do episódio estão faltando.' });
        }
        const existingEpisodio = await db.Episodio.findOne({ where: { animeId: idAnime, numero: numEpisodio, temporada: numTemporada } });
        if (existingEpisodio) {
            return res.status(409).json({ success: false, error: `Conflito: O episódio ${numEpisodio} da temporada ${numTemporada} já existe.` });
        }
        const finalUrl = convertToEmbedUrl(urlVideo, tipoVideo);
        if (!finalUrl) {
            return res.status(400).json({ success: false, error: 'URL fornecida é inválida ou não suportada.' });
        }
        await createAndNotify({ animeId: idAnime, numero: numEpisodio, titulo: titulo || null, urlVideo: finalUrl, tipoVideo: tipoVideo, temporada: numTemporada }, res);
    } catch (error) {
        console.error("[Episodio Controller] Erro ao processar link:", error);
        res.status(500).json({ success: false, error: 'Erro interno no servidor.' });
    }
};

/**
 * @route   POST /api/episodios/upload
 * @desc    Cria um novo episódio a partir de um upload de arquivo.
 */
episodioController.createEpisodioComUpload = async (req, res) => {
    const filePath = req.file ? `/uploads/videos/${req.file.filename}` : null;
    try {
        const { animeId, numero, titulo, temporada } = req.body;
        const numEpisodio = parseInt(numero, 10);
        const numTemporada = parseInt(temporada, 10);
        const idAnime = parseInt(animeId, 10);

        if (!req.file) { return res.status(400).json({ success: false, error: 'Nenhum arquivo de vídeo foi enviado.' }); }
        if (!idAnime || !numEpisodio || !numTemporada) { await deletarArquivoDeVideo(filePath); return res.status(400).json({ success: false, error: 'Dados essenciais do episódio estão faltando.' }); }
        
        const existingEpisodio = await db.Episodio.findOne({ where: { animeId: idAnime, numero: numEpisodio, temporada: numTemporada } });
        if (existingEpisodio) { await deletarArquivoDeVideo(filePath); return res.status(409).json({ success: false, error: `Conflito: O episódio ${numEpisodio} da temporada ${numTemporada} já existe.` }); }
        
        await createAndNotify({ animeId: idAnime, numero: numEpisodio, titulo: titulo || null, urlVideo: filePath, tipoVideo: 'upload', temporada: numTemporada }, res);
    } catch (error) {
        if (filePath) await deletarArquivoDeVideo(filePath);
        console.error("[Episodio Controller] Erro no upload:", error);
        res.status(500).json({ success: false, error: 'Erro interno no servidor.' });
    }
};

/**
 * @route   DELETE /api/episodios/:id
 * @desc    Deleta um episódio específico.
 */
episodioController.deleteEpisodio = async (req, res) => {
    try {
        const { id } = req.params;
        const episodio = await db.Episodio.findByPk(id);
        if (!episodio) {
            return res.status(404).json({ success: false, error: 'Episódio não encontrado.' });
        }
        if (episodio.tipoVideo === 'upload') {
            await deletarArquivoDeVideo(episodio.urlVideo);
        }
        await episodio.destroy();
        res.status(200).json({ success: true, message: 'Episódio deletado com sucesso.' });
    } catch (error) {
        console.error(`[Episodio Controller] Erro ao deletar episódio ID (${req.params.id}):`, error);
        res.status(500).json({ success: false, error: 'Ocorreu um erro no servidor ao deletar o episódio.' });
    }
};

module.exports = episodioController;