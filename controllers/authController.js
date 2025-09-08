// controllers/authController.js
'use strict';
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User, sequelize } = require('../models');
//const { StackClient } = require('@stackso/js-client');
const nodemailer = require('nodemailer');

// Configuração do Stack Client
//const stackClient = new StackClient({
    //projectId: process.env.STACK_PROJECT_ID,
    //publishableClientKey: process.env.STACK_PUBLISHABLE_CLIENT_KEY,
    //secretServerKey: process.env.STACK_SECRET_SERVER_KEY
//});

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE_PROVIDER,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Função para enviar e-mails
const sendEmail = async (to, subject, htmlContent) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: htmlContent,
        };
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
        return true;
    } catch (error) {
        console.error('!!! FALHA AO EXECUTAR transporter.sendMail:', error);
        throw new Error('ERRO AO ENVIAR EMAIL: ' + error.message);
    }
};

/**
 * @desc    Gera um token JWT, define-o num cookie seguro e envia a resposta ao utilizador.
 * @param   {object} user - O objeto do utilizador autenticado.
 * @param   {number} statusCode - O código de status HTTP da resposta.
 * @param   {object} res - O objeto de resposta do Express.
 */
const enviarTokenResponse = (user, statusCode, res) => {
    try {
        // Gera o token JWT com o ID e o papel (role) do utilizador.
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '30d' // Token expira em 30 dias.
        });

        // Define as opções do cookie. Esta é a parte MAIS IMPORTANTE para a compatibilidade.
        const cookieOptions = {
            httpOnly: true, // Impede que o cookie seja acedido por JavaScript no cliente (previne XSS).
            secure: process.env.NODE_ENV === 'production', // ESSENCIAL: O cookie só será enviado em HTTPS em produção. O Safari exige isto.
            sameSite: 'strict', // A política mais segura. Previne ataques CSRF e é exigida por navegadores modernos.
            maxAge: 30 * 24 * 60 * 60 * 1000 // O cookie expira em 30 dias, igual ao token.
        };

        res.cookie('token', token, cookieOptions);

        // Remove a senha do objeto do utilizador antes de o enviar na resposta.
        const userSemSenha = user.get({ plain: true });
        delete userSemSenha.senha;

        res.status(statusCode).json({
            success: true,
            user: userSemSenha,
        });

    } catch (error) {
        console.error("ERRO CRÍTICO AO GERAR TOKEN:", error);
        res.status(500).json({ success: false, error: "Erro interno ao processar a autenticação." });
    }
};

/**
 * @route   POST /auth/registrar
 * @desc    Regista um novo utilizador.
 * @access  Público
 */
exports.registrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        // Validação robusta dos campos de entrada.
        if (!nome || !email || !senha) {
            return res.status(400).json({ success: false, error: 'Por favor, preencha todos os campos.' });
        }
        if (senha.length < 6) {
            return res.status(400).json({ success: false, error: 'A senha deve ter no mínimo 6 caracteres.' });
        }

        // Cria usuário no Stack (se necessário)
        try {
            await stackClient.users.create({
                email,
                password: senha,
                displayName: nome,
            });
        } catch (stackError) {
            console.log("Usuário não criado no Stack (pode já existir):", stackError.message);
        }

        // Cria usuário no banco de dados local
        await User.create({ nome, email, senha });

        res.status(201).json({
            success: true,
            message: 'Conta criada com sucesso! Faça o login para continuar.'
        });

    } catch (error) {
        // Trata o erro de e-mail duplicado de forma específica.
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ success: false, error: 'Este e-mail já está em uso.' });
        }
        console.error("ERRO NO REGISTO:", error);
        res.status(500).json({ success: false, error: 'Ocorreu um erro no servidor ao tentar registar a sua conta.' });
    }
};

/**
 * @route   POST /auth/login
 * @desc    Autentica um utilizador e retorna um token.
 * @access  Público
 */
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ success: false, error: 'Por favor, forneça o seu e-mail e senha.' });
        }

        // Procura o utilizador e inclui a senha para comparação.
        const user = await User.scope('comSenha').findOne({ where: { email } });

        // Verifica se o utilizador existe E se a senha está correta. Mensagem de erro genérica por segurança.
        if (!user || !(await user.compararSenha(senha))) {
            return res.status(401).json({ success: false, error: 'E-mail ou senha inválidos.' });
        }

        // Se tudo estiver correto, envia o token e os dados do utilizador.
        enviarTokenResponse(user, 200, res);

    } catch (error) {
        console.error("ERRO NO LOGIN:", error);
        res.status(500).json({ success: false, error: 'Ocorreu um erro no servidor durante o login.' });
    }
};

