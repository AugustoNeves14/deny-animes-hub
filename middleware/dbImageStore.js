
/**
 * @file middleware/dbImageStore.js
 * @description Middleware para persistir uploads de IMAGEM diretamente no Neon (BYTEA).
 *              Usado em conjunto com Multer para processar arquivos em memória.
 */
"use strict";
const { Pool } = require("pg");
const crypto = require("crypto");

const DB_URL = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_6hImLi9pNDCM@ep-green-poetry-advyipjs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require";
const pool = new Pool({ connectionString: DB_URL, max: 10, idleTimeoutMillis: 30000 });

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
ensureTable().catch(console.error);

/**
 * Salva um único arquivo (buffer) no banco de dados.
 * @param {object} file - Objeto de arquivo do Multer (com `buffer`, `originalname`, `mimetype`).
 * @returns {object|null} O registro salvo (id, filename, mimetype, sha1) ou null em caso de falha.
 */
async function saveOne(file) {
    if (!file || !file.buffer) return null;

    const buf = file.buffer;
    const sha1 = crypto.createHash("sha1").update(buf).digest("hex");
    const client = await pool.connect();

    try {
        // Tenta inserir; se houver conflito (sha1 já existe), atualiza o filename
        // e retorna os dados existentes. Isso evita duplicatas.
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
        console.error(`[dbImageStore] Erro ao salvar arquivo '${file.originalname}' no Neon:`, e);
        return null;
    } finally {
        client.release();
    }
}

/**
 * Middleware que processa arquivos em memória (do Multer) e os persiste no Neon.
 * Adiciona `req.fileDb`, `req.fileUrl`, `req.filesDb`, `req.filesUrl` ao request.
 *
 * @param {string|Array<string>} fieldNames - O(s) nome(s) do(s) campo(s) de arquivo no formulário.
 * @param {object} [options] - Opções de configuração.
 * @param {boolean} [options.setUrlOnReq=true] - Define se URLs amigáveis (`req.fileUrl`) devem ser adicionadas ao request.
 * @returns {function} Middleware assíncrono.
 */
function persistUpload(fieldNames, options = {}) {
    const names = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
    const setUrl = options.setUrlOnReq !== false; // default true

    return async function(req, res, next) {
        try {
            const collectedFiles = [];

            // Coleta arquivos de diferentes configurações do Multer (single, array, any)
            if (req.files) {
                if (Array.isArray(req.files)) { // Multer .array() ou .any()
                    collectedFiles.push(...req.files.filter(f => names.includes(f.fieldname)));
                } else { // Multer .fields() (por campo)
                    for (const n of names) {
                        const arr = req.files[n];
                        if (Array.isArray(arr)) collectedFiles.push(...arr);
                    }
                }
            }
            // Para .single()
            if (req.file && names.includes(req.file.fieldname)) {
                collectedFiles.push(req.file);
            }

            const results = [];
            for (const f of collectedFiles) {
                const saved = await saveOne(f);
                if (saved) results.push(saved);
            }

            if (setUrl) {
                // Expõe URLs amigáveis para controllers usarem na persistência no modelo
                if (results.length === 1) {
                    req.fileDb = results[0]; // Objeto completo salvo no DB
                    // A URL mais recomendada, por ID numérico
                    req.fileUrl = `/db-image/id/${results[0].id}`;
                    // URL alternativa por filename, para compatibilidade ou legibilidade (menos eficiente)
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
};
