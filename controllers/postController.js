// ====================================================================================
//
//              DenyAnimeHub - Controller: Posts (Versão Definitiva e Robusta)
//
// ====================================================================================

'use strict';

const db = require('../models');
const slugify = require('../utils/slugify');

// Objeto principal do controller que será exportado
const postApiController = {};

/**
 * @route   POST /api/posts
 * @desc    Cria uma nova notícia.
 * @access  Admin
 */
postApiController.createPost = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const { titulo, conteudo, imagemDestaque, categoria, tags, emDestaque } = req.body;
        
        if (!titulo || !conteudo) {
            await transaction.rollback();
            return res.status(400).json({ success: false, error: 'Título e conteúdo são obrigatórios.' });
        }

        const slug = slugify(titulo);

        const postData = {
            titulo,
            slug,
            conteudo,
            imagemDestaque: imagemDestaque || '/images/default-cover.png',
            categoria,
            tags: tags ? JSON.stringify(tags.split(',').map(t => t.trim())) : JSON.stringify([]),
            emDestaque: emDestaque === 'on' || emDestaque === true,
            autorId: req.user.id
        };

        const novoPost = await db.Post.create(postData, { transaction });
        await transaction.commit();

        res.status(201).json({ success: true, data: novoPost });
    } catch (error) {
        await transaction.rollback();
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ success: false, error: 'Uma notícia com este título já existe.' });
        }
        console.error("[Post Controller] Erro ao criar post:", error);
        res.status(500).json({ success: false, error: 'Erro interno ao criar a notícia.' });
    }
};

/**
 * @route   GET /api/posts
 * @desc    Busca todas as notícias.
 * @access  Admin
 */
postApiController.getAllPosts = async (req, res) => {
    try {
        const posts = await db.Post.findAll({
            order: [['createdAt', 'DESC']],
            include: { model: db.User, as: 'autor', attributes: ['id', 'nome', 'avatar'] }
        });
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        console.error("[Post Controller] Erro ao buscar todos os posts:", err);
        res.status(500).json({ success: false, error: 'Erro de servidor ao buscar notícias.' });
    }
};

/**
 * @route   GET /api/posts/:id
 * @desc    Busca um único post pelo seu ID. (Função que estava faltando)
 * @access  Admin
 */
postApiController.getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await db.Post.findByPk(id, {
             include: { model: db.User, as: 'autor', attributes: ['id', 'nome', 'avatar'] }
        });

        if (!post) {
            return res.status(404).json({ success: false, error: 'Notícia não encontrada.' });
        }
        res.status(200).json({ success: true, data: post });
    } catch (err) {
        console.error(`[Post Controller] Erro ao buscar post por ID (${req.params.id}):`, err);
        res.status(500).json({ success: false, error: 'Erro de servidor ao buscar detalhes da notícia.' });
    }
};

/**
 * @route   GET /api/posts/slug/:slug
 * @desc    Busca um único post pelo seu SLUG.
 * @access  Admin
 */
postApiController.getPostBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const post = await db.Post.findOne({
            where: { slug },
            include: { model: db.User, as: 'autor', attributes: ['id', 'nome', 'avatar'] }
        });
        if (!post) {
            return res.status(404).json({ success: false, error: 'Notícia não encontrada.' });
        }
        res.status(200).json({ success: true, data: post });
    } catch (err) {
        console.error(`[Post Controller] Erro ao buscar post por SLUG (${req.params.slug}):`, err);
        res.status(500).json({ success: false, error: 'Erro de servidor ao buscar detalhes da notícia.' });
    }
};


/**
 * @route   PUT /api/posts/:id
 * @desc    Atualiza uma notícia.
 * @access  Admin
 */
postApiController.updatePost = async (req, res) => {
    const { id } = req.params;
    const transaction = await db.sequelize.transaction();
    try {
        const post = await db.Post.findByPk(id);
        if (!post) {
            await transaction.rollback();
            return res.status(404).json({ success: false, error: 'Notícia não encontrada para atualização.' });
        }
        
        const updateData = { ...req.body };
        // Se o título mudar, atualiza o slug também
        if (updateData.titulo && updateData.titulo !== post.titulo) {
            updateData.slug = slugify(updateData.titulo);
        }
        // Converte o valor do checkbox
        updateData.emDestaque = updateData.emDestaque === 'on' || updateData.emDestaque === true;

        await post.update(updateData, { transaction });
        await transaction.commit();

        res.status(200).json({ success: true, data: post });
    } catch (err) {
        await transaction.rollback();
        console.error(`[Post Controller] Erro ao atualizar post (${id}):`, err);
        res.status(500).json({ success: false, error: "Não foi possível atualizar a notícia." });
    }
};

/**
 * @route   DELETE /api/posts/:id
 * @desc    Deleta uma notícia.
 * @access  Admin
 */
postApiController.deletePost = async (req, res) => {
    const { id } = req.params;
    const transaction = await db.sequelize.transaction();
    try {
        const deletedRows = await db.Post.destroy({ where: { id }, transaction });
        if (deletedRows === 0) {
            await transaction.rollback();
            return res.status(404).json({ success: false, error: 'Notícia não encontrada.' });
        }
        await transaction.commit();
        res.status(200).json({ success: true, message: 'Notícia deletada com sucesso.' });
    } catch (err) {
        await transaction.rollback();
        console.error(`[Post Controller] Erro ao deletar post (${id}):`, err);
        res.status(500).json({ success: false, error: 'Erro de servidor ao deletar a notícia.' });
    }
};

// Exporta o objeto completo do controller
module.exports = postApiController;