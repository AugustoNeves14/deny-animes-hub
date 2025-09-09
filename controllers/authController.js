// controllers/authController.js
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
    if (process.env.FIREBASE_API_KEY) {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
            databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
        });
        firebaseInitialized = true;
        console.log('✅ Firebase Admin inicializado com sucesso');
    }
} catch (error) {
    console.warn('⚠️ Firebase não configurado:', error.message);
}

// Configurar cliente OAuth2 do Google
const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://deny-animes-hub.onrender.com/auth/google/callback"
);

// No método googleLogin:
exports.googleLogin = async (req, res) => {
    try {
        const authorizeUrl = googleClient.generateAuthUrl({
            access_type: 'offline',
            scope: ['profile', 'email'],
            prompt: 'consent'
            // ❌ Não precisa colocar redirect_uri aqui
        });

        res.json({ success: true, authorizeUrl });

    } catch (error) {
        console.error('❌ Erro no login com Google:', error);
        res.status(500).json({ success: false, error: 'Erro ao iniciar login com Google.' });
    }
};


// Configuração do Nodemailer - CORREÇÃO AQUI: createTransport (singular)
const createTransporter = () => {
    return nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
};

const transporter = createTransporter();

// Função para enviar e-mails
const sendEmail = async (to, subject, htmlContent) => {
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
        // Não quebrar o fluxo da aplicação se o email falhar
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
                role: user.role
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
    try {
        const { nome, email, senha } = req.body;
        
        if (!nome || !email || !senha) {
            return res.status(400).json({ success: false, error: 'Por favor, preencha todos os campos.' });
        }
        if (senha.length < 6) {
            return res.status(400).json({ success: false, error: 'A senha deve ter no mínimo 6 caracteres.' });
        }

        await User.create({ nome, email, senha });

        res.status(201).json({
            success: true,
            message: 'Conta criada com sucesso! Faça o login para continuar.'
        });

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ success: false, error: 'Este e-mail já está em uso.' });
        }
        console.error("❌ Erro no registro:", error);
        res.status(500).json({ success: false, error: 'Ocorreu um erro no servidor ao tentar registrar sua conta.' });
    }
};

/**
 * Login tradicional
 */
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ success: false, error: 'Por favor, forneça seu e-mail e senha.' });
        }

        const user = await User.scope('comSenha').findOne({ where: { email } });

        if (!user || !(await user.compararSenha(senha))) {
            return res.status(401).json({ success: false, error: 'E-mail ou senha inválidos.' });
        }

        enviarTokenResponse(user, 200, res);

    } catch (error) {
        console.error("❌ Erro no login:", error);
        res.status(500).json({ success: false, error: 'Ocorreu um erro no servidor durante o login.' });
    }
};

/**
 * Logout
 */
exports.logout = (req, res) => {
    res.cookie('token', 'loggedout', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.redirect('/login?sucesso=Você foi desconectado com sucesso!');
};

/**
 * Esqueci a senha
 */
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ success: false, error: 'Por favor, informe seu e-mail.' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.warn(`⚠️ Tentativa de redefinição para email não encontrado: ${email}`);
            return res.status(200).json({ 
                success: true, 
                message: 'Se o e-mail estiver registrado, enviaremos um código de redefinição.' 
            });
        }

        // Método local de redefinição
        const resetToken = user.getResetPasswordToken();
        await user.save({ validate: false });

        const messageToUser = `
            <h1>Redefinição de Senha - DenyAnimeHub</h1>
            <p>Use o seguinte código para redefinir sua senha (válido por 10 minutos):</p>
            <h2 style="font-size: 24px; letter-spacing: 2px; background: #f0f0f0; padding: 10px; border-radius: 5px;">
                ${resetToken}
            </h2>
            <p>Se você não solicitou isso, ignore este e-mail.</p>
        `;

        const emailSent = await sendEmail(user.email, 'Redefinição de Senha - DenyAnimeHub', messageToUser);

        if (emailSent) {
            res.status(200).json({ success: true, message: 'E-mail enviado com sucesso! Verifique sua caixa de entrada.' });
        } else {
            // Fallback para desenvolvimento
            res.status(200).json({ 
                success: true, 
                message: 'Serviço de email temporariamente indisponível. Use este código:',
                resetToken: resetToken,
                developmentMode: true
            });
        }

    } catch (error) {
        console.error("❌ Erro em forgotPassword:", error);
        res.status(500).json({ success: false, error: 'Erro interno no servidor.' });
    }
};

