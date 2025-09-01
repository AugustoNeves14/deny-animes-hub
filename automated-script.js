#!/usr/bin/env node
"use strict";

/**
 * DenyAnimeHub - Script de Migração de Imagens Existentes para o Banco Neon (FINAL)
 * - Move imagens existentes do diretório 'public/uploads' para o banco Neon (BYTEA)
 * - Ignora vídeos (que continuarão no disco)
 * - Exclui imagens do disco APÓS migração bem-sucedida (opcional, mas recomendado para Render)
 * - Garante .gitignore atualizado
 */

const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
const simpleGit = require("simple-git");
const crypto = require("crypto");
const mime = require('mime-types'); // Para um mimetype mais robusto

// =================== CONFIG ======================
const UPLOAD_DIR_IMAGES = path.join(__dirname, "public", "uploads", "capas"); // Apenas imagens
const UPLOAD_DIR_AVATARS = path.join(__dirname, "public", "uploads", "avatars"); // Apenas avatares
const GITIGNORE_PATH = path.join(__dirname, ".gitignore");
const DB_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_6hImLi9pNDCM@ep-green-poetry-advyipjs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require";

// =================== POSTGRES ======================
async function connectDB() {
  const client = new Client({ connectionString: DB_URL });
  await client.connect();
  // Cria a tabela se não existir
  await client.query(`
    CREATE TABLE IF NOT EXISTS stored_images (
      id SERIAL PRIMARY KEY,
      filename TEXT NOT NULL,
      mimetype TEXT NOT NULL,
      sha1 TEXT UNIQUE NOT NULL, -- Garante que a mesma imagem não seja salva duas vezes
      data BYTEA NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log('✅ Conectado ao banco de dados e tabela `stored_images` verificada.');
  return client;
}

// =================== SAVE IMAGES ======================
async function saveImagesFromDisk(client, directory) {
  if (!fs.existsSync(directory)) {
    console.log(`ℹ Diretório ${directory} não existe — nada para migrar.`);
    return;
  }

  const files = fs.readdirSync(directory);
  let migratedCount = 0;

  for (const file of files) {
    const filePath = path.join(directory, file);
    if (!fs.lstatSync(filePath).isFile()) continue;

    // Ignorar arquivos de vídeo nesta migração de "imagens"
    if (file.endsWith(".mp4") || file.endsWith(".mkv") || file.endsWith(".webm")) {
      console.log(`ℹ ${file} ignorado (arquivo de vídeo).`);
      continue;
    }

    const data = fs.readFileSync(filePath);

    // Limite de 15MB para imagens. Vídeos são muito maiores e não devem vir para cá.
    if (data.length > 15 * 1024 * 1024) {
      console.log(`⚠ ${file} ignorado (maior que 15MB).`);
      continue;
    }

    const sha1 = crypto.createHash("sha1").update(data).digest("hex");
    const mimetype = mime.lookup(file) || "application/octet-stream"; // Usa mime-types para maior precisão

    try {
      // Verifica se a imagem já existe pelo SHA1
      const checkResult = await client.query(
        "SELECT id FROM stored_images WHERE sha1 = $1",
        [sha1]
      );

      let imageId;
      if (checkResult.rows.length > 0) {
        imageId = checkResult.rows[0].id;
        console.log(`ℹ ${file} já existe no banco (ID: ${imageId}).`);
      } else {
        // Insere a imagem
        const insertResult = await client.query(
          `INSERT INTO stored_images (filename, mimetype, sha1, data)
           VALUES ($1, $2, $3, $4) RETURNING id`,
          [file, mimetype, sha1, data]
        );
        imageId = insertResult.rows[0].id;
        console.log(`✅ Migrado para o banco: ${file} (ID: ${imageId})`);
        migratedCount++;
      }

      // Opcional: Depois de migrar, você pode excluir o arquivo local.
      // CUIDADO: Habilite esta linha SOMENTE quando tiver certeza que as imagens
      // estão no banco e seu front-end está puxando DO BANCO!
      // fs.unlinkSync(filePath);
      // console.log(`🗑 Excluído do disco: ${file}`);

      // ATUALIZAÇÃO DOS MODELOS (Exemplo - você precisará ajustar para o seu caso)
      // Esta é a parte mais complexa da migração de dados antigos.
      // Você precisará mapear os nomes de arquivo antigos para os novos IDs de imagem.
      // Exemplo:
      // await client.query(
      //   `UPDATE animes SET "capaImageId" = $1 WHERE "capaUrl" LIKE $2`,
      //   [imageId, `%${file}`]
      // );
      // await client.query(
      //   `UPDATE posts SET "capaImageId" = $1 WHERE "capaUrl" LIKE $2`,
      //   [imageId, `%${file}`]
      // );
      // await client.query(
      //   `UPDATE users SET "avatarImageId" = $1 WHERE "avatarUrl" LIKE $2`,
      //   [imageId, `%${file}`]
      // );
      // Adicione mais para outros modelos/campos que armazenavam caminhos de arquivo.

    } catch (err) {
      console.error(`❌ Erro ao processar ${file}:`, err.message);
    }
  }
  return migratedCount;
}

// =================== GITIGNORE ======================
function ensureGitignore() {
  const uploadsEntry = "/public/uploads/";
  let gitignoreContent = "";

  if (fs.existsSync(GITIGNORE_PATH)) {
    gitignoreContent = fs.readFileSync(GITIGNORE_PATH, "utf8");
  }

  if (!gitignoreContent.includes(uploadsEntry)) {
    gitignoreContent += `\n# Ignorar diretório de uploads local após migração para DB\n${uploadsEntry}\n`;
    fs.writeFileSync(GITIGNORE_PATH, gitignoreContent);
    console.log(`✅ Adicionado ${uploadsEntry} ao .gitignore.`);
  } else {
    console.log(`ℹ ${uploadsEntry} já está no .gitignore.`);
  }
}

// =================== MAIN ======================
(async () => {
  console.log("🚀 Iniciando processo de migração de imagens...");

  const client = await connectDB();
  let totalMigrated = 0;

  console.log("\n--- Migrando imagens de capas ---");
  totalMigrated += await saveImagesFromDisk(client, UPLOAD_DIR_IMAGES);

  console.log("\n--- Migrando imagens de avatares ---");
  totalMigrated += await saveImagesFromDisk(client, UPLOAD_DIR_AVATARS);

  await client.end();
  console.log(`\n🎉 Processo de migração concluído. Total de ${totalMigrated} novas imagens migradas.`);

  ensureGitignore(); // Garante que public/uploads seja ignorado após a migração
  // Não faz mais sentido fazer commit/push automático aqui, pois a migração
  // pode ser um processo manual de uma vez. As mudanças de código serão commits normais.

  console.log("\nLembre-se de:");
  console.log("1. Executar 'npx sequelize db:migrate' se tiver migrações para os novos campos 'ImageId'.");
  console.log("2. Testar seus endpoints de upload e exibição de imagens.");
  console.log("3. Comitar e fazer push das mudanças de código (`app.js`, `middleware`, `utils`, `models`, `templates`).");
  console.log("4. Configurar `DATABASE_URL` no Render.");
})();