require('dotenv').config();

const startServer = async () => {
  try {
    console.log('🚀 INICIANDO SERVIDOR DENYANIMEHUB...');
    console.log('📊 Ambiente:', process.env.NODE_ENV);
    
    // 1. Primeiro carregar os modelos do banco
    console.log('🔄 Carregando configuração do banco de dados...');
    const db = require('./models');
    
    // 2. Testar conexão com o banco
    console.log('🔄 Testando conexão com PostgreSQL...');
    const dbConnected = await db.testDbConnection();
    
    if (!dbConnected) {
      throw new Error('Não foi possível conectar ao banco de dados');
    }
    
    console.log('✅ Banco de dados conectado com sucesso');
    
    // 3. Agora iniciar o app Express
    console.log('🔄 Iniciando aplicação Express...');
    const app = require('./app');
    const PORT = process.env.PORT || 3000;
    
    // 4. Iniciar servidor
    app.listen(PORT, '0.0.0.0', () => {
      console.log('=' .repeat(60));
      console.log(`🎉 SERVIDOR DENYANIMEHUB RODANDO COM SUCESSO!`);
      console.log(`📍 Porta: ${PORT}`);
      console.log(`🌐 URL: ${process.env.APP_URL || `http://localhost:${PORT}`}`);
      console.log(`🗄️  Banco: PostgreSQL Neon`);
      console.log(`⚡ Modo: ${process.env.NODE_ENV}`);
      console.log('=' .repeat(60));
    });
    
  } catch (error) {
    console.error('❌ FALHA CRÍTICA AO INICIAR O SERVIDOR:', error.message);
    console.error('🔍 Detalhes do erro:', error);
    
    // Tentar reconexão após 10 segundos
    console.log('🔄 Tentando reconexão em 10 segundos...');
    setTimeout(() => {
      console.log('🔄 Reiniciando servidor...');
      startServer();
    }, 10000);
  }
};

// Iniciar servidor
startServer();