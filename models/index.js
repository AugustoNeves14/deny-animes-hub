// models/index.js (Exemplo, ajuste conforme sua implementação real)

const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const basename = path.basename(__filename);
const db = {};

let sequelize;

// Verifica se estamos em ambiente de produção (Render) e se USE_SUPABASE_DB está definido
// ou se SUPABASE_DATABASE_URL existe, para priorizar Supabase.
// Caso contrário, tenta usar as variáveis de ambiente PostgreSQL local.
if (process.env.SUPABASE_DATABASE_URL) {
    console.log('🔗 Conectando ao Supabase via Sequelize...');
    sequelize = new Sequelize(process.env.SUPABASE_DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false, // Desative o logging do Sequelize para um ambiente mais limpo
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Importante para o Render/Supabase
            }
        },
        pool: { // Adicione configurações de pool para melhor gerenciamento de conexão
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
} else {
    console.log('🔗 Conectando ao PostgreSQL local/fallback via Sequelize...');
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            host: process.env.DB_HOST,
            dialect: 'postgres',
            logging: false,
            // Não precisa de SSL para conexões locais geralmente
        }
    );
}

fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;