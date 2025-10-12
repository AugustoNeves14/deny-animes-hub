// test-db.js
const db = require('./models');

async function test() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Conexão com PostgreSQL estabelecida!');
    
    // Testar uma consulta
    const users = await db.User.findAll();
    console.log(`📊 Total de usuários: ${users.length}`);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await db.sequelize.close();
  }
}

test();