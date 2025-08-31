// No topo do arquivo, garanta que estas importações existem
const Historico = require('../models/Historico');
const Anime = require('../models/Anime');

// Substitua sua rota de teste por esta versão completa e final
router.get('/perfil', ensureAuthenticated, async (req, res) => {
    try {
        // Busca os dados do histórico no banco de dados
        const historicoItens = await Historico.find({ usuario: req.user.id })
            .sort({ updatedAt: -1 })
            .limit(12)
            .populate('anime');

        // Renderiza a página ENVIANDO AMBAS as variáveis
        res.render('perfil', {
            page_name: 'perfil',
            user: req.user,
            historicoItens: historicoItens // A variável agora existe!
        });

    } catch (err) {
        console.error("Erro ao carregar a página de perfil:", err);
        req.flash('error_msg', 'Erro ao carregar o perfil.');
        res.redirect('/');
    }
});