'use strict';

const { Sequelize } = require('sequelize');

// Substitua abaixo pela sua DATABASE_URL real do Supabase
const TEST_DATABASE_URL = "postgresql://postgres:denyneves123@@@izwuglmezgkkbtpdvkct.supabase.co:5432/postgres?sslmode=require";

const sequelize = new Sequelize(TEST_DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão bem-sucedida!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Falha na conexão:', err);
        process.exit(1);
    }
})();
