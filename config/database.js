// ==========================================================================
// ARQUIVO: config/database.js
// RESPONSABILIDADE: Criar conexão Sequelize com o banco de dados Supabase (PostgreSQL)
// ==========================================================================
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Nome do banco
  process.env.DB_USER,     // Usuário
  process.env.DB_PASSWORD, // Senha
  {
    host: process.env.DB_HOST,  // Host Supabase
    port: process.env.DB_PORT,  // Porta Supabase
    dialect: 'postgres',        // Dialeto sempre postgres
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // necessário para Render + Supabase
      },
    },
    logging: false, // Deixa o console limpo
  }
);

// Testa a conexão
const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o Supabase estabelecida com sucesso.');
  } catch (error) {
    console.error('❌ Falha na conexão com o Supabase:', error);
  }
};
testDbConnection();

module.exports = sequelize;
