'use strict';

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

/**
 * Rotas de autenticação
 */
router.post('/registrar', authController.registrar);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password', authController.resetPassword); // PUT para atualização de senha

/**
 * Google OAuth
 */
router.get('/google', authController.googleLogin);       // Retorna JSON com a URL de login
router.get('/google/callback', authController.googleCallback); // Processa o callback do Google

/**
 * Logout
 * (pode ser GET ou POST, dependendo de como o controller está implementado)
 */
router.post('/logout', authController.logout);

/**
 * Autenticação por telefone (OTP)
 */
router.post('/send-phone-otp', authController.sendPhoneOtp);
router.post('/verify-phone-otp', authController.verifyPhoneOtp);

module.exports = router;