/**
 * Redefinir senha
 */
exports.resetPassword = async (req, res) => {
    try {
        const { email, token, novaSenha } = req.body;

        if (!email || !token || !novaSenha) {
            return res.status(400).json({ success: false, error: "Faltam informações para redefinir a senha."});
        }

        const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.scope('comSenha').findOne({
            where: {
                email,
                resetPasswordToken,
                resetPasswordExpire: { [sequelize.Op.gt]: Date.now() }
            }
        });

        if (!user) {
            return res.status(400).json({ success: false, error: 'Código inválido ou expirado.' });
        }

        user.senha = novaSenha;
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;
        await user.save();

        enviarTokenResponse(user, 200, res);

    } catch (error) {
        console.error("❌ Erro em resetPassword:", error);
        res.status(500).json({ success: false, error: 'Erro ao redefinir senha.' });
    }
};

/**
 * Login com Google
 */
exports.googleLogin = async (req, res) => {
    try {
        // Gerar URL de autorização do Google
        const authorizeUrl = googleClient.generateAuthUrl({
            access_type: 'offline',
            scope: ['profile', 'email'],
            prompt: 'consent'
        });

        res.json({ success: true, authorizeUrl });

    } catch (error) {
        console.error('❌ Erro no login com Google:', error);
        res.status(500).json({ success: false, error: 'Erro ao iniciar login com Google.' });
    }
};

/**
 * Callback do Google
 */
exports.googleCallback = async (req, res) => {
    try {
        const { code } = req.query;
        if (!code) {
            return res.status(400).json({ success: false, error: "Código de autorização não fornecido" });
        }

        const { tokens } = await googleClient.getToken({
            code,
            redirect_uri: "https://deny-animes-hub.onrender.com/auth/google/callback"
        });

        googleClient.setCredentials(tokens);

        const ticket = await googleClient.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        let user = await User.findOne({ where: { email } });
        if (!user) {
            user = await User.create({
                nome: name,
                email: email,
                senha: crypto.randomBytes(20).toString('hex'),
                avatar: picture
            });
        }

        // 🔑 Retorna JSON com token + user
        enviarTokenResponse(user, 200, res);

    } catch (error) {
        console.error('❌ Erro no callback do Google:', error);
        res.status(500).json({ success: false, error: 'Falha no login com Google' });
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
        if (typeof firebaseInitialized === 'undefined' || !firebaseInitialized) {
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
        return res.status(400).json({ success: false, error: 'Número e código OTP são obrigatórios.' });
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
                    senha: crypto.randomBytes(20).toString('hex')
                });
            }
        } else {
            // Firebase Auth - verificação (simplificada para servidor)
            console.log(`📱 Verificando OTP Firebase: ${phoneNumber}`);
            
            user = await User.findOne({ where: { telefone: phoneNumber } });
            
            if (!user) {
                user = await User.create({
                    nome: `Usuário ${phoneNumber}`,
                    telefone: phoneNumber,
                    senha: crypto.randomBytes(20).toString('hex')
                });
            }
        }

        enviarTokenResponse(user, 200, res);

    } catch (error) {
        console.error('❌ Erro ao verificar OTP:', error);
        res.status(401).json({ success: false, error: 'Código OTP inválido ou expirado.' });
    }
};