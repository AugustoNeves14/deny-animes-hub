const express = require('express');
const router = express.Router();
const { getDashboard, getAddAnimeForm, createAnime, getAddPostForm, createPost } = require('../controllers/adminController');
const { admin } = require('../middleware/adminMiddleware');

// Todas as rotas aqui serão prefixadas com /admin e protegidas
router.use(admin);

router.get('/dashboard', getDashboard);
router.get('/add-anime', getAddAnimeForm);
router.post('/add-anime', createAnime);
router.get('/add-post', getAddPostForm);
router.post('/add-post', createPost);

module.exports = router;