/**
 * @route   GET /auth/logout
 * @desc    Faz o logout do utilizador limpando o cookie.
 * @access  Privado
 */
exports.logout = (req, res) => {
    // Para limpar o cookie, enviamos um com o mesmo nome e opções, mas com uma data de expiração no passado.
    res.cookie('token', 'loggedout', {
        expires: new Date(Date.now() + 5 * 1000), // Expira em 5 segundos.
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    // Redireciona o utilizador para a página de login com uma mensagem de sucesso.
    res.redirect('/login?sucesso=Você foi desconectado com sucesso!');
};

/**
 * @route   POST /auth/forgotpassword
 * @desc    Gera um token de redefinição de senha e envia-o por e-mail.
 * @access  Público
 */
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ success: false, error: 'Por favor, informe seu e-mail.' });
        }

        // Verifica se o usuário existe no banco local
        const user = await User.findOne({ where: { email } });

        if (!user) {
            // É uma boa prática não informar se o email existe ou não por segurança
            console.warn(`Tentativa de redefinição de senha para email não encontrado: ${email}`);
            return res.status(200).json({ success: true, message: 'Se o e-mail estiver registrado, enviaremos um código de redefinição.' });
        }

        // Tenta usar o Stack para redefinição de senha
        try {
            // 1. Gerar um token de redefinição de senha (Stack)
            const { resetToken } = await stackClient.passwords.createResetToken({ userId: user.id });

            if (!resetToken) {
                throw new Error('Falha ao gerar o token de redefinição.');
            }

            // 2. Enviar o e-mail com o token
            const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken.token}&email=${encodeURIComponent(email)}`;
            const emailContent = `
                <p>Você solicitou a redefinição de senha. Use o código abaixo ou clique no link:</p>
                <p><strong>Código: ${resetToken.token}</strong></p>
                <p><a href="${resetLink}">Redefinir Senha</a></p>
                <p>Se você não solicitou isso, ignore este e-mail.</p>
            `;

            await sendEmail(email, 'Redefinição de Senha - DenyAnimeHub', emailContent);

            return res.status(200).json({ success: true, message: 'Código de redefinição enviado para o seu e-mail!' });
            
        } catch (stackError) {
            console.log("Stack não disponível, usando método local:", stackError.message);
            
            // Método local de fallback
            const resetToken = user.getResetPasswordToken();
            await user.save({ validate: false });

            const messageToUser = `<h1>Você solicitou uma redefinição de senha</h1><p>Use o seguinte código para redefinir a sua senha. Ele é válido por 10 minutos:</p><h2 style="font-size: 24px; letter-spacing: 2px;">${resetToken}</h2><p>Se você não fez esta solicitação, pode ignorar este e-mail com segurança.</p>`;

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Redefinição de Senha - DenyAnimeHub',
                    message: messageToUser
                });

                res.status(200).json({ success: true, message: 'E-mail enviado com sucesso! Verifique a sua caixa de entrada e a pasta de spam.' });

            } catch (error) {
                console.error("ERRO AO ENVIAR EMAIL DE REDEFINIÇÃO:", error);
                // Limpa os tokens se o envio de e-mail falhar para que o utilizador possa tentar novamente.
                user.resetPasswordToken = null;
                user.resetPasswordExpire = null;
                await user.save({ validate: false });
                return res.status(500).json({ success: false, error: 'Não foi possível enviar o e-mail de redefinição. Tente novamente mais tarde.' });
            }
        }

    } catch (error) {
        console.error("ERRO EM FORGOTPASSWORD:", error);
        res.status(500).json({ success: false, error: 'Erro interno no servidor.' });
    }
};

/**
 * @route   PUT /auth/resetpassword
 * @desc    Redefine a senha do utilizador usando o token.
 * @access  Público
 */
exports.resetPassword = async (req, res) => {
    try {
        const { email, token, novaSenha } = req.body;

        if (!email || !token || !novaSenha) {
            return res.status(400).json({ success: false, error: "Faltam informações para redefinir a senha."});
        }

        // Tenta usar o Stack para redefinir a senha
        try {
            await stackClient.passwords.reset({
                email,
                token,
                newPassword: novaSenha,
            });

            // Atualiza também no banco local
            const user = await User.scope('comSenha').findOne({ where: { email } });
            if (user) {
                user.senha = novaSenha;
                await user.save();
            }

            return res.status(200).json({ success: true, message: 'Sua senha foi redefinida com sucesso! Faça login.' });
            
        } catch (stackError) {
            console.log("Stack não disponível, usando método local:", stackError.message);
            
            // Método local de fallback
            const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

            // Procura o utilizador com o e-mail, o token correspondente e que não tenha expirado.
            const user = await User.scope('comSenha').findOne({
                where: {
                    email,
                    resetPasswordToken,
                    resetPasswordExpire: { [sequelize.Op.gt]: Date.now() } // Verifica se o token não expirou.
                }
            });

            if (!user) {
                return res.status(400).json({ success: false, error: 'O código fornecido é inválido ou expirou.' });
            }

            // Se o utilizador for encontrado, atualiza a senha e limpa os campos de redefinição.
            user.senha = novaSenha;
            user.resetPasswordToken = null;
            user.resetPasswordExpire = null;
            await user.save();

            // Envia um novo token de login para que o utilizador já fique autenticado.
            enviarTokenResponse(user, 200, res);
        }

    } catch (error) {
        console.error("ERRO EM RESETPASSWORD:", error);
        res.status(500).json({ success: false, error: 'Erro no servidor ao redefinir a senha.' });
    }
};

// 5. Login com Google (via Stack/Neon Auth)
exports.googleLogin = async (req, res) => {
    try {
        // O cliente Stack deve ter um método para iniciar o fluxo OAuth2.
        const { authorizeUrl } = await stackClient.oauth.authorizeUrl({
            provider: 'google',
            redirectUri: `${process.env.BACKEND_URL}/auth/google/callback`,
            scope: ['profile', 'email'],
        });

        res.json({ success: true, authorizeUrl });
    } catch (error) {
        console.error('Erro ao iniciar login com Google:', error);
        res.status(500).json({ success: false, error: 'Erro ao iniciar login com Google.' });
    }
};

// 6. Callback do Google (após o usuário autorizar)
exports.googleCallback = async (req, res) => {
    const { code } = req.query; // Código de autorização do Google
    try {
        // Trocar o código de autorização por um token de sessão do Stack
        const { session } = await stackClient.sessions.authenticate({
            provider: 'google',
            code,
            redirectUri: `${process.env.BACKEND_URL}/auth/google/callback`,
        });

        // Verifica se o usuário já existe no banco local, se não, cria
        let user = await User.findOne({ where: { email: session.user.email } });
        
        if (!user) {
            user = await User.create({
                nome: session.user.displayName || session.user.email.split('@')[0],
                email: session.user.email,
                senha: crypto.randomBytes(20).toString('hex') // Senha aleatória
            });
        }

        // Configurar cookie de sessão seguro usando nosso sistema
        enviarTokenResponse(user, 200, res);

    } catch (error) {
        console.error('Erro no callback do Google:', error);
        res.redirect('/login?erro=' + encodeURIComponent('Falha no login com Google: ' + error.message));
    }
};

// 7. Login/Registro por Número de Telefone (OTP/SMS)
exports.sendPhoneOtp = async (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({ success: false, error: 'Por favor, forneça um número de telefone.' });
    }
    try {
        // Stack deve ter uma API para enviar OTP por SMS
        await stackClient.passkeys.sendOtp({
            phoneNumber,
        });

        res.status(200).json({ success: true, message: 'Código OTP enviado para o seu telefone!' });
    } catch (error) {
        console.error('Erro ao enviar OTP por telefone:', error);
        res.status(500).json({ success: false, error: error.message || 'Erro ao enviar código OTP.' });
    }
};

// 8. Verificar OTP e Logar/Registrar
exports.verifyPhoneOtp = async (req, res) => {
    const { phoneNumber, otp } = req.body;
    if (!phoneNumber || !otp) {
        return res.status(400).json({ success: false, error: 'Por favor, forneça o número e o código OTP.' });
    }
    try {
        // Stack deve ter uma API para verificar OTP e autenticar/criar usuário
        const { session } = await stackClient.sessions.authenticate({
            phoneNumber,
            otp,
        });

        // Verifica se o usuário já existe no banco local, se não, cria
        let user = await User.findOne({ where: { telefone: phoneNumber } });
        
        if (!user) {
            user = await User.create({
                nome: `Usuário ${phoneNumber}`,
                telefone: phoneNumber,
                senha: crypto.randomBytes(20).toString('hex') // Senha aleatória
            });
        }

        // Configurar cookie de sessão seguro usando nosso sistema
        enviarTokenResponse(user, 200, res);
    } catch (error) {
        console.error('Erro ao verificar OTP por telefone:', error);
        res.status(401).json({ success: false, error: error.message || 'Código OTP inválido ou expirado.' });
    }
};