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
        throw new Error("Credenciais de e-mail não configuradas");
    }

    // 2. Criar um "transportador" - o serviço que vai enviar o email
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // 3. Definir as opções do email
    const mailOptions = {
        from: `"${process.env.EMAIL_FROM}" <${process.env.EMAIL_USERNAME}>`,
        to: options.to,
        bcc: options.bcc,
        subject: options.subject,
        html: options.html,
        text: options.text || 'Seu cliente de e-mail não suporta HTML. Por favor, visualize esta mensagem em um cliente compatível.'
    };

    // 4. Enviar o email e logar o resultado
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ SUCESSO NO ENVIO DE E-MAIL: Mensagem enviada com ID: %s", info.messageId);
        console.log("Destinatários aceitos:", info.accepted);
        if (info.rejected && info.rejected.length > 0) {
            console.log("Destinatários rejeitados:", info.rejected);
        }
        return info;
    } catch (error) {
        console.error("❌ FALHA AO ENVIAR E-MAIL:", error);
        throw error;
    }
};

module.exports = sendEmail;