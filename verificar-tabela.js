// verificar-tabela.js
const { Client } = require('pg');
require('dotenv').config();

async function verificarTabela() {
    if (!process.env.DATABASE_URL) {
        console.log('❌ DATABASE_URL não definida');
        return;
    }

    const client = new Client({ 
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        console.log('✅ Conectado ao banco');

        // Verificar se a tabela existe
        const result = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'stored_images'
            );
        `);

        if (result.rows[0].exists) {
            console.log('✅ Tabela stored_images existe');
            
            // Contar imagens
            const count = await client.query('SELECT COUNT(*) FROM stored_images');
            console.log(`📊 ${count.rows[0].count} imagens no banco`);
        } else {
            console.log('❌ Tabela stored_images não existe');
            console.log('📋 Criando tabela...');
            
            await client.query(`
                CREATE TABLE stored_images (
                    id SERIAL PRIMARY KEY,
                    filename TEXT NOT NULL,
                    mimetype TEXT NOT NULL,
                    sha1 TEXT UNIQUE NOT NULL,
                    data BYTEA NOT NULL,
                    created_at TIMESTAMP DEFAULT NOW()
                );
            `);
            
            console.log('✅ Tabela criada com sucesso');
        }

    } catch (error) {
        console.error('❌ Erro ao verificar tabela:', error);
    } finally {
        await client.end();
    }
}

verificarTabela();