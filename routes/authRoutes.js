'use strict';

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// Rotas de autenticação
router.post('/registrar', authController.registrar);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password', authController.resetPassword); // PUT é mais apropriado

// Google OAuth
router.get('/google', authController.googleLogin); // Retorna JSON com URL
router.get('/google/callback', authController.googleCallback); // Processa callback

// Logout
router.get('/logout', authController.logout); // Ou use POST, dependendo da lógica no controller

// Alternativa: se quiser usar POST para logout via API
// router.post('/logout', (req, res) => {
//     res.clearCookie('token');
//     res.json({ success: true, message: 'Logout realizado com sucesso' });
// });

module.exports = router;
