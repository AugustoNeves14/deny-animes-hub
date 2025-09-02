
/**
 * @file routes/dbImageRoute.js
 * @description Rota para servir imagens diretamente do Neon (BYTEA) com caching.
 *              Versão robusta e otimizada para performance.
 */
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const DB_URL = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_6hImLi9pNDCM@ep-green-poetry-advyipjs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require";
const pool = new Pool({ connectionString: DB_URL, max: 10, idleTimeoutMillis: 30000 });

// Garante que a tabela 'stored_images' exista na primeira conexão
(async () => {
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
        console.log("[dbImageRoute] Tabela 'stored_images' verificada/criada no Neon.");
    } catch (err) {
        console.error("[dbImageRoute] Erro ao garantir tabela stored_images:", err);
    } finally {
        client.release();
    }
})().catch(err => console.error("[dbImageRoute] Erro fatal na inicialização do pool:", err));

/**
 * @route GET /db-image/id/:id
 * @description Serve uma imagem a partir do seu ID numérico no banco de dados.
 *              Altamente recomendado para uso em templates EJS.
 * @param {string} req.params.id - O ID da imagem na tabela stored_images.
 */
router.get("/db-image/id/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id) || id <= 0) {
        return res.status(400).send("ID de imagem inválido.");
    }

    let client;
    try {
        client = await pool.connect();
        const { rows } = await client.query(
            "SELECT mimetype, data, sha1 FROM stored_images WHERE id = $1",
            [id]
        );

        if (!rows.length) {
            return res.status(404).send("Imagem não encontrada.");
        }

        const img = rows[0];
        res.setHeader("Content-Type", img.mimetype);
        res.setHeader("ETag", `"${img.sha1}"`); // ETag para cache do navegador
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable"); // Cache de 1 ano

        // Envia o buffer binário da imagem
        res.send(img.data);
    } catch (e) {
        console.error(`[dbImageRoute] Erro ao buscar imagem por ID ${id}:`, e);
        res.status(500).send("Erro interno ao buscar imagem.");
    } finally {
        if (client) client.release();
    }
});

/**
 * @route GET /db-image/file/:filename
 * @description Serve uma imagem a partir do seu nome de arquivo original no banco de dados.
 *              Menos performático que buscar por ID, mas útil para compatibilidade.
 * @param {string} req.params.filename - O nome original do arquivo de imagem.
 */
router.get("/db-image/file/:filename", async (req, res) => {
    const filename = req.params.filename;
    if (!filename) {
        return res.status(400).send("Nome de arquivo inválido.");
    }

    let client;
    try {
        client = await pool.connect();
        const { rows } = await client.query(
            "SELECT mimetype, data, sha1 FROM stored_images WHERE filename = $1",
            [filename]
        );

        if (!rows.length) {
            return res.status(404).send("Imagem não encontrada.");
        }

        const img = rows[0];
        res.setHeader("Content-Type", img.mimetype);
        res.setHeader("ETag", `"${img.sha1}"`);
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

        res.send(img.data);
    } catch (e) {
        console.error(`[dbImageRoute] Erro ao buscar imagem por filename '${filename}':`, e);
        res.status(500).send("Erro interno ao buscar imagem.");
    } finally {
        if (client) client.release();
    }
});

module.exports = router;
