
const express = require("express");
const router = express.Router();
const { Client } = require("pg");

const DB_URL = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_6hImLi9pNDCM@ep-green-poetry-advyipjs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require";

router.get("/db-image/:filename", async (req, res) => {
  const client = new Client({ connectionString: DB_URL });
  await client.connect();

  try {
    const result = await client.query(
      "SELECT * FROM stored_images WHERE filename = $1",
      [req.params.filename]
    );
    if (result.rows.length === 0) {
      await client.end();
      return res.status(404).send("Imagem não encontrada");
    }

    const img = result.rows[0];
    res.setHeader("Content-Type", img.mimetype);
    res.send(img.data);
  } catch (err) {
    res.status(500).send("Erro ao buscar imagem");
  } finally {
    await client.end();
  }
});

module.exports = router;
