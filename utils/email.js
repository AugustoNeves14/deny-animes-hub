// /utils/email.js

'use strict';
const nodemailer = require('nodemailer');

/**
 * Envia um e-mail usando as configurações definidas no arquivo .env.
 * @param {object} options - As opções do e-mail.
 * @param {string|string[]} options.to - O destinatário principal ou uma lista de destinatários.
 * @param {string[]} [options.bcc] - Uma lista de destinatários em cópia oculta.
 * @param {string} options.subject - O assunto do e-mail.
 * @param {string} options.html - O corpo do e-mail em formato HTML.
 */
const sendEmail = async (options) => {
    // 1. Validação dos dados de ambiente
    if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
        console.error("ERRO CRÍTICO DE E-MAIL: EMAIL_USERNAME ou EMAIL_PASSWORD não estão definidos no arquivo .env.");
        // Não continua se as credenciais essenciais não estiverem configuradas.
        return; 
    }

    // 2. Criar um "transportador" - o serviço que vai enviar o email
    // Configurado para funcionar com Gmail, mas pode ser adaptado para outros serviços.
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail', // Usa 'gmail' como padrão se não definido
        auth: {
            user: process.env.EMAIL_USERNAME,
            // IMPORTANTE: Para o Gmail, esta deve ser uma "Senha de App" de 16 caracteres, não sua senha normal.
            // Você pode gerar uma em: https://myaccount.google.com/apppasswords
            pass: process.env.EMAIL_PASSWORD 
        }
    });

    // 3. Definir as opções do email
    const mailOptions = {
        from: `"${process.env.EMAIL_FROM || 'DenyAnimeHub'}" <${process.env.EMAIL_USERNAME}>`, // Ex: "DenyAnimeHub" <seu-email@gmail.com>
        to: options.to,
        bcc: options.bcc, // Nodemailer aceita um array de e-mails para cópia oculta
        subject: options.subject,
        html: options.html, // O corpo do e-mail que vem do template EJS
        text: 'Seu cliente de e-mail não suporta HTML. Por favor, visualize esta mensagem em um cliente compatível.' // Versão em texto puro como fallback
    };

    // 4. Enviar o email e logar o resultado
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ SUCESSO NO ENVIO DE E-MAIL: Mensagem enviada com ID: %s", info.messageId);
    } catch (error) {
        console.error("❌ FALHA AO ENVIAR E-MAIL:", error);
        // Lançar o erro novamente permite que a função que chamou o sendEmail (notificationService) saiba que algo deu errado.
        throw error;
    }
};

module.exports = sendEmail;