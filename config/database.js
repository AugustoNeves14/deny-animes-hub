// ==========================================================================
// ARQUIVO: config/database.js
// RESPONSABILIDADE: Criar conexão Sequelize com o banco de dados MySQL
// ==========================================================================

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Usa o dialect do .env se disponível, senão usa 'mysql' como padrão
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'mysql', // 💡 funciona local e no Render
    logging: false,
  }
);

// Testa a conexão
const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados SQL estabelecida com sucesso.');
  } catch (error) {
    console.error('❌ Falha na conexão com o banco de dados SQL:', error);
  }
};

testDbConnection();

module.exports = sequelize;
