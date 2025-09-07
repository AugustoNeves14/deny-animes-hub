// ====================================================================================
//
//              DenyAnimeHub - Script de Migração de Banco (NÃO-DESTRUTIVO)
//
// Descrição:     Esta versão definitiva corrige o erro de chamada da queryInterface,
//                garantindo que a verificação e adição de colunas funcione
//                corretamente em qualquer ambiente.
//
// Como usar:     1. Garanta que seu serviço de DB esteja rodando.
//                2. Execute no terminal: node migrar-banco.js
//
// ====================================================================================

'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Determina o ambiente. Se NODE_ENV não estiver definido, assume 'development'.
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, 'config', 'config.json'))[env];

// Validação crítica para garantir que as senhas padrão não sejam usadas.
if (!config.password || config.password === 'SUA_SENHA_AQUI') {
    console.error(`\n❌ ERRO CRÍTICO: Senha para o ambiente '${env}' não foi definida!`);
    console.error("Por favor, edite o arquivo '/config/config.json' e defina a senha correta.\n");
    process.exit(1);
}

// A instância do Sequelize agora inclui as dialectOptions do config.json
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions || {},
    logging: false
});

/**
 * Função segura para adicionar uma coluna a uma tabela apenas se ela não existir.
 * @param {object} queryInterface - A interface de query do Sequelize.
 * @param {string} tableName - O nome da tabela.
 * @param {string} columnName - O nome da coluna a ser adicionada.
 * @param {object} columnDefinition - A definição da coluna no formato do Sequelize.
 */
const adicionarColunaSeNaoExistir = async (queryInterface, tableName, columnName, columnDefinition) => {
    try {
        // [CORREÇÃO DEFINITIVA] Chamamos o método describeTable a partir do objeto queryInterface.
        const tableDescription = await queryInterface.describeTable(tableName);

        if (!tableDescription[columnName]) {
            console.log(`🔎 Coluna "${columnName}" não encontrada na tabela "${tableName}". Adicionando...`);
            await queryInterface.addColumn(tableName, columnName, columnDefinition);
            console.log(`✅ Coluna "${columnName}" adicionada com sucesso à tabela "${tableName}".`);
        } else {
            console.log(`👍 Coluna "${columnName}" já existe na tabela "${tableName}". Nenhuma ação necessária.`);
        }
    } catch (error) {
        const errorCode = error.original?.code || error.parent?.code;
        if (error.name === 'SequelizeDatabaseError' && errorCode === '42P01') {
             console.log(`⚠️  Tabela "${tableName}" não existe ainda. O Sequelize irá criá-la na próxima inicialização do seu app.`);
        } else {
            throw error;
        }
    }
};

/**
 * Função principal que executa a migração do banco de dados.
 */
const migrarBanco = async () => {
  try {
    console.log(`🔌 Conectando ao banco de dados do ambiente: [${env.toUpperCase()}]...`);
    await sequelize.authenticate();
    console.log('✅ Conexão bem-sucedida.');
    
    const queryInterface = sequelize.getQueryInterface();
    
    console.log('\n--- INICIANDO VERIFICAÇÃO DA ESTRUTURA DO BANCO ---');

    await adicionarColunaSeNaoExistir(
        queryInterface, // Passa o objeto queryInterface como primeiro argumento
        'users', 
        'receberNotificacoes', 
        { 
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: true 
        }
    );
    
    console.log('\n✨ Processo de migração concluído! A estrutura do seu banco de dados está atualizada.');
    console.log('Pode iniciar seu servidor com "npm start".');

  } catch (error) {
    console.error('❌ Erro durante a migração do banco:', error);
    if (error.name === 'SequelizeConnectionResetError' || error.original?.code === 'ECONNRESET') {
        console.error('\nDICA: O erro "ECONNRESET" geralmente indica um problema de conexão SSL.');
    } else if (error.name === 'SequelizeConnectionError') {
        console.error('\nDICA: Verifique suas credenciais e se o servidor de banco de dados está acessível.');
    } else {
        console.error('\nDICA: Um erro inesperado ocorreu. Verifique a mensagem de erro acima para mais detalhes.');
    }
  } finally {
    await sequelize.close();
    console.log('🔌 Conexão com o banco de dados fechada.');
  }
};

// Executa a função principal de migração
migrarBanco();