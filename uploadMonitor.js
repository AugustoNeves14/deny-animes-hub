/**
 * @file uploadMonitor.js
 * @description Monitor de uploads em tempo real via WebSocket.
 *              Integra diretamente com o app.js e o banco Neon.
 */

const WebSocket = require('ws');
const { Pool } = require("pg");
require('dotenv').config();

const DB_URL = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_6hImLi9pNDCM@ep-green-poetry-advyipjs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require";
const pool = new Pool({ connectionString: DB_URL, max: 10, idleTimeoutMillis: 30000 });

let wss;

/**
 * Inicializa o servidor WebSocket
 * @param {Object} server - Instância do servidor HTTP/Express
 */
const initWebSocket = (server) => {
    wss = new WebSocket.Server({ server });
    console.log("🟢 WebSocket de monitoramento de uploads iniciado.");

    wss.on('connection', (ws) => {
        console.log("💬 Cliente conectado ao monitor de uploads.");
        ws.send(JSON.stringify({ message: "Conectado ao monitor de uploads em tempo real." }));
    });
};

/**
 * Envia mensagem para todos os clientes conectados
 * @param {Object} data
 */
const broadcast = (data) => {
    if (!wss) return;
    const msg = JSON.stringify(data);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    });
};

/**
 * Função que deve ser chamada sempre que um upload é feito
 * @param {Object} file - Objeto retornado pelo multer
 * @param {Object} req - Requisição Express (para pegar hostname/dominio)
 */
const notifyUpload = async (file, req) => {
    try {
        // Conecta ao banco e salva a imagem
        const client = await pool.connect();
        const insertQuery = `
            INSERT INTO stored_images (filename, mimetype, sha1, data)
            VALUES ($1, $2, $3, $4)
            RETURNING id, created_at
        `;
        const { rows } = await client.query(insertQuery, [
            file.originalname,
            file.mimetype,
            file.sha1 || require('crypto').createHash('sha1').update(file.buffer).digest('hex'),
            file.buffer
        ]);

        const inserted = rows[0];
        client.release();

        // Define o host atual (localhost ou Render)
        const host = req.get('host'); // Ex: localhost:3000 ou app.onrender.com
        const protocol = req.protocol;
        const baseURL = `${protocol}://${host}`;

        const fileInfo = {
            id: inserted.id,
            filename: file.originalname,
            mimetype: file.mimetype,
            sha1: file.sha1,
            created_at: inserted.created_at,
            table: 'stored_images',
            urls: {
                byId: `${baseURL}/db-image/id/${inserted.id}`,
                byFilename: `${baseURL}/db-image/file/${encodeURIComponent(file.originalname)}`
            }
        };

        console.log("📌 NOVO UPLOAD REGISTRADO:", fileInfo);
        broadcast({ type: 'upload', data: fileInfo });

        return fileInfo;

    } catch (err) {
        console.error("❌ Erro ao registrar upload:", err);
        throw err;
    }
};

module.exports = { initWebSocket, notifyUpload };
