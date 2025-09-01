// ====================================================================================
//
//                     SERVER.JS - VERSÃO FINAL COMPLETA (UPLOAD + DB)
//
// ====================================================================================

import express from "express";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import db from "./models/index.js"; // Sequelize models (db.Post, db.Anime, etc.)
import app from "./app.js"; // Rotas do sistema

// ====================================================================
// CONFIGURAÇÕES DE DIRETÓRIO
// ====================================================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretório onde as imagens serão armazenadas fisicamente
const uploadDir = path.join(__dirname, "uploads");

// ====================================================================
// CONFIGURAÇÃO DO MULTER (UPLOAD DE IMAGENS)
// ====================================================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Nome único para cada arquivo
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});

const upload = multer({ storage });

// ====================================================================
// CRIAÇÃO DO SERVIDOR EXPRESS
// ====================================================================
const server = express();

// Middleware padrão
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Torna as imagens acessíveis publicamente
server.use("/uploads", express.static(uploadDir));

// ====================================================================
// ROTAS DE UPLOAD (com salvamento no DB)
// ====================================================================

// Upload vinculado a tabela "Post"
server.post("/upload/post", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imagePath = `/uploads/${req.file.filename}`;

    // Salva no banco de dados
    const newPost = await db.Post.create({
      title,
      description,
      imageUrl: imagePath,
    });

    res.status(201).json({
      message: "Upload concluído e salvo em Posts!",
      post: newPost,
    });
  } catch (error) {
    console.error("Erro no upload (Post):", error);
    res.status(500).json({ error: "Falha ao salvar no banco (Post)" });
  }
});

// Upload vinculado a tabela "Anime"
server.post("/upload/anime", upload.single("image"), async (req, res) => {
  try {
    const { name, genre } = req.body;
    const imagePath = `/uploads/${req.file.filename}`;

    // Salva no banco de dados
    const newAnime = await db.Anime.create({
      name,
      genre,
      imageUrl: imagePath,
    });

    res.status(201).json({
      message: "Upload concluído e salvo em Animes!",
      anime: newAnime,
    });
  } catch (error) {
    console.error("Erro no upload (Anime):", error);
    res.status(500).json({ error: "Falha ao salvar no banco (Anime)" });
  }
});

// ====================================================================
// INTEGRA O APP.JS (rotas adicionais)
// ====================================================================
server.use("/", app);

// ====================================================================
// START DO SERVIDOR
// ====================================================================
const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server rodando na porta ${PORT}`);
    console.log(`📂 Uploads servidos em http://localhost:${PORT}/uploads/`);
  });
});
