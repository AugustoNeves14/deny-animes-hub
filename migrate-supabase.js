// ====================================================================================
//
//              DenyAnimeHub - Script de Migração para Supabase (NÃO-DESTRUTIVO)
//
// Descrição:     Este script gerencia a estrutura do banco de dados no Supabase
//                diretamente via conexão PostgreSQL, garantindo que as tabelas e
//                colunas necessárias existam. Ele é robusto para ser executado
//                em ambientes de CI/CD como o Render.
//
// Como usar:     1. Configure as variáveis de ambiente do Supabase no seu .env ou Render.
//                2. Execute no terminal (ou configure no seu package.json):
//                   node migrate-supabase.js
//
// Dependências:  pg, pg-hstore (instale com 'npm install pg pg-hstore')
//
// ====================================================================================

require('dotenv').config();
const { Client } = require('pg');

// Variáveis de ambiente do Supabase
const SUPABASE_DATABASE_URL = process.env.SUPABASE_DATABASE_URL;

// Validação crítica das variáveis de ambiente
if (!SUPABASE_DATABASE_URL) {
    console.error(`\n❌ ERRO CRÍTICO: A variável de ambiente 'SUPABASE_DATABASE_URL' não foi definida.`);
    console.error(`Por favor, adicione-a ao seu arquivo .env ou às configurações de ambiente no Render.`);
    process.exit(1);
}

// Configurações de conexão para o cliente PG
const clientConfig = {
    connectionString: SUPABASE_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Necessário para alguns ambientes como o Render
    }
};

/**
 * Função genérica para executar uma query SQL.
 * @param {string} text - A string da query SQL.
 * @param {Array} params - Parâmetros para a query.
 * @returns {Promise<object>} - O resultado da query.
 */
async function executeQuery(client, text, params = []) {
    try {
        const res = await client.query(text, params);
        return res;
    } catch (err) {
        console.error(`❌ Erro ao executar query: ${text} - Parâmetros: ${params}`, err.message);
        throw err;
    }
}

/**
 * Cria uma tabela se ela não existir.
 * @param {Client} client - Instância do cliente PostgreSQL.
 * @param {string} tableName - Nome da tabela a ser criada.
 * @param {object} columns - Objeto onde a chave é o nome da coluna e o valor é a definição SQL (ex: 'TEXT PRIMARY KEY', 'BOOLEAN DEFAULT FALSE').
 */
async function createTableIfNotExists(client, tableName, columns) {
    const columnDefinitions = Object.entries(columns)
        .map(([name, definition]) => `${name} ${definition}`)
        .join(', ');

    const createTableSql = `
        CREATE TABLE IF NOT EXISTS "${tableName}" (
            ${columnDefinitions},
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
            "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
        );
    `;
    
    try {
        await executeQuery(client, createTableSql);
        console.log(`✅ Tabela "${tableName}" verificada/criada.`);
    } catch (error) {
        console.error(`❌ Falha ao criar/verificar tabela "${tableName}":`, error.message);
        throw error;
    }
}

/**
 * Adiciona uma coluna a uma tabela apenas se ela não existir.
 * @param {Client} client - Instância do cliente PostgreSQL.
 * @param {string} tableName - O nome da tabela.
 * @param {string} columnName - O nome da coluna a ser adicionada.
 * @param {string} columnDefinition - A definição SQL da coluna (ex: 'BOOLEAN NOT NULL DEFAULT TRUE').
 */
async function addColumnIfNotExists(client, tableName, columnName, columnDefinition) {
    try {
        // Verifica se a coluna já existe
        const checkColumnSql = `
            SELECT column_name
            FROM information_schema.columns
            WHERE table_schema = 'public' -- ou seu schema específico
            AND table_name = $1
            AND column_name = $2;
        `;
        const result = await executeQuery(client, checkColumnSql, [tableName, columnName]);

        if (result.rows.length === 0) {
            console.log(`🔎 Coluna "${columnName}" não encontrada na tabela "${tableName}". Adicionando...`);
            const addColumnSql = `ALTER TABLE "${tableName}" ADD COLUMN "${columnName}" ${columnDefinition};`;
            await executeQuery(client, addColumnSql);
            console.log(`✅ Coluna "${columnName}" adicionada com sucesso à tabela "${tableName}".`);
        } else {
            console.log(`👍 Coluna "${columnName}" já existe na tabela "${tableName}". Nenhuma ação necessária.`);
        }
    } catch (error) {
        // Se a tabela não existe, loga e continua (ela será criada pelo Sequelize/aplicação)
        if (error.message.includes(`relation "${tableName}" does not exist`)) {
            console.log(`⚠️  Tabela "${tableName}" não existe ainda. As colunas serão criadas quando a tabela for.`);
        } else {
            console.error(`❌ Erro ao adicionar coluna "${columnName}" à tabela "${tableName}":`, error.message);
            throw error;
        }
    }
}


/**
 * Função principal que executa a migração do banco de dados.
 */
