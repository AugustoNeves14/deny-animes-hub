// middleware/dbImageStore.js - VERSÃO CORRIGIDA
"use strict";
const { Pool } = require("pg");
const crypto = require("crypto");

// Use memoryStorage para processar arquivos em memória
const multer = require('multer');
const memoryStorage = multer.memoryStorage();

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) {
    console.error("❌ ERRO: DATABASE_URL não está definida");
    // Em produção, isso deve ser tratado de forma mais robusta
}

const pool = new Pool({ 
    connectionString: DB_URL, 
    max: 10, 
    idleTimeoutMillis: 30000,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

/**
 * Garante que a tabela 'stored_images' exista.
 */
async function ensureTable() {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS stored_images (
                id SERIAL PRIMARY KEY,
                filename TEXT NOT NULL,
                mimetype TEXT NOT NULL,
                sha1 TEXT UNIQUE NOT NULL,
                data BYTEA NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log("[dbImageStore] Tabela 'stored_images' verificada/criada.");
    } catch (err) {
        console.error("[dbImageStore] Erro ao garantir tabela stored_images:", err);
    } finally {
        client.release();
    }
}

// Executar apenas se DATABASE_URL estiver definida
if (DB_URL) {
    ensureTable().catch(console.error);
} else {
    console.warn("⚠️  DATABASE_URL não definida - Tabela de imagens não será criada");
}

/**
 * Salva um único arquivo (buffer) no banco de dados.
 */
async function saveOne(file) {
    if (!file || !file.buffer) return null;
    if (!DB_URL) {
        console.error("❌ Não é possível salvar imagem: DATABASE_URL não definida");
        return null;
    }

    const buf = file.buffer;
    const sha1 = crypto.createHash("sha1").update(buf).digest("hex");
    const client = await pool.connect();

    try {
        const insert = `
            INSERT INTO stored_images (filename, mimetype, sha1, data)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (sha1) DO UPDATE SET filename = EXCLUDED.filename
            RETURNING id, filename, mimetype, sha1;
        `;
        const { rows } = await client.query(insert, [
            file.originalname || file.fieldname,
            file.mimetype,
            sha1,
            buf,
        ]);
        return rows[0];
    } catch (e) {
        console.error(`[dbImageStore] Erro ao salvar arquivo '${file.originalname}':`, e);
        return null;
    } finally {
        client.release();
    }
}

/**
 * Middleware que processa arquivos em memória
 */
function persistUpload(fieldNames, options = {}) {
    const names = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
    const setUrl = options.setUrlOnReq !== false;

    return async function(req, res, next) {
        try {
            // Verificar se DATABASE_URL está definida
            if (!DB_URL) {
                console.error("❌ DATABASE_URL não definida - Upload não pode ser processado");
                return res.status(500).json({ 
                    success: false, 
                    error: "Configuração do servidor incompleta. Contate o administrador." 
                });
            }

            const collectedFiles = [];
            
            if (req.files) {
                if (Array.isArray(req.files)) {
                    collectedFiles.push(...req.files.filter(f => names.includes(f.fieldname)));
                } else {
                    for (const n of names) {
                        const arr = req.files[n];
                        if (Array.isArray(arr)) collectedFiles.push(...arr);
                    }
                }
            }
            
            if (req.file && names.includes(req.file.fieldname)) {
                collectedFiles.push(req.file);
            }

            const results = [];
            for (const f of collectedFiles) {
                const saved = await saveOne(f);
                if (saved) results.push(saved);
            }

            if (setUrl && results.length > 0) {
                if (results.length === 1) {
                    req.fileDb = results[0];
                    req.fileUrl = `/db-image/id/${results[0].id}`;
                    req.fileUrlByName = `/db-image/file/${encodeURIComponent(results[0].filename)}`;
                } else if (results.length > 1) {
                    req.filesDb = results;
                    req.filesUrl = results.map(r => `/db-image/id/${r.id}`);
                }
            }

            next();
        } catch (e) {
            console.error("[dbImageStore] Erro crítico no middleware persistUpload:", e);
            res.status(500).json({ success: false, error: "Falha interna ao processar upload de imagem." });
        }
    };
}

module.exports = {
    persistUpload,
    pool // Exportar pool para testes
};