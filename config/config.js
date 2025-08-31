require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // ignora verificação de certificado
      },
    },
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
