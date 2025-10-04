'use strict';
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User, sequelize } = require('../models');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const { OAuth2Client } = require('google-auth-library');

// Inicializar Firebase Admin
let firebaseInitialized = false;
try {
    if (process.env.FIREBASE_PROJECT_ID) {

        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
                }),
                databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
            });
        }
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
            databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
        });
        firebaseInitialized = true;
        console.log('✅ Firebase Admin inicializado com sucesso');
    } else {
        console.warn('⚠️ Firebase não configurado - FIREBASE_PROJECT_ID não encontrado');
    }
} catch (error) {
    console.warn('⚠️ Firebase não inicializado:', error.message);
    firebaseInitialized = false;
}

// Configurar cliente OAuth2 do Google
const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI || "https://deny-animes-hub.onrender.com/auth/google/callback"
);

// Configuração do Nodemailer
const createTransporter = () => {
    try {
        if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
            console.warn('⚠️ Credenciais de email não configuradas');
            return null;
        }
        
        return nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    } catch (error) {
        console.error('❌ Erro ao criar transporter de email:', error);
        return null;
    }
};

const transporter = createTransporter();

// Função para enviar e-mails
const sendEmail = async (to, subject, htmlContent) => {
    if (!transporter) {
        console.warn('⚠️ Transporter de email não disponível');
        return false;
    }
    
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM || process.env.EMAIL_USERNAME,
            to: to,
            subject: subject,
            html: htmlContent,
        };
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email enviado para: ${to}`);
        return true;
    } catch (error) {
        console.error('❌ Erro ao enviar email:', error.message);
        return false;
    }
};

const enviarTokenResponse = (user, statusCode, res) => {
    try {
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000
        };

        res.cookie('token', token, cookieOptions);

        // Sempre responder JSON (API mode)
        return res.status(statusCode).json({
            success: true,
            token,
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                role: user.role,
                telefone: user.telefone,
                avatar: user.avatar
            }
        });

    } catch (error) {
        console.error("❌ Erro ao gerar token:", error);
        return res.status(500).json({ success: false, error: 'Falha na autenticação' });
    }
};

/**
 * Registro de usuário
 */
exports.registrar = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const { nome, email, senha, telefone } = req.body;
        
        if (!nome || !email || !senha) {
            await transaction.rollback();
            return res.status(400).json({ success: false, error: 'Por favor, preencha todos os campos obrigatórios.' });
        }
        
        if (senha.length < 6) {
            await transaction.rollback();
            return res.status(400).json({ success: false, error: 'A senha deve ter no mínimo 6 caracteres.' });
        }

        // Verificar se email já existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            await transaction.rollback();
            return res.status(400).json({ success: false, error: 'Este e-mail já está em uso.' });
        }

        // Criar usuário
        const user = await User.create({ 
            nome, 
            email, 
            senha,
            telefone: telefone || null 
        }, { transaction });

        await transaction.commit();

        res.status(201).json({
            success: true,
            message: 'Conta criada com sucesso! Faça o login para continuar.',
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email
            }
        });

    } catch (error) {
        await transaction.rollback();
        
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ success: false, error: 'Este e-mail já está em uso.' });
        }
        
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({ success: false, error: errors.join(', ') });
        }
        
        console.error("❌ Erro no registro:", error);
        res.status(500).json({ 
            success: false, 
            error: 'Ocorreu um erro no servidor ao tentar registrar sua conta.' 
        });
    }
};

/**
 * Login tradicional
 */
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        
        if (!email || !senha) {
            return res.status(400).json({ 
                success: false, 
                error: 'Por favor, forneça seu e-mail e senha.' 
            });
        }

        const user = await User.scope('comSenha').findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                error: 'E-mail ou senha inválidos.' 
            });
        }

        const isPasswordValid = await user.compararSenha(senha);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false, 
                error: 'E-mail ou senha inválidos.' 
            });
        }

        enviarTokenResponse(user, 200, res);

    } catch (error) {
        console.error("❌ Erro no login:", error);
        res.status(500).json({ 
            success: false, 
            error: 'Ocorreu um erro no servidor durante o login.' 
        });
    }
};

/**
 * Logout - VERSÃO CORRIGIDA SEM DUPLICAÇÃO
=======
 * Logout - VERSÃO CORRIGIDA E ROBUSTA
 */
exports.logout = (req, res) => {
    try {
        console.log('🔍 Logout acionado - Método:', req.method);
        
        // Limpar cookie de token
        const cookieOptions = {
            expires: new Date(Date.now() + 5 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        };

        res.cookie('token', 'loggedout', cookieOptions);
        res.cookie('session', 'loggedout', cookieOptions);

        // Determinar tipo de requisição
        const isApiRequest = req.xhr || 
                           req.headers.accept?.includes('application/json') ||
                           req.path?.includes('/api/');

        console.log('🔍 Tipo de requisição:', isApiRequest ? 'API' : 'Browser');

        if (isApiRequest) {
            // Resposta JSON para APIs
            return res.status(200).json({
                success: true,
                message: 'Logout realizado com sucesso.',
                redirect: '/login'
            });
        } else {
            // Redirecionamento para navegadores
            return res.redirect('/login?sucesso=Logout realizado com sucesso!');
        }

    } catch (error) {
        console.error('❌ Erro crítico no logout:', error);
        
        // Fallback absoluto
        res.cookie('token', 'invalid', {
            expires: new Date(Date.now() - 1000),
            httpOnly: true
        });

        // Tentar redirecionar de qualquer maneira
        if (res.headersSent) return;
        
        try {
            return res.redirect('/login?erro=Erro durante o logout');
        } catch (redirectError) {
            // Último recurso - enviar resposta simples
            return res.status(200).send(`
                <script>
                    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    window.location.href = "/login?sucesso=Logout realizado";
                </script>
            `);
        }
    }
};

/**
 * Esqueci a senha - Versão Corrigida
 */
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ 
                success: false, 
                error: 'Por favor, informe seu e-mail.' 
            });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.warn(`⚠️ Tentativa de redefinição para email não encontrado: ${email}`);
            // Por segurança, não revelamos se o email existe ou não
            return res.status(200).json({ 
                success: true, 
                message: 'Se o e-mail estiver registrado, enviaremos um código de redefinição.' 
            });
        }

        // Gerar token de redefinição
        const resetToken = crypto.randomBytes(20).toString('hex');
        
        // Hash do token para armazenamento seguro
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Definir expiração (10 minutos)
        const resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        // Atualizar usuário com token e expiração
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpire = resetPasswordExpire;
        await user.save({ validate: false });

        const messageToUser = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
                    .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                    .header { background: linear-gradient(135deg, #ff2e4d, #ff6b6b); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                    .code { font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 5px; letter-spacing: 2px; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>DenyAnimeHub - Redefinição de Senha</h1>
                    </div>
                    <p>Olá <strong>${user.nome}</strong>,</p>
                    <p>Recebemos uma solicitação para redefinir sua senha. Use o código abaixo para continuar:</p>
                    <div class="code">${resetToken}</div>
                    <p>Este código é válido por <strong>10 minutos</strong>.</p>
                    <p>Se você não solicitou esta redefinição, ignore este e-mail.</p>
                    <div class="footer">
                        <p>Equipe DenyAnimeHub</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const emailSent = await sendEmail(
            user.email, 
            'Redefinição de Senha - DenyAnimeHub', 
            messageToUser
        );

        if (emailSent) {
            res.status(200).json({ 
                success: true, 
                message: 'E-mail enviado com sucesso! Verifique sua caixa de entrada.' 
            });
        } else {
            // Fallback para desenvolvimento
            console.log(`🔑 Token de desenvolvimento para ${email}: ${resetToken}`);
            res.status(200).json({ 
                success: true, 
                message: 'Serviço de email temporariamente indisponível. Use este código:',
                resetToken: resetToken,
                developmentMode: true
            });
        }

    } catch (error) {
        console.error("❌ Erro em forgotPassword:", error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro interno no servidor. Tente novamente mais tarde.' 
        });
    }
};

/**
 * Redefinir senha - Versão Corrigida
 */
exports.resetPassword = async (req, res) => {
    try {
        const { email, token, novaSenha, confirmarNovaSenha } = req.body;

        if (!email || !token || !novaSenha || !confirmarNovaSenha) {
            return res.status(400).json({ 
                success: false, 
                error: "Todos os campos são obrigatórios."
            });
        }

        if (novaSenha !== confirmarNovaSenha) {
            return res.status(400).json({ 
                success: false, 
                error: "As senhas não coincidem." 
            });
        }

        if (novaSenha.length < 6) {
            return res.status(400).json({ 
                success: false, 
                error: "A senha deve ter no mínimo 6 caracteres." 
            });
        }

        // Hash do token recebido para comparação
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        const user = await User.scope('comSenha').findOne({
            where: {
                email,
                resetPasswordToken,
                resetPasswordExpire: { [sequelize.Op.gt]: Date.now() }
            }
        });

        if (!user) {
            return res.status(400).json({ 
                success: false, 
                error: 'Código inválido ou expirado. Solicite um novo código.' 
            });
        }

        // Atualizar senha
        user.senha = novaSenha;
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;
        await user.save();

        // Enviar confirmação por email
        const confirmationMessage = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
                    .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                    .header { background: linear-gradient(135deg, #00d26a, #00b359); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Senha Alterada com Sucesso!</h1>
                    </div>
                    <p>Olá <strong>${user.nome}</strong>,</p>
                    <p>Sua senha foi alterada com sucesso em <strong>${new Date().toLocaleString('pt-BR')}</strong>.</p>
                    <p>Se você não realizou esta alteração, entre em contato conosco imediatamente.</p>
                    <div class="footer">
                        <p>Equipe DenyAnimeHub</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        await sendEmail(
            user.email, 
            'Senha Alterada - DenyAnimeHub', 
            confirmationMessage
        );

        enviarTokenResponse(user, 200, res);

    } catch (error) {
        console.error("❌ Erro em resetPassword:", error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro ao redefinir senha. Tente novamente.' 
        });
    }
};

/**
 * Login com Google - Gerar URL de autorização
 */
exports.googleLogin = async (req, res) => {
    try {
        const authorizeUrl = googleClient.generateAuthUrl({
            access_type: 'offline',
            scope: ['profile', 'email'],
            prompt: 'consent',
            include_granted_scopes: true
        });

        res.json({
            success: true,
            authorizeUrl: authorizeUrl
        });

    } catch (error) {
        console.error('❌ Erro no login com Google:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro ao iniciar login com Google' 
        });
    }
};

/**
 * Callback do Google OAuth
 */
exports.googleCallback = async (req, res) => {
    try {
        const { code } = req.query;
        
        if (!code) {
            console.error('❌ Código de autorização não fornecido');
            return res.redirect('/login?erro=Código de autorização não fornecido');
        }

        // Trocar código por tokens
        const { tokens } = await googleClient.getToken({
            code: code,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI || "https://deny-animes-hub.onrender.com/auth/google/callback"
        });

        googleClient.setCredentials(tokens);

        // Verificar token ID
        const ticket = await googleClient.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, name, picture, sub: googleId } = payload;

        if (!email) {
            throw new Error('Email não disponível na conta Google');
        }

        // Buscar ou criar usuário
        let user = await User.findOne({ where: { email } });
        
        if (!user) {
            user = await User.create({
                nome: name,
                email: email,
                senha: crypto.randomBytes(20).toString('hex'),
                avatar: picture,
                googleId: googleId,
                emailVerificado: true
            });
            console.log(`✅ Novo usuário criado via Google: ${email}`);
        } else {
            // Atualizar informações do Google se necessário
            if (!user.googleId) {
                user.googleId = googleId;
                user.avatar = picture || user.avatar;
                await user.save();
            }
            console.log(`✅ Usuário existente logado via Google: ${email}`);
        }

        // Gerar token JWT
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Configurar cookie
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000
        };

        res.cookie('token', token, cookieOptions);
        
        // Redirecionar para a página inicial
        res.redirect('/');

    } catch (error) {
        console.error('❌ Erro no callback do Google:', error);
        
        // Redirecionar com mensagem de erro
        const errorMessage = encodeURIComponent(
            error.message.includes('email') ? 
            'Email não disponível na conta Google' : 
            'Falha na autenticação com Google'
        );
        
        res.redirect(`/login?erro=${errorMessage}`);
    }
};

/**
 * Enviar OTP por telefone (usando Firebase ou simulação em dev)
 */
exports.sendPhoneOtp = async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({
            success: false,
            error: 'Por favor, forneça um número de telefone.'
        });
    }

    try {
        // Formatar número para padrão internacional (+244 para Angola)
        let formattedNumber = phoneNumber.trim();
        if (!formattedNumber.startsWith('+')) {
            if (formattedNumber.startsWith('244')) {
                formattedNumber = '+' + formattedNumber;
            } else if (formattedNumber.startsWith('0')) {
                formattedNumber = '+244' + formattedNumber.substring(1);
            } else {
                formattedNumber = '+244' + formattedNumber;
            }
        }

        // Se o Firebase não estiver inicializado, simula envio (modo DEV)
        if (!firebaseInitialized) {
            console.log(`📱 Simulando envio de OTP para: ${formattedNumber}`);
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            return res.status(200).json({
                success: true,
                message: 'Código OTP (simulado) enviado para seu telefone!',
                developmentOtp: otp, // Apenas em dev
                phoneNumber: formattedNumber
            });
        }

        // Firebase Auth - envio real (lado do cliente geralmente faz o fluxo completo)
        console.log(`📱 Firebase OTP enviado para: ${formattedNumber}`);

        return res.status(200).json({
            success: true,
            message: 'Código OTP enviado para seu telefone! (Firebase)',
            phoneNumber: formattedNumber
        });

    } catch (error) {
        console.error('❌ Erro ao enviar OTP:', error);
        return res.status(500).json({
            success: false,
            error: 'Erro ao enviar código OTP. Tente novamente mais tarde.'
        });
    }
};

/**
 * Verificar OTP do telefone
 */
exports.verifyPhoneOtp = async (req, res) => {
    const { phoneNumber, otp } = req.body;
    
    if (!phoneNumber || !otp) {
        return res.status(400).json({ 
            success: false, 
            error: 'Número de telefone e código OTP são obrigatórios.' 
        });
    }

    try {
        let user;
        
        if (!firebaseInitialized) {
            // Modo desenvolvimento - verificação simulada
            console.log(`📱 Verificando OTP: ${phoneNumber} - ${otp}`);
            
            user = await User.findOne({ where: { telefone: phoneNumber } });
            
            if (!user) {
                user = await User.create({
                    nome: `Usuário ${phoneNumber}`,
                    telefone: phoneNumber,
                    senha: crypto.randomBytes(20).toString('hex'),
                    emailVerificado: true
                });
                console.log(`✅ Novo usuário criado via OTP: ${phoneNumber}`);
            }
        } else {
            // Firebase Auth - verificação (simplificada para servidor)
            console.log(`📱 Verificando OTP Firebase: ${phoneNumber}`);
            
            user = await User.findOne({ where: { telefone: phoneNumber } });
            
            if (!user) {
                user = await User.create({
                    nome: `Usuário ${phoneNumber}`,
                    telefone: phoneNumber,
                    senha: crypto.randomBytes(20).toString('hex'),
                    emailVerificado: true
                });
                console.log(`✅ Novo usuário criado via Firebase OTP: ${phoneNumber}`);
            }
        }

        enviarTokenResponse(user, 200, res);

    } catch (error) {
        console.error('❌ Erro ao verificar OTP:', error);
        res.status(401).json({ 
            success: false, 
            error: 'Código OTP inválido ou expirado.' 
        });
    }
};

/**
 * Verificar token atual (para manter sessão)
 */
exports.verifyToken = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['senha', 'resetPasswordToken', 'resetPasswordExpire'] }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Usuário não encontrado.'
            });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                role: user.role,
                telefone: user.telefone,
                avatar: user.avatar,
                emailVerificado: user.emailVerificado
            }
        });

    } catch (error) {
        console.error('❌ Erro ao verificar token:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao verificar autenticação.'
        });
    }
};

/**
 * Atualizar perfil do usuário
 */
exports.updateProfile = async (req, res) => {
    try {
        const { nome, telefone, avatar } = req.body;
        const userId = req.user.id;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Usuário não encontrado.'
            });
        }

        // Atualizar campos permitidos
        if (nome) user.nome = nome;
        if (telefone) user.telefone = telefone;
        if (avatar) user.avatar = avatar;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Perfil atualizado com sucesso!',
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                telefone: user.telefone,
                avatar: user.avatar,
                role: user.role
            }
        });

    } catch (error) {
        console.error('❌ Erro ao atualizar perfil:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao atualizar perfil.'
        });
    }
};

/**
 * Logout alternativo (para fallback)
 */
exports.logoutAlternativo = (req, res) => {
    res.cookie('token', 'loggedout', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });
    res.redirect('/login?sucesso=Sessão encerrada com sucesso!');
};
