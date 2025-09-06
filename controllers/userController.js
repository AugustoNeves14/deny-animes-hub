'use strict';
const db = require('../models');
const {
    deleteImageFromDb
} = require('../utils/imageDbHandler'); // Importe a função

const userController = {};

// --- Funções de Perfil do Usuário Logado ---

/**
 * Atualiza as informações de perfil do usuário logado (nome, bio, notificações).
 * @param {object} req - O objeto de requisição do Express.
 * @param {object} res - O objeto de resposta do Express.
 */
userController.updateUserProfile = async (req, res) => {
    try {
        const {
            nome,
            bio,
            receberNotificacoes
        } = req.body;

        if (!nome || nome.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'O nome de usuário não pode ficar em branco.'
            });
        }

        const user = await db.User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado.'
            });
        }

        user.nome = nome;
        user.bio = bio || '';
        user.receberNotificacoes = !!receberNotificacoes;

        await user.save();

        const updatedUser = user.get({
            plain: true
        });
        delete updatedUser.senha;

        res.status(200).json({
            success: true,
            message: 'Perfil atualizado com sucesso!',
            user: updatedUser
        });
    } catch (err) {
        console.error("Erro em updateUserProfile:", err);
        res.status(500).json({
            success: false,
            message: 'Erro interno ao atualizar o perfil.'
        });
    }
};

/**
 * Atualiza avatar do usuário - VERSÃO CORRIGIDA
 */
userController.updateUserAvatar = async (req, res) => {
    try {
        if (!req.fileUrl) {
            return res.status(400).json({
                success: false,
                error: 'Nenhuma imagem foi enviada ou processada.'
            });
        }

        const user = await db.User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Usuário não encontrado.'
            });
        }

        // Se existir um avatar antigo no banco, podemos excluí-lo
        if (user.avatarImageId) {
            try {
                await deleteImageFromDb(user.avatarImageId);
            } catch (deleteError) {
                console.warn('Não foi possível excluir avatar antigo:', deleteError);
            }
        }

        // Atualizar com a URL do banco de dados
        await user.update({
            avatar: req.fileUrl, // URL do banco: /db-image/id/123
            avatarImageId: req.fileDb ? req.fileDb.id : null
        });

        res.json({
            success: true,
            message: 'Avatar atualizado com sucesso!',
            avatarUrl: req.fileUrl
        });

    } catch (error) {
        console.error('Erro ao atualizar avatar:', error);
        res.status(500).json({
            success: false,
            error: 'Erro interno ao atualizar avatar.'
        });
    }
};

/**
 * Atualiza capa do perfil - VERSÃO CORRIGIDA
 */
userController.updateUserCapa = async (req, res) => {
    try {
        if (!req.fileUrl) {
            return res.status(400).json({
                success: false,
                error: 'Nenhuma imagem foi enviada ou processada.'
            });
        }

        const user = await db.User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Usuário não encontrado.'
            });
        }

        // Se existir uma capa antiga no banco, podemos excluí-la
        if (user.capaImageId) {
            try {
                await deleteImageFromDb(user.capaImageId);
            } catch (deleteError) {
                console.warn('Não foi possível excluir capa antiga:', deleteError);
            }
        }

        // Atualizar com a URL do banco de dados
        await user.update({
            capa: req.fileUrl, // URL do banco: /db-image/id/123
            capaImageId: req.fileDb ? req.fileDb.id : null
        });

        res.json({
            success: true,
            message: 'Capa de perfil atualizada com sucesso!',
            capaUrl: req.fileUrl
        });

    } catch (error) {
        console.error('Erro ao atualizar capa de perfil:', error);
        res.status(500).json({
            success: false,
            error: 'Erro interno ao atualizar capa de perfil.'
        });
    }
};


// --- Funções de Gerenciamento de Admin ---

/**
 * Retorna todos os usuários (rota de admin).
 * @param {object} req - O objeto de requisição do Express.
 * @param {object} res - O objeto de resposta do Express.
 */
userController.getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            attributes: ['id', 'nome', 'email', 'role', 'createdAt', 'avatar']
        });
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (err) {
        console.error("Erro ao buscar todos os usuários:", err);
        res.status(500).json({
            success: false,
            error: 'Erro de servidor ao buscar usuários.'
        });
    }
};

/**
 * Retorna um único usuário pelo seu ID (rota de admin).
 * @param {object} req - O objeto de requisição do Express.
 * @param {object} res - O objeto de resposta do Express.
 */
userController.getSingleUser = async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Usuário não encontrado.'
            });
        }

        res.status(200).json({
            success: true,
            data: user.get({
                plain: true
            })
        });
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({
            success: false,
            error: 'Erro no servidor.'
        });
    }
};

/**
 * Atualiza as informações de um usuário (rota de admin).
 * @param {object} req - O objeto de requisição do Express.
 * @param {object} res - O objeto de resposta do Express.
 */
userController.updateUserByAdmin = async (req, res) => {
    try {
        const {
            nome,
            email,
            role
        } = req.body;
        const user = await db.User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Usuário não encontrado.'
            });
        }

        await user.update({
            nome,
            email,
            role
        });

        const updatedUser = user.get({
            plain: true
        });
        delete updatedUser.senha;

        res.status(200).json({
            success: true,
            data: updatedUser,
            message: 'Usuário atualizado com sucesso.'
        });
    } catch (err) {
        console.error("Erro ao atualizar usuário por admin:", err);
        res.status(400).json({
            success: false,
            error: 'Falha ao atualizar o usuário.'
        });
    }
};

/**
 * Deleta um usuário pelo seu ID (rota de admin).
 * @param {object} req - O objeto de requisição do Express.
 * @param {object} res - O objeto de resposta do Express.
 */
userController.deleteUserByAdmin = async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Usuário não encontrado.'
            });
        }

        // Impede que o admin se auto-delete
        if (Number(req.user.id) === Number(req.params.id)) {
            return res.status(400).json({
                success: false,
                error: 'Você não pode deletar sua própria conta.'
            });
        }

        // Se o usuário tiver avatar ou capa persistidos no banco de dados, eles devem ser removidos.
        if (user.avatarImageId) {
            try {
                await deleteImageFromDb(user.avatarImageId);
            } catch (deleteError) {
                console.warn('Não foi possível excluir avatar do usuário deletado:', deleteError);
            }
        }
        if (user.capaImageId) {
            try {
                await deleteImageFromDb(user.capaImageId);
            } catch (deleteError) {
                console.warn('Não foi possível excluir capa do usuário deletado:', deleteError);
            }
        }


        await user.destroy();

        res.status(200).json({
            success: true,
            message: 'Usuário deletado com sucesso.'
        });
    } catch (err) {
        console.error("Erro ao deletar usuário por admin:", err);
        res.status(500).json({
            success: false,
            error: 'Erro de servidor ao deletar usuário.'
        });
    }
};


module.exports = userController;