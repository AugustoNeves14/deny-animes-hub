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
        return;
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

        const emails = allUsers.map(user => user.email);
        const tipoNotificacao = episodio ? 'Novo Episódio Disponível' : 'Novo Anime Adicionado';
        
        const urlDestino = episodio
            ? `${process.env.APP_URL}/assistir/${anime.slug}/${episodio.id}`
            : `${process.env.APP_URL}/anime/${anime.slug}`;
        
        if (!process.env.APP_URL) {
            console.error("ERRO GRAVE: A variável de ambiente APP_URL não está definida! As URLs nos e-mails estarão quebradas.");
        }

        const emailHtml = await ejs.renderFile(
            path.join(__dirname, '../views/email/notificacaoAnime.ejs'),
            { anime, episodio, tipoNotificacao, urlDestino }
        );

        console.log(`Preparando para enviar notificação para ${emails.length} e-mails...`);

        // [CORREÇÃO DEFINITIVA] Envia um único e-mail para você, com todos os outros usuários em cópia oculta.
        // Esta é a maneira mais eficiente e segura de enviar e-mails em massa.
        await sendEmail({
            to: 'denyneves14@gmail.com', // O destinatário principal, para seu controle
            bcc: emails, // Todos os seus usuários recebem uma cópia sem ver os outros destinatários
            subject: `🔥 ${tipoNotificacao}: ${anime.titulo}`,
            html: emailHtml
        });

        // O console.log de sucesso já está dentro da função sendEmail.

    } catch (error) {
        // O erro detalhado já será logado pela função sendEmail, aqui apenas registramos o contexto.
        console.error("!!! ERRO NO SERVIÇO DE NOTIFICAÇÃO: Não foi possível completar o envio de e-mails.", error.message);
    }
};

module.exports = { sendNotification };