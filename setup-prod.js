// ========================================================================
// SCRIPT DE SETUP PARA PRODUÇÃO
// Responsabilidade: Criar o usuário admin se ele não existir.
// Seguro e não apaga dados existentes.
// ========================================================================

require('dotenv').config(); // Carrega as variáveis de ambiente (DB_HOST, etc.)
const db = require('./models'); // Importa a conexão com o banco e os modelos

const setupProduction = async () => {
    try {
        console.log('Conectando ao banco de dados de produção...');
        // A configuração de produção (com SSL) já está no models/index.js
        await db.sequelize.authenticate();
        console.log('✅ Conexão bem-sucedida.');

        console.log('Verificando se o usuário admin já existe...');
        const adminEmail = 'admin@denyanimehub.com';
        const adminExists = await db.User.scope('comSenha').findOne({ where: { email: adminEmail } });

        if (adminExists) {
            console.log('✅ Usuário admin já existe. Nenhuma ação necessária.');
            return;
        }

        console.log('Criando usuário admin padrão...');
        const adminUser = await db.User.create({
            nome: 'Admin Akatsuki',
            email: adminEmail,
            // IMPORTANTE: Use uma senha forte para o ambiente de produção
            senha: process.env.ADMIN_DEFAULT_PASSWORD || 'admin@@@...2025',
            role: 'admin'
        });
        console.log(`🚀 Usuário admin de produção criado com sucesso! ID: ${adminUser.id}`);

    } catch (error) {
        console.error('❌ Erro durante o setup de produção:', error);
    } finally {
        // Garante que a conexão com o banco seja fechada no final
        if (db.sequelize) {
            await db.sequelize.close();
            console.log('Conexão com o banco de dados fechada.');
        }
    }
};

setupProduction();