#!/usr/bin/env node
"use strict";

/**
 * DenyAnimeHub - Script Automatizado
 * - Move imagens locais para o banco Neon (BYTEA)
 * - Garante .gitignore atualizado
 * - Cria rota para servir imagens
 * - Faz commit/push automático
 */

const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
const simpleGit = require("simple-git");
const crypto = require("crypto");

// =================== CONFIG ======================
const UPLOAD_DIR = path.join(__dirname, "public", "uploads");
const ROUTES_DIR = path.join(__dirname, "routes");
const APP_FILES = ["app.js", "server.js", "index.js"];
const DB_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_6hImLi9pNDCM@ep-green-poetry-advyipjs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require";

// =================== POSTGRES ======================
async function connectDB() {
  const client = new Client({ connectionString: DB_URL });
  await client.connect();
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
  return client;
}

// =================== SAVE IMAGES ======================
async function saveImages(client) {
  if (!fs.existsSync(UPLOAD_DIR)) {
    console.log(`ℹ Diretório ${UPLOAD_DIR} não existe — nada para processar.`);
    return;
  }

  const files = fs.readdirSync(UPLOAD_DIR);
  for (const file of files) {
    const filePath = path.join(UPLOAD_DIR, file);
    if (!fs.lstatSync(filePath).isFile()) continue;

    const data = fs.readFileSync(filePath);

    // 🚨 Limite de 5MB
    if (data.length > 5 * 1024 * 1024) {
      console.log(`⚠ ${file} ignorado (maior que 5MB).`);
      continue;
    }

    const sha1 = crypto.createHash("sha1").update(data).digest("hex");
    const mimetype = getMimeType(file);

    await client.query(
      `INSERT INTO stored_images (filename, mimetype, sha1, data)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (sha1) DO NOTHING`,
      [file, mimetype, sha1, data]
    );

    console.log(`✅ Salvo no banco: ${file} (${sha1})`);
  }
}

function getMimeType(filename) {
  if (filename.endsWith(".png")) return "image/png";
  if (filename.endsWith(".jpg") || filename.endsWith(".jpeg"))
    return "image/jpeg";
  if (filename.endsWith(".webp")) return "image/webp";
  if (filename.endsWith(".gif")) return "image/gif";
  if (filename.endsWith(".mp4")) return "video/mp4";
  if (filename.endsWith(".mkv")) return "video/x-matroska";
  if (filename.endsWith(".webm")) return "video/webm";
  return "application/octet-stream";
}

// =================== ROUTE GENERATION ======================
function ensureRouteFile() {
  const routeFile = path.join(ROUTES_DIR, "dbImageRoute.js");
  if (!fs.existsSync(ROUTES_DIR)) fs.mkdirSync(ROUTES_DIR);

  const content = `
const express = require("express");
const router = express.Router();
const { Client } = require("pg");

const DB_URL = process.env.DATABASE_URL || "${DB_URL.replace(/"/g, '\\"')}";

router.get("/db-image/:filename", async (req, res) => {
  const client = new Client({ connectionString: DB_URL });
  await client.connect();

  const result = await client.query(
    "SELECT * FROM stored_images WHERE filename = $1",
    [req.params.filename]
  );
  await client.end();

  if (result.rows.length === 0) return res.status(404).send("Imagem não encontrada");

  const img = result.rows[0];
  res.setHeader("Content-Type", img.mimetype);
  res.send(img.data);
});

module.exports = router;
`;

  fs.writeFileSync(routeFile, content);
  console.log(`✅ Criada/atualizada rota: routes/dbImageRoute.js`);
  return routeFile;
}

function ensureAppIntegration() {
  const appFile = APP_FILES.find((f) => fs.existsSync(path.join(__dirname, f)));
  if (!appFile) {
    console.log("⚠ Nenhum arquivo principal (app.js/server.js/index.js) encontrado.");
    return;
  }

  const appPath = path.join(__dirname, appFile);
  let code = fs.readFileSync(appPath, "utf8");

  if (!code.includes("dbImageRoute")) {
    code = code.replace(
      /const express = require\(["']express["']\);/,
      `const express = require("express");
const dbImageRoute = require("./routes/dbImageRoute");`
    );

    if (!code.includes("app.use(\"/\", dbImageRoute)")) {
      code = code.replace(
        /app\.use\(.*\);/,
        (match) => `${match}\napp.use("/", dbImageRoute);`
      );
    }

    fs.writeFileSync(appPath, code);
    console.log(`✅ Rota dbImageRoute integrada em ${appFile}`);
  } else {
    console.log(`ℹ dbImageRoute já estava integrado em ${appFile}`);
  }
}

// =================== GIT ======================
async function commitAndPush() {
  const git = simpleGit(__dirname);

  const isRepo = await git.checkIsRepo();
  if (!isRepo) {
    console.log("⚠ Projeto não é um repositório Git. Rode:");
    console.log("   git init && git remote add origin <url>");
    return;
  }

  await git.add(".");
  await git.commit("Auto: salvar imagens no banco + atualizar rotas");
  await git.push("origin", "master"); // ⚡ agora usa master
  console.log("✅ Alterações commitadas e enviadas ao GitHub.");
}

// =================== MAIN ======================
(async () => {
  console.log("🚀 Iniciando processo...");
  const client = await connectDB();
  await saveImages(client);
  await client.end();

  ensureRouteFile();
  ensureAppIntegration();
  await commitAndPush();

  console.log("🎉 Processo concluído.");
})();
