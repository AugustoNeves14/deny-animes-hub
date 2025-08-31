'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// O config.json ainda é usado para pegar 'dialect', 'dialectOptions', etc.
// Mas a URL de conexão será sobrescrita pela DATABASE_URL.
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (process.env.DATABASE_URL) { // Verifica se DATABASE_URL está definida (ambiente de produção)
  // Usa a DATABASE_URL completa fornecida no ambiente do Render/Supabase
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', // Garante que o dialeto seja PostgreSQL
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,       // Exige SSL
        rejectUnauthorized: false // Importante para alguns ambientes, incluindo Render/Supabase, se o certificado não for publicamente reconhecido
      }
    },
    logging: false // Opcional: desative os logs SQL no console em produção
  });
} else if (config.use_env_variable) {
  // Fallback para config.use_env_variable se DATABASE_URL não estiver definida
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Usa as configurações do config.json (principalmente para desenvolvimento local)
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
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