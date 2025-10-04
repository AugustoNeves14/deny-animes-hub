const express = require('express');
const router = express.Router();
const { listarAnimes, criarAnime } = require('../controllers/animeController');
const { proteger } = require('../middleware/authMiddleware'); // Proteger a rota de criação

// Rota pública para listar animes
router.get('/', listarAnimes);

// Rota privada para criar um novo anime (apenas para admins, por exemplo)
// Adicionamos o middleware 'proteger' aqui
router.post('/', proteger, criarAnime);

// ... (outras importações como express, router)
const { ensureAuthenticated } = require('../config/auth');
const Anime = require('../models/Anime');
const Episodio = require('../models/Episodio'); // Supondo que você tem este modelo
const Historico = require('../models/Historico'); // IMPORTAR O NOVO MODELO

// ROTA ATUALIZADA do player que salva o progresso do usuário
router.get('/assistir/:animeId/:epNumero', ensureAuthenticated, async (req, res) => {
    try {
        const { animeId, epNumero } = req.params;
        const anime = await Anime.findById(animeId);
        const episodio = await Episodio.findOne({ anime: animeId, numero: epNumero });
        const todosEpisodios = await Episodio.find({ anime: animeId }).sort({ numero: 1 });

        if (!anime || !episodio) {
            req.flash('error_msg', 'Anime ou episódio não encontrado.');
            return res.redirect('/');
        }
        
        // --- LÓGICA PARA SALVAR/ATUALIZAR O HISTÓRICO ---
        await Historico.findOneAndUpdate(
            { usuario: req.user.id, anime: animeId }, // Condição para encontrar
            { ultimoEpisodioAssistido: { numero: episodio.numero, titulo: episodio.titulo } }, // O que atualizar
            { upsert: true, new: true, setDefaultsOnInsert: true } // Opções: criar se não existir
        );

        // Renderiza a página do player normalmente
        res.render('player', { // Use o nome do seu arquivo de player
            page_name: 'player',
            anime,
            episodio,
            todosEpisodios,
            user: req.user
        });

    } catch (err) {
        console.error("Erro na página do player:", err);
        req.flash('error_msg', 'Ocorreu um erro ao carregar o player.');
        res.redirect('/');
    }
});

// ... (outras rotas)
module.exports = router;

module.exports = router;