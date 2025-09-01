// utils/imageDbHandler.js
const { Client } = require("pg");
const crypto = require("crypto");

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  console.error("ERRO: Variável de ambiente DATABASE_URL não definida em imageDbHandler.js");
  // Saída ou tratamento de erro mais robusto para um ambiente de produção
  process.exit(1);
}

/**
 * Salva um buffer de imagem no banco de dados.
 * @param {Buffer} imageBuffer - O buffer de dados da imagem.
 * @param {string} mimetype - O tipo MIME da imagem (ex: "image/jpeg").
 * @param {string} originalname - O nome original do arquivo.
 * @returns {Promise<number>} O ID da imagem salva no banco de dados.
 */
async function saveImageToDb(imageBuffer, mimetype, originalname) {
  const client = new Client({ connectionString: DB_URL });
  await client.connect();

  try {
    // Calcular SHA1 para evitar duplicatas e como um ID de conteúdo
    const sha1 = crypto.createHash("sha1").update(imageBuffer).digest("hex");

    // Tentar inserir. Se já existir (conflito no SHA1), retorna o ID existente.
    // Isso é útil para uploads de imagens idênticas.
    const insertQuery = `
      INSERT INTO stored_images (filename, mimetype, sha1, data)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (sha1) DO UPDATE SET
        filename = EXCLUDED.filename,
        mimetype = EXCLUDED.mimetype,
        created_at = NOW() -- Atualiza a data se houver conflito
      RETURNING id;
    `;
    const result = await client.query(insertQuery, [originalname, mimetype, sha1, imageBuffer]);

    return result.rows[0].id; // Retorna o ID da imagem salva ou existente
  } catch (error) {
    console.error("Falha ao salvar imagem no banco de dados:", error);
    throw new Error("Não foi possível salvar a imagem.");
  } finally {
    await client.end();
  }
}

/**
 * Exclui uma imagem do banco de dados pelo seu ID.
 * @param {number} imageId - O ID da imagem a ser excluída.
 * @returns {Promise<boolean>} True se a imagem foi excluída, false caso contrário.
 */
async function deleteImageFromDb(imageId) {
  if (!imageId) {
    console.warn("Tentativa de excluir imagem com ID nulo/indefinido.");
    return false;
  }

  const client = new Client({ connectionString: DB_URL });
  await client.connect();

  try {
    const deleteQuery = "DELETE FROM stored_images WHERE id = $1 RETURNING id;";
    const result = await client.query(deleteQuery, [imageId]);
    return result.rowCount > 0;
  } catch (error) {
    console.error(`Falha ao excluir imagem do banco de dados (ID: ${imageId}):`, error);
    throw new Error("Não foi possível excluir a imagem.");
  } finally {
    await client.end();
  }
}

module.exports = {
  saveImageToDb,
  deleteImageFromDb,
};