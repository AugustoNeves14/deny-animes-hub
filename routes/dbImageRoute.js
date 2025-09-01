// routes/dbImageRoute.js
const express = require("express");
const router = express.Router();
const { Client } = require("pg");

// O DB_URL deve vir do ambiente, especialmente no Render.
// Certifique-se de que process.env.DATABASE_URL esteja configurado corretamente no Render.
const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  console.error("ERRO: Variável de ambiente DATABASE_URL não definida em dbImageRoute.js");
}

/**
 * Rota para servir imagens BINÁRIAS armazenadas no banco de dados.
 * A imagem será identificada pelo seu ID único no banco.
 * Ex: /api/images/:id
 */
router.get("/api/images/:id", async (req, res) => {
  const imageId = req.params.id;
  if (!imageId) {
    return res.status(400).send("ID da imagem é obrigatório.");
  }

  const client = new Client({ connectionString: DB_URL });
  try {
    await client.connect();
    const result = await client.query(
      "SELECT data, mimetype FROM stored_images WHERE id = $1",
      [imageId]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Imagem não encontrada.");
    }

    const img = result.rows[0];
    res.setHeader("Content-Type", img.mimetype);
    res.send(img.data);

  } catch (err) {
    console.error(`Erro ao buscar imagem do banco (ID: ${imageId}):`, err);
    res.status(500).send("Erro interno ao buscar imagem.");
  } finally {
    await client.end();
  }
});

module.exports = router;