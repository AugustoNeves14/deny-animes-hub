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
        // Em um ambiente real, você poderia lançar um erro ou retornar para evitar que a aplicação continue com um estado inválido.
        return; 
    }

    // 2. Criar um "transportador" - o serviço que vai enviar o email
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail', // Usa 'gmail' como padrão se não definido
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD // IMPORTANTE: Esta deve ser a Senha de App de 16 caracteres do Google
        }
    });

    // 3. Definir as opções do email, garantindo que o remetente seja formatado corretamente
    const mailOptions = {
        from: `"${process.env.EMAIL_FROM || 'DenyAnimeHub'}" <${process.env.EMAIL_USERNAME}>`, // Ex: "DenyAnimeHub" <denyneves14@gmail.com>
        to: options.to,
        bcc: options.bcc, // O Nodemailer aceita um array de e-mails aqui
        subject: options.subject,
        html: options.html, // O corpo do e-mail que vem do template EJS
        text: 'Seu cliente de e-mail não suporta HTML. Por favor, visualize esta mensagem em um cliente compatível.' // Versão em texto puro como fallback
    };

    // 4. Enviar o email e logar o resultado
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("SUCESSO NO ENVIO DE E-MAIL: Mensagem enviada: %s", info.messageId);
        console.log("Destinatários aceitos:", info.accepted);
    } catch (error) {
        console.error("!!! FALHA AO EXECUTAR transporter.sendMail:", error);
        // Lançar o erro novamente permite que a função que chamou o sendEmail (notificationService) saiba que algo deu errado.
        throw error;
    }
};

module.exports = sendEmail;