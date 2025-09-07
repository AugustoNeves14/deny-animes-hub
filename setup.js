// setup-prod.js
require('dotenv').config();
const db = require('./models');

const setupProduction = async () => {
    try {
        console.log('Verificando usuário admin no banco de produção...');
        const adminExists = await db.User.findOne({ where: { email: 'admin@denyanimehub.com' } });

        if (adminExists) {
            console.log('✅ Usuário admin já existe. Nenhuma ação necessária.');
            return;
        }

        console.log('Criando usuário admin padrão...');
        const adminUser = await db.User.create({
            nome: 'Admin Akatsuki',
            email: 'admin@denyanimehub.com',
            senha: 'password123', // Use uma senha forte em produção real!
            role: 'admin'
        });
        console.log(`🚀 Usuário admin de produção criado com ID: ${adminUser.id}`);

    } catch (error) {
        console.error('❌ Erro durante o setup de produção:', error);
    } finally {
        if (db.sequelize) {
            await db.sequelize.close();
        }
    }
};

setupProduction();