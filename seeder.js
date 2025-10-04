// ARQUIVO: seeder.js (VERSÃO FINAL)
require('dotenv').config();
const db = require('./models');

const seedDatabase = async () => {
    try {
        console.log('Iniciando a sincronização forçada do banco de dados...');
        // ATENÇÃO: { force: true } apaga TODAS as tabelas e as recria.
        await db.sequelize.sync({ force: true });
        console.log('✅ Banco de dados sincronizado com sucesso.');

        console.log('Criando usuário administrador padrão...');
        const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD;
        if (!adminPassword) {
            throw new Error('A senha do administrador padrão (ADMIN_DEFAULT_PASSWORD) não está definida no arquivo .env');
        }

        await db.User.create({
            nome: 'Admin',
            email: 'admin@denyanimehub.com',
            senha: adminPassword, // A senha será hasheada pelo hook do model
            role: 'admin'
        });
        console.log('✅ Usuário admin criado. Email: admin@denyanimehub.com');
        
        console.log('\n=====================================');
        console.log('🚀 Configuração do banco de dados concluída!');
        console.log('=====================================');
        
    } catch (error) {
        console.error('❌ Erro durante o processo de configuração:', error);
        process.exit(1);
    } finally {
        await db.sequelize.close();
    }
};

seedDatabase();