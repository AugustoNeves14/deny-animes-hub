// ==========================================================================
// DenyAnimeHub - Script de Gerenciamento de Administradores
// Uso:
// 1. Criar um novo admin: node manage-admin.js --create <nome> <email> <senha>
// 2. Promover um usuário existente: node manage-admin.js --promote <email_do_usuario>
// ==========================================================================

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User'); // Importa o modelo de usuário

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Função para conectar ao banco de dados
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Conectado para o script...');
    } catch (error) {
        console.error(`Erro ao conectar com o MongoDB: ${error.message}`);
        process.exit(1); // Sai do processo com falha
    }
};

// Função para criar um novo administrador
const createAdmin = async (nome, email, senha) => {
    if (!nome || !email || !senha) {
        console.error('ERRO: Para criar um admin, forneça nome, email e senha.');
        console.log('Exemplo: npm run admin:create "Admin User" "admin@example.com" "senhaForte123"');
        process.exit(1);
    }

    try {
        // Verifica se o usuário já existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log(`Usuário com email "${email}" já existe.`);
            // Se já existe, pergunta se quer promover
            console.log(`Para promovê-lo, use: npm run admin:promote ${email}`);
            return;
        }

        // Cria o novo usuário com a role 'admin'
        await User.create({
            nome,
            email,
            senha,
            role: 'admin' // A parte mais importante!
        });

        console.log('====================================================');
        console.log(`✅ Administrador "${nome}" criado com sucesso!`);
        console.log(`   Email: ${email}`);
        console.log(`   Senha: ${senha}`);
        console.log('====================================================');

    } catch (error) {
        console.error('Erro ao criar o administrador:', error.message);
    }
};

// Função para promover um usuário existente a administrador
const promoteUser = async (email) => {
    if (!email) {
        console.error('ERRO: Forneça o email do usuário a ser promovido.');
        console.log('Exemplo: npm run admin:promote usuario@example.com');
        process.exit(1);
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.error(`ERRO: Usuário com o email "${email}" não encontrado.`);
            return;
        }

        if (user.role === 'admin') {
            console.log(`O usuário "${user.nome}" (${email}) já é um administrador.`);
            return;
        }

        // Atualiza a role do usuário para 'admin'
        user.role = 'admin';
        await user.save({ validateBeforeSave: false }); // Salva a alteração

        console.log('====================================================');
        console.log(`✅ Usuário "${user.nome}" (${email}) foi promovido a administrador!`);
        console.log('====================================================');

    } catch (error) {
        console.error('Erro ao promover o usuário:', error.message);
    }
};

// Função principal que decide qual ação tomar
const run = async () => {
    await connectDB();

    const args = process.argv.slice(2); // Pega os argumentos da linha de comando
    const command = args[0];

    switch (command) {
        case '--create':
            const [nome, email, senha] = args.slice(1);
            await createAdmin(nome, email, senha);
            break;
        case '--promote':
            const userEmail = args[1];
            await promoteUser(userEmail);
            break;
        default:
            console.log('Comando inválido. Use --create ou --promote.');
            console.log('Exemplo de criação: node manage-admin.js --create "Admin" "admin@email.com" "senha123"');
            console.log('Exemplo de promoção: node manage-admin.js --promote "user@email.com"');
    }

    await mongoose.disconnect();
    console.log('Desconectado do MongoDB.');
};

run();