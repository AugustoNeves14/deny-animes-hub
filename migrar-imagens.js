/**
 * @file migrar-imagens.js
 * @description Script definitivo para migrar todas as imagens do disco para o banco de dados Neon.
 * Assegura que o site funcione 100% em ambientes de hospedagem sem persistência de disco, como o Render.
 */

"use strict";

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const crypto = require('crypto');
const mime = require('mime-types');

// --- Configurações (Ajuste se necessário) ---
const UPLOAD_DIR_ANIME = path.join(__dirname, 'public', 'uploads', 'capas');
const UPLOAD_DIR_AVATAR = path.join(__dirname, 'public', 'uploads', 'avatares');
const UPLOAD_DIR_CAPA_PERFIL = path.join(__dirname, 'public', 'uploads', 'capas-perfil');

// URL de conexão com o banco Neon
const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  console.error('❌ ERRO: A variável de ambiente DATABASE_URL não está configurada. Abortando.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: DB_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  ssl: { rejectUnauthorized: false }
});

// ========================================
// Funções Principais
// ========================================

/**
 * Salva uma imagem do disco no banco de dados, se ela não existir.
 * @param {string} filePath - Caminho completo do arquivo no disco.
 * @returns {Promise<number|null>} O ID da imagem salva ou existente, ou null em caso de falha.
 */
async function saveImageToDb(filePath) {
  const filename = path.basename(filePath);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Aviso: Arquivo não encontrado - ${filePath}`);
    return null;
  }

  const data = fs.readFileSync(filePath);
  const sha1 = crypto.createHash('sha1').update(data).digest('hex');
  const mimetype = mime.lookup(filename) || 'application/octet-stream';

  const client = await pool.connect();
  try {
    const checkResult = await client.query('SELECT id FROM stored_images WHERE sha1 = $1', [sha1]);
    if (checkResult.rows.length > 0) {
      console.log(`ℹ️ Imagem '${filename}' já existe no banco. ID: ${checkResult.rows[0].id}`);
      return checkResult.rows[0].id;
    }

    const insertResult = await client.query(
      'INSERT INTO stored_images (filename, mimetype, sha1, data) VALUES ($1, $2, $3, $4) RETURNING id',
      [filename, mimetype, sha1, data]
    );
    console.log(`✅ Migrado: '${filename}' (ID: ${insertResult.rows[0].id})`);
    return insertResult.rows[0].id;
  } catch (error) {
    console.error(`❌ Erro ao processar '${filename}':`, error.message);
    return null;
  } finally {
    client.release();
  }
}

/**
 * Atualiza o campo de URL de imagem nos modelos do banco de dados principal.
 * @param {string} table - Nome da tabela.
 * @param {string} columnName - Nome da coluna a ser atualizada.
 * @param {string} oldPath - Parte do caminho antigo a ser procurado.
 * @param {number} newId - O ID da nova imagem no banco.
 * @returns {Promise<void>}
 */
async function updateModel(table, columnName, oldPath, newId) {
  const newUrl = `/db-image/id/${newId}`;
  const client = await pool.connect();
  try {
    // Usando LIKE para encontrar caminhos que correspondem ao nome do arquivo
    const result = await client.query(
      `UPDATE ${table} SET "${columnName}" = $1 WHERE "${columnName}" LIKE $2 RETURNING id`,
      [newUrl, `%${oldPath}%`]
    );
    if (result.rowCount > 0) {
      console.log(`✅ Atualizada ${result.rowCount} linha(s) em '${table}' para a imagem com ID ${newId}`);
    } else {
      console.log(`ℹ️ Nenhuma linha encontrada em '${table}' para a imagem com nome '${oldPath}'.`);
    }
  } catch (error) {
    console.error(`❌ Erro ao atualizar tabela '${table}':`, error.message);
  } finally {
    client.release();
  }
}

/**
 * Deleta o arquivo do disco local.
 * @param {string} filePath - Caminho completo do arquivo.
 */
function deleteLocalFile(filePath) {
  try {
    fs.unlinkSync(filePath);
    console.log(`🗑️ Excluído do disco: '${filePath}'`);
  } catch (err) {
    console.error(`❌ Erro ao excluir arquivo '${filePath}':`, err.message);
  }
}

/**
 * Executa o processo de migração para um diretório e tabela específicos.
 * @param {string} dirPath - O caminho do diretório a ser varrido.
 * @param {string} table - O nome da tabela do banco de dados.
 * @param {string} columnName - O nome da coluna do banco que armazena a URL.
 */
async function processDirectory(dirPath, table, columnName) {
  if (!fs.existsSync(dirPath)) {
    console.log(`\nℹ️ Diretório '${dirPath}' não encontrado. Pulando.`);
    return;
  }
  console.log(`\n--- Processando diretório: ${dirPath} ---`);
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.gif') || f.endsWith('.webp'));

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const imageId = await saveImageToDb(filePath);
    if (imageId) {
      await updateModel(table, columnName, file, imageId);
      deleteLocalFile(filePath);
    }
  }
}

// ========================================
// Função Principal
// ========================================

async function runMigration() {
  console.log('🚀 Iniciando o processo de migração de imagens...');

  try {
    await pool.connect();
    console.log('✅ Conexão com o banco de dados Neon estabelecida.');
  } catch (err) {
    console.error('❌ Falha na conexão com o banco de dados:', err);
    process.exit(1);
  }

  // Sequência de migração
  await processDirectory(UPLOAD_DIR_ANIME, 'animes', 'capa');
  await processDirectory(UPLOAD_DIR_AVATAR, 'users', 'avatar');
  await processDirectory(UPLOAD_DIR_CAPA_PERFIL, 'users', 'capa_perfil');

  console.log('\n🎉 Processo de migração concluído! Todas as imagens foram movidas e as referências atualizadas.');
  console.log('O seu site agora está pronto para rodar no Render sem problemas de arquivos.');

  await pool.end();
}

runMigration();