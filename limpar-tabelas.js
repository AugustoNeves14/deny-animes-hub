// ====================================================================================
//
//              DenyAnimeHub - Script de Limpeza Total do Banco (Versão Definitiva)
//
// Descrição:     Este script apaga TODAS as tabelas da aplicação para forçar uma
//                recriação completa e limpa pelo Sequelize. Use em desenvolvimento
//                para resolver problemas de sincronização.
//
// Como usar:     1. GARANTA QUE SEU SERVIÇO POSTGRESQL ESTÁ RODANDO.
//                2. Execute no terminal: node limpar-tabelas.js
//
// ====================================================================================

'use strict';

const { Sequelize } = require('sequelize');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, 'config', 'config.json'))[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'postgres',
    logging: false
});

const apagarTudo = async () => {
  try {
    console.log('🔌 Conectando ao banco de dados...');
    await sequelize.authenticate();
    console.log('✅ Conexão bem-sucedida.');

    console.log("🔥 INICIANDO LIMPEZA TOTAL DAS TABELAS DA APLICAÇÃO...");

    // Apaga em ordem de dependência para evitar erros
    await sequelize.query('DROP TABLE IF EXISTS "ratings" CASCADE;');
    console.log("✅ Tabela 'ratings' apagada.");
    
    await sequelize.query('DROP TABLE IF EXISTS "comments" CASCADE;');
    console.log("✅ Tabela 'comments' apagada.");

    await sequelize.query('DROP TABLE IF EXISTS "historicos" CASCADE;');
    console.log("✅ Tabela 'historicos' apagada.");

    await sequelize.query('DROP TABLE IF EXISTS "posts" CASCADE;');
    console.log("✅ Tabela 'posts' apagada.");

    await sequelize.query('DROP TABLE IF EXISTS "episodios" CASCADE;');
    console.log("✅ Tabela 'episodios' apagada.");

    await sequelize.query('DROP TABLE IF EXISTS "animes" CASCADE;');
    console.log("✅ Tabela 'animes' apagada.");

    await sequelize.query('DROP TABLE IF EXISTS "users" CASCADE;');
    console.log("✅ Tabela 'users' apagada.");


    console.log('\n✨ Processo de limpeza total concluído! A fundação está pronta para ser reconstruída.');
    console.log('Pode iniciar seu servidor com "npm start".');

  } catch (error) {
    console.error('❌ Erro durante a limpeza total:', error);
    if (error.name === 'SequelizeConnectionError') {
        console.error('\nDICA: Verifique suas credenciais em "/config/config.json" e se o servidor PostgreSQL está rodando.');
    }
  } finally {
    await sequelize.close();
    console.log('🔌 Conexão com o banco de dados fechada.');
  }
};

apagarTudo();