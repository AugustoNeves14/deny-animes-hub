require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: console.log
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco OK!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro de conexão com o banco:', err);
    process.exit(1);
  }
}

testConnection();
