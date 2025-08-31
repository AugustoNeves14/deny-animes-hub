'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

// Inicializa o Sequelize com URL ou com detalhes individuais
let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, {
    ...config,
    dialectOptions: config.dialectOptions || {},
  });
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      ...config,
      dialectOptions: config.dialectOptions || {},
    }
  );
}

// Carrega todos os modelos da pasta atual
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Associa modelos, se houver associações
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Exporta sequelize e Sequelize para uso externo
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
