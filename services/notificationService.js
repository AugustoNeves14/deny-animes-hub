'use strict';
const db = require('../models');
const sendEmail = require('../utils/sendEmail');
const ejs = require('ejs');
const path = require('path');

/**
 * Envia notificações por e-mail para todos os usuários sobre novos animes ou episódios.
 * @param {object} anime - A instância do modelo Anime.
 * @param {object|null} episodio - A instância do modelo Episodio (opcional).
 */
const sendNotification = async (anime, episodio = null) => {
    console.log("--- INICIANDO PROCESSO DE NOTIFICAÇÃO EM MASSA ---");
    
    if (!anime || !anime.titulo) {
        console.error("ERRO DE NOTIFICAÇÃO: Objeto 'anime' inválido ou sem título.");
        throw new Error("Anime inválido para notificação");
    }

    try {
        // Busca TODOS os usuários para notificação
        const allUsers = await db.User.findAll({
            attributes: ['email']
        });

        if (allUsers.length === 0) {
            console.log("--- PROCESSO DE NOTIFICAÇÃO ENCERRADO (SEM USUÁRIOS REGISTRADOS) ---");
            return;
        }

        const emails = allUsers.map(user => user.email).filter(email => email);
        
        if (emails.length === 0) {
            console.log("Nenhum e-mail válido encontrado para notificação");
            return;
        }

        const tipoNotificacao = episodio ? 'Novo Episódio Disponível' : 'Novo Anime Adicionado';
        
        // Usar APP_URL do ambiente ou fallback para URL local
        const baseUrl = process.env.APP_URL || 'http://localhost:3000';
        const urlDestino = episodio
            ? `${baseUrl}/assistir/${anime.slug}/${episodio.id}`
            : `${baseUrl}/anime/${anime.slug}`;

        // Renderizar o template de e-mail
        const emailHtml = await ejs.renderFile(
            path.join(__dirname, '../views/email/notificacaoAnime.ejs'),
            { 
                anime, 
                episodio, 
                tipoNotificacao, 
                urlDestino,
                baseUrl 
            }
        );

        console.log(`Preparando para enviar notificação para ${emails.length} e-mails...`);

        // Enviar e-mail para todos os usuários em BCC
        await sendEmail({
            to: process.env.EMAIL_USERNAME, // Para controle e evitar problemas com BCC vazio
            bcc: emails,
            subject: `🔥 ${tipoNotificacao}: ${anime.titulo}`,
            html: emailHtml,
            text: `Olá! Temos uma novidade para você: ${tipoNotificacao} - ${anime.titulo}. Acesse: ${urlDestino}`
        });

        console.log("✅ Notificação enviada com sucesso para todos os usuários");

    } catch (error) {
        console.error("❌ ERRO NO SERVIÇO DE NOTIFICAÇÃO:", error.message);
        throw error;
    }
};

module.exports = { sendNotification };