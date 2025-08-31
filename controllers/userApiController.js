const db = require('../models');
const User = db.User;

// ===================================
// FUNÇÕES PARA O ADMIN
// ===================================

/**
 * @desc    Admin: Obter todos os usuários para o painel.
 * @route   GET /api/users
 * @access  Privado (Admin)
 */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ 
            order: [['createdAt', 'DESC']],
            // Seleciona apenas os campos necessários para a exibição no painel
            attributes: ['id', 'nome', 'email', 'role', 'createdAt', 'avatar'] 
        });
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (err) {
        console.error("Erro em getAllUsers:", err);
        res.status(500).json({ success: false, error: 'Erro de servidor ao buscar usuários.' });
    }
};

/**
 * @desc    Admin: Atualiza os dados de um usuário específico.
 * @route   PUT /api/users/:id
 * @access  Privado (Admin)
 */
exports.updateUserByAdmin = async (req, res) => {
    try {
        const { nome, email, role } = req.body;
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
        }
        
        // Atualiza os campos fornecidos
        user.nome = nome || user.nome;
        user.email = email || user.email;
        user.role = role || user.role;
        
        await user.save();

        const updatedUser = user.get({ plain: true });
        delete updatedUser.senha;

        res.status(200).json({ success: true, data: updatedUser });
    } catch (err) {
        console.error("Erro em updateUserByAdmin:", err);
        res.status(400).json({ success: false, error: err.message });
    }
};

/**
 * @desc    Admin: Deleta um usuário específico.
 * @route   DELETE /api/users/:id
 * @access  Privado (Admin)
 */
exports.deleteUserByAdmin = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
        }

        // Impede que um administrador delete a si mesmo
        if (Number(req.user.id) === Number(req.params.id)) {
            return res.status(400).json({ success: false, error: 'Você não pode deletar sua própria conta de administrador.' });
        }
        
        await user.destroy();
        res.status(200).json({ success: true, message: 'Usuário deletado com sucesso.' });
    } catch (err) {
        console.error("Erro em deleteUserByAdmin:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};


// ===================================
// FUNÇÕES PARA O USUÁRIO LOGADO
// ===================================

/**
 * @desc    Usuário: Atualiza o próprio perfil (nome, bio).
 * @route   PUT /api/user/profile
 * @access  Privado
 */
exports.updateUserProfile = async (req, res) => {
    try {
        const { nome, bio } = req.body;
        
        if (!nome || nome.trim() === '') {
            return res.status(400).json({ success: false, error: 'O nome de usuário não pode ficar em branco.' });
        }

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'Sessão inválida, usuário não encontrado.' });
        }

        user.nome = nome;
        user.bio = bio;
        await user.save();

        const updatedUser = user.get({ plain: true });
        delete updatedUser.senha;

        res.status(200).json({ success: true, message: 'Perfil atualizado com sucesso!', user: updatedUser });
    } catch (err) {
        console.error("Erro em updateUserProfile:", err);
        res.status(400).json({ success: false, error: err.message || 'Ocorreu um erro ao atualizar o perfil.' });
    }
};

/**
 * @desc    Usuário: Atualiza o próprio avatar.
 * @route   POST /api/user/profile/avatar
 * @access  Privado
 */
exports.updateUserAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Nenhum arquivo de imagem enviado.' });
        }

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
        }

        // CORREÇÃO CRUCIAL: Salva o caminho PÚBLICO completo no banco de dados.
        const avatarPath = `/uploads/avatars/${req.file.filename}`;
        user.avatar = avatarPath;
        await user.save();
        
        const updatedUser = user.get({ plain: true });
        delete updatedUser.senha;
        
        res.status(200).json({ success: true, message: 'Avatar atualizado!', user: updatedUser });
    } catch (err) {
        console.error("Erro em updateUserAvatar:", err);
        res.status(400).json({ success: false, error: err.message });
    }
};

/**
 * @desc    Usuário: Atualiza a própria capa do perfil.
 * @route   POST /api/user/profile/capa
 * @access  Privado
 */
exports.updateUserCapa = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Nenhum arquivo de imagem enviado.' });
        }

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
        }

        // CORREÇÃO CRUCIAL: Salva o caminho PÚBLICO completo no banco de dados.
        // O nome do campo no seu model é 'capaPerfil'
        const capaPath = `/uploads/capas/${req.file.filename}`;
        user.capaPerfil = capaPath;
        await user.save();
        
        const updatedUser = user.get({ plain: true });
        delete updatedUser.senha;
        
        res.status(200).json({ success: true, message: 'Capa do perfil atualizada!', user: updatedUser });
    } catch (err) {
        console.error("Erro em updateUserCapa:", err);
        res.status(400).json({ success: false, error: err.message });
    }
};