'use strict';
const db = require('../models');

const interactionController = {};

// Funções para a página de assistir
interactionController.getComments = async (req, res) => { try { const { animeId } = req.params; const comments = await db.Comment.findAll({ where: { animeId }, include: [{ model: db.User, as: 'author', attributes: ['id', 'nome', 'avatar'] }], order: [['createdAt', 'DESC']] }); res.status(200).json(comments); } catch (error) { console.error("Erro ao buscar comentários:", error); res.status(500).json({ success: false, error: 'Erro interno ao buscar comentários.' }); } };
interactionController.postComment = async (req, res) => { try { const { animeId, text } = req.body; const userId = req.user.id; if (!text || text.trim().length < 3) { return res.status(400).json({ success: false, error: 'O comentário deve ter no mínimo 3 caracteres.' }); } const newComment = await db.Comment.create({ animeId, userId, text }); const commentWithAuthor = await db.Comment.findByPk(newComment.id, { include: [{ model: db.User, as: 'author', attributes: ['id', 'nome', 'avatar'] }] }); res.status(201).json(commentWithAuthor); } catch (error) { console.error("Erro ao postar comentário:", error); res.status(500).json({ success: false, error: 'Erro interno ao salvar o comentário.' }); } };
interactionController.postRating = async (req, res) => { try { const { animeId, rating } = req.body; const userId = req.user.id; if (!animeId || !rating || rating < 1 || rating > 5) { return res.status(400).json({ success: false, error: 'Dados de classificação inválidos.' }); } const [ratingRecord, created] = await db.Rating.findOrCreate({ where: { userId, animeId }, defaults: { rating } }); if (!created) { ratingRecord.rating = rating; await ratingRecord.save(); } res.status(200).json({ success: true, message: 'Avaliação registrada com sucesso.' }); } catch (error) { console.error("Erro ao registrar avaliação:", error); res.status(500).json({ success: false, error: 'Erro interno ao registrar a avaliação.' }); } };

// Funções para o painel de admin
interactionController.getAllCommentsForAdmin = async (req, res) => { try { const comments = await db.Comment.findAll({ include: [ { model: db.User, as: 'author', attributes: ['nome', 'avatar'] }, { model: db.Anime, as: 'anime', attributes: ['titulo', 'slug'] } ], order: [['createdAt', 'DESC']] }); res.status(200).json({ success: true, data: comments }); } catch (error) { console.error("Erro ao buscar todos os comentários:", error); res.status(500).json({ success: false, error: 'Erro no servidor.' }); } };
interactionController.getSingleComment = async (req, res) => { try { const comment = await db.Comment.findByPk(req.params.id); if (!comment) { return res.status(404).json({ success: false, error: 'Comentário não encontrado.' }); } res.status(200).json({ success: true, data: comment }); } catch (error) { res.status(500).json({ success: false, error: 'Erro no servidor.' }); } };
interactionController.updateComment = async (req, res) => { try { const { text } = req.body; const comment = await db.Comment.findByPk(req.params.id); if (!comment) { return res.status(404).json({ success: false, error: 'Comentário não encontrado.' }); } comment.text = text; await comment.save(); res.status(200).json({ success: true, message: 'Comentário atualizado.' }); } catch (error) { res.status(500).json({ success: false, error: 'Erro no servidor.' }); } };
interactionController.deleteComment = async (req, res) => { try { const comment = await db.Comment.findByPk(req.params.id); if (!comment) { return res.status(404).json({ success: false, error: 'Comentário não encontrado.' }); } await comment.destroy(); res.status(200).json({ success: true, message: 'Comentário deletado.' }); } catch (error) { res.status(500).json({ success: false, error: 'Erro no servidor.' }); } };

interactionController.updateHistory = async (req, res) => {
    try {
        const { userId } = req.user; // Ou req.body, dependendo da sua lógica
        const { animeId, episodioId, watchedAt } = req.body;

        if (!userId || !animeId || !episodioId) {
            return res.status(400).json({ success: false, error: 'Dados de histórico insuficientes.' });
        }

        // Lógica para encontrar ou criar o registro no histórico
        // Exemplo:
        const [historico, created] = await db.Historico.findOrCreate({
            where: { userId, episodioId },
            defaults: {
                userId,
                animeId,
                episodioId,
                watchedAt: new Date(watchedAt)
            }
        });

        if (!created) {
            // Se já existia, apenas atualiza a data
            historico.watchedAt = new Date(watchedAt);
            await historico.save();
        }

        res.status(200).json({ success: true, message: 'Histórico atualizado com sucesso.' });

    } catch (error) {
        console.error('[Interaction Controller] Erro ao atualizar histórico:', error);
        res.status(500).json({ success: false, error: 'Erro no servidor ao atualizar histórico.' });
    }
};

module.exports = interactionController;