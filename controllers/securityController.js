'use strict';

// --- IMPORTAÇÕES ---
// Apenas as dependências necessárias para este ficheiro.
const sendEmail = require('../utils/sendEmail');

/**
 * @fileoverview Controller para gerir e registar eventos de segurança.
 * @module controllers/securityController
 */

const securityController = {};

/**
 * @desc    Regista um evento de segurança detectado no frontend e notifica o administrador.
 * @route   POST /api/security/log-event
 * @access  Público (a rota é protegida opcionalmente)
 */
securityController.logSecurityEvent = async (req, res) => {
    try {
        // --- 1. CAPTURA E VALIDAÇÃO DOS DADOS ---

        // Dados enviados pelo script do frontend.
        const { eventType, userAgent, pageUrl, details } = req.body;

        // Dados obtidos de forma segura no backend.
        const user = req.user; // O middleware 'protegerOpcional' já populou 'req.user' se o utilizador estiver logado.
        
        // PONTO CRÍTICO DE SEGURANÇA: Nunca confie no IP enviado pelo cliente no corpo da requisição.
        // Sempre use o IP que o seu servidor (Render) detecta.
        const clientIp = req.ip || req.connection.remoteAddress;

        // Log interno no servidor para registo.
        console.log(`[ALERTA DE SEGURANÇA] Evento: '${eventType}' | IP: ${clientIp} | Utilizador: ${user ? user.id : 'Visitante'}`);

        // --- 2. PREPARAÇÃO DA NOTIFICAÇÃO ---

        // Monta um e-mail HTML detalhado para o administrador.
        const messageToAdmin = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h1 style="color: #d9534f;">🚨 ALERTA DE SEGURANÇA - DenyAnimeHub 🚨</h1>
                <p>Uma atividade que requer atenção foi detectada no seu site.</p>
                
                <h3 style="border-bottom: 2px solid #eee; padding-bottom: 5px;">Detalhes do Evento</h3>
                <ul style="list-style: none; padding-left: 0;">
                    <li><strong>Tipo de Evento:</strong> ${eventType || 'Não especificado'}</li>
                    <li><strong>Página Onde Ocorreu:</strong> ${pageUrl || 'Não especificada'}</li>
                    <li><strong>Endereço IP do Visitante:</strong> ${clientIp}</li>
                    <li><strong>Detalhes Adicionais:</strong> <pre>${JSON.stringify(details, null, 2) || 'Nenhum'}</pre></li>
                </ul>

                <h3 style="border-bottom: 2px solid #eee; padding-bottom: 5px;">Informações do Utilizador (se autenticado)</h3>
                <ul style="list-style: none; padding-left: 0;">
                    <li><strong>ID do Utilizador:</strong> ${user ? user.id : 'Visitante não autenticado'}</li>
                    <li><strong>Nome:</strong> ${user ? user.nome : 'Visitante não autenticado'}</li>
                    <li><strong>Email:</strong> ${user ? user.email : 'Visitante não autenticado'}</li>
                </ul>

                <h3 style="border-bottom: 2px solid #eee; padding-bottom: 5px;">User-Agent do Navegador</h3>
                <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">${userAgent || 'Não especificado'}</pre>
                
                <p style="margin-top: 20px; font-size: 0.9em; color: #777;">Recomenda-se a verificação da atividade associada a este endereço IP.</p>
            </div>
        `;

        // --- 3. ENVIO DA NOTIFICAÇÃO E RESPOSTA ---

        // Envia o e-mail de alerta para o endereço do administrador.
        await sendEmail({
            email: process.env.ADMIN_EMAIL || 'denyneves14@gmail.com',
            subject: `[ALERTA URGENTE] Atividade Detectada: ${eventType}`,
            message: messageToAdmin
        });

        // Responde ao frontend com sucesso para confirmar que o evento foi registado.
        res.status(200).json({ success: true, message: 'Evento registado com sucesso.' });

    } catch (error) {
        // Em caso de falha (ex: falha no envio do e-mail), regista o erro no servidor.
        console.error("ERRO CRÍTICO AO REGISTAR EVENTO DE SEGURANÇA:", error);
        
        // Responde com um erro genérico para não expor detalhes da infraestrutura.
        res.status(500).json({ success: false, error: 'Ocorreu uma falha interna ao processar o evento.' });
    }
};

module.exports = securityController;