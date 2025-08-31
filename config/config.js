require('dotenv').config();

module.exports = {
  development: {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    database: process.env.DB_DATABASE || 'neondb',
    username: process.env.DB_USER || 'neondb_owner',
    password: process.env.DB_PASSWORD || '',
    logging: false,
    dialectOptions: {
      ssl: false // localmente não precisamos de SSL
    },
    url: process.env.DATABASE_URL || null,
  },
  test: {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    database: process.env.DB_DATABASE || 'neondb',
    username: process.env.DB_USER || 'neondb_owner',
    password: process.env.DB_PASSWORD || '',
    logging: false,
    dialectOptions: {
      ssl: false
    },
    url: process.env.DATABASE_URL || null,
  },
  production: {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // ignora verificação de certificado do Neon
      }
    },
    url: process.env.DATABASE_URL,
  }
};
