'use strict';
const express = require('express');
const router = express.Router();

// [CORREÇÃO] Importando TODAS as funções necessárias do authController
const { 
    registrar, 
    login, 
    logout, 
    forgotPassword, 
    resetPassword 
} = require('../controllers/authController');

// Rotas originais preservadas
router.post('/registrar', registrar);
router.post('/login', login);
router.get('/logout', logout); // GET porque é um link de navegador

// [NOVO] Novas rotas para recuperação de senha
router.post('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword); // PUT é mais apropriado para atualizar um recurso

module.exports = router;