const migrarSupabase = async () => {
    console.log(`🔌 Conectando ao banco de dados Supabase...`);
    const client = new Client(clientConfig);

    try {
        await client.connect();
        console.log('✅ Conexão com o Supabase bem-sucedida.');
        console.log('\n--- INICIANDO VERIFICAÇÃO DA ESTRUTURA DO BANCO DE DADOS ---');

        // =========================================================================
        // Definição das tabelas e suas colunas principais
        // Adapte isso com as suas tabelas e colunas, incluindo chaves estrangeiras
        // ATENÇÃO: Se suas tabelas já forem criadas pelo Sequelize,
        // você pode remover a parte `createTableIfNotExists` e focar só no `addColumnIfNotExists`.
        // Mas se você quer controle total aqui, defina-as.
        // O Sequelize ainda vai gerenciar os modelos e associações.
        // =========================================================================

        // Exemplo: Tabela de Usuários (simplificado, adicione mais colunas conforme seus modelos)
        await createTableIfNotExists(client, 'Users', {
            id: 'SERIAL PRIMARY KEY',
            username: 'VARCHAR(255) UNIQUE NOT NULL',
            email: 'VARCHAR(255) UNIQUE NOT NULL',
            password: 'VARCHAR(255) NOT NULL',
            role: `VARCHAR(50) DEFAULT 'user'`,
        });

        // Exemplo: Tabela de Animes
        await createTableIfNotExists(client, 'Animes', {
            id: 'SERIAL PRIMARY KEY',
            titulo: 'VARCHAR(255) UNIQUE NOT NULL',
            slug: 'VARCHAR(255) UNIQUE NOT NULL',
            descricao: 'TEXT',
            generos: 'JSONB', // Para armazenar array de strings
            views: 'INTEGER DEFAULT 0',
            status: `VARCHAR(50) DEFAULT 'Em Andamento'`,
            anoLancamento: 'INTEGER',
            diretor: 'VARCHAR(255)',
            estudio: 'VARCHAR(255)',
            capaUrl: 'VARCHAR(255)',
            trailerUrl: 'VARCHAR(255)',
            // ... adicione outras colunas do seu modelo Anime
        });

        // Exemplo: Tabela de Episódios
        await createTableIfNotExists(client, 'Episodios', {
            id: 'SERIAL PRIMARY KEY',
            animeId: 'INTEGER REFERENCES "Animes" (id) ON DELETE CASCADE',
            titulo: 'VARCHAR(255) NOT NULL',
            numero: 'INTEGER NOT NULL',
            temporada: 'INTEGER DEFAULT 1',
            videoUrl: 'VARCHAR(255)',
            downloadUrl: 'VARCHAR(255)',
            // ... outras colunas
        });

        // Exemplo: Tabela de Posts
        await createTableIfNotExists(client, 'Posts', {
            id: 'SERIAL PRIMARY KEY',
            titulo: 'VARCHAR(255) NOT NULL',
            slug: 'VARCHAR(255) UNIQUE NOT NULL',
            conteudo: 'TEXT',
            autorId: 'INTEGER REFERENCES "Users" (id) ON DELETE SET NULL',
            emDestaque: 'BOOLEAN DEFAULT FALSE',
            views: 'INTEGER DEFAULT 0',
            capaUrl: 'VARCHAR(255)',
            // ... outras colunas
        });

        // Exemplo: Tabela de Histórico (assumindo que já existe ou será criada)
        await createTableIfNotExists(client, 'Historicos', {
            id: 'SERIAL PRIMARY KEY',
            userId: 'INTEGER REFERENCES "Users" (id) ON DELETE CASCADE',
            animeId: 'INTEGER REFERENCES "Animes" (id) ON DELETE CASCADE',
            episodioId: 'INTEGER REFERENCES "Episodios" (id) ON DELETE SET NULL',
            progresso: 'INTEGER DEFAULT 0', // progresso em segundos ou percentual
        });

        // Exemplo: Tabela de Comentários
        await createTableIfNotExists(client, 'Comments', {
            id: 'SERIAL PRIMARY KEY',
            userId: 'INTEGER REFERENCES "Users" (id) ON DELETE CASCADE',
            animeId: 'INTEGER REFERENCES "Animes" (id) ON DELETE CASCADE',
            conteudo: 'TEXT NOT NULL',
            // ... outras colunas
        });

        // Exemplo: Tabela de Ratings
        await createTableIfNotExists(client, 'Ratings', {
            id: 'SERIAL PRIMARY KEY',
            userId: 'INTEGER REFERENCES "Users" (id) ON DELETE CASCADE',
            animeId: 'INTEGER REFERENCES "Animes" (id) ON DELETE CASCADE',
            rating: 'INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL',
            // ... outras colunas
        });

        // Adicionar coluna 'receberNotificacoes' na tabela 'Users'
        await addColumnIfNotExists(
            client,
            'Users', // Supabase geralmente usa nomes de tabela no plural e CamelCase ou PascalCase.
            'receberNotificacoes',
            'BOOLEAN NOT NULL DEFAULT TRUE'
        );

        // Adicionar coluna 'bannerUrl' na tabela 'Animes' (exemplo, se você tiver um)
        await addColumnIfNotExists(
            client,
            'Animes',
            'bannerUrl',
            'VARCHAR(255) DEFAULT NULL' // Ou NOT NULL com um valor padrão
        );

        // Adicionar uma coluna de 'status' para posts, se aplicável
        await addColumnIfNotExists(
            client,
            'Posts',
            'status',
            `VARCHAR(50) DEFAULT 'published'`
        );
        
        console.log('\n✨ Processo de migração para Supabase concluído! A estrutura do seu banco de dados está atualizada.');
        console.log('Agora você pode iniciar seu servidor Node.js. O Sequelize continuará a gerenciar os modelos.');

    } catch (error) {
        console.error('❌ ERRO CRÍTICO DURANTE A MIGRAÇÃO DO SUPABASE:', error);
        console.error('\nDICA: Verifique a `SUPABASE_DATABASE_URL` no seu .env e as configurações SSL.');
    } finally {
        if (client) {
            await client.end();
            console.log('🔌 Conexão com o banco de dados Supabase fechada.');
        }
        process.exit(0); // Garante que o processo termine
    }
};

// Executa a função principal de migração
migrarSupabase();