'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  // Se 'use_env_variable' estiver definido na configuração (como fizemos para 'production'),
  // o Sequelize tentará usar a URL de conexão completa daquela variável de ambiente.
  // O segundo argumento 'config' é para opções adicionais como dialectOptions.
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Caso contrário, usa as configurações tradicionais de database, username, password, host.
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    // Filtra para incluir apenas arquivos .js que não sejam o próprio index.js
    // e que não sejam arquivos de teste.
    return (
      file.indexOf('.') !== 0 && // Não é um arquivo oculto
      file !== basename &&      // Não é o próprio index.js
      file.slice(-3) === '.js' && // É um arquivo JavaScript
      file.indexOf('.test.js') === -1 // Não é um arquivo de teste
    );
  })
  .forEach(file => {
    // Para cada arquivo de modelo encontrado, importa e adiciona ao objeto db.
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  // Itera sobre todos os modelos e chama o método 'associate' se ele existir.
  // Isso é essencial para configurar as associações entre os modelos (hasMany, belongsTo, etc.).
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Adiciona as instâncias de Sequelize e o próprio construtor Sequelize ao objeto db,
// facilitando o acesso em outras partes da aplicação (ex: db.sequelize, db.Sequelize).
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;