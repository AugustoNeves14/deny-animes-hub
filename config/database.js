const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

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
