// ====================================================================================
//
//              DenyAnimeHub - Middleware de Upload (Versão Final Corrigida)
//
// Versão:        5.0 (Rinnegan - Full Stable)
// Descrição:     Middleware definitivo de upload com Multer. Corrige problemas
//                de nomes indefinidos, garante criação de diretórios e fornece
//                middlewares prontos para uso em app.js.
//
// ====================================================================================

"use strict";

const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * Garante que um diretório no sistema de arquivos exista. Se não existir,
 * ele o cria recursivamente, prevenindo erros de "diretório não encontrado".
 * @param {string} dirPath - Caminho absoluto do diretório.
 */
const ensureDirExists = (dirPath) => {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  } catch (error) {
    console.error(
      `[Upload Middleware] Falha ao criar diretório de upload: ${dirPath}`,
      error
    );
  }
};

/**
 * Cria uma configuração de armazenamento para o Multer,
 * direcionando arquivos para subpastas específicas e gerando nomes únicos.
 * @param {string} destinationFolder - Nome da subpasta (ex: "capas", "avatars").
 * @returns {multer.StorageEngine} - Configuração de storage do Multer.
 */
const createStorageEngine = (destinationFolder) => {
  const fullDestinationPath = path.join(
    __dirname,
    "..",
    "public",
    "uploads",
    destinationFolder
  );
  ensureDirExists(fullDestinationPath);

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, fullDestinationPath);
    },
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);
      const fieldName = file.fieldname || "file";
      const uniqueSuffix =
        Date.now() + "-" + Math.round(Math.random() * 1e9);
      const newFilename = `${fieldName}-${uniqueSuffix}${fileExtension}`;
      cb(null, newFilename);
    },
  });
};

/**
 * Cria um filtro de arquivo para validar o tipo (MIME type).
 * @param {RegExp} allowedMimeTypesRegex - Regex com os MIME types permitidos.
 * @returns {function} Filtro para o Multer.
 */
const createFileFilter = (allowedMimeTypesRegex) => {
  return (req, file, cb) => {
    if (allowedMimeTypesRegex.test(file.mimetype)) {
      cb(null, true); // Aceita o arquivo
    } else {
      const error = new Error("Tipo de arquivo não suportado!");
      error.code = "INVALID_FILE_TYPE";
      cb(error, false); // Rejeita o arquivo
    }
  };
};

// --- Filtros de Arquivo Pré-configurados ---
const imageFileFilter = createFileFilter(/^image\/(jpeg|png|webp|gif)$/);
const videoFileFilter = createFileFilter(
  /^video\/(mp4|mkv|x-matroska|webm)$/
);

// =======================================================================================
//  MIDDLEWARES DE UPLOAD ESPECIALIZADOS
// =======================================================================================

// Processa formulários SEM arquivos ou com arquivos em memória
const processForm = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // até 2GB em memória (apenas metadados)
}).any();

// Upload de Capa de Anime/Post
const uploadCapaAnime = multer({
  storage: createStorageEngine("capas"),
  fileFilter: imageFileFilter,
  limits: { fileSize: 15 * 1024 * 1024 }, // até 15MB
}).single("capa");

// Upload de Vídeos de Episódios
const uploadVideoEpisodio = multer({
  storage: createStorageEngine("videos"),
  fileFilter: videoFileFilter,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // até 2GB
}).single("video");

// Upload de Avatar de Usuário
const uploadAvatar = multer({
  storage: createStorageEngine("avatars"),
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // até 5MB
}).single("avatar");

// Upload de Capa de Perfil de Usuário
const uploadCapaPerfil = multer({
  storage: createStorageEngine("capas"),
  fileFilter: imageFileFilter,
  limits: { fileSize: 15 * 1024 * 1024 }, // até 15MB
}).single("capa");

// =======================================================================================
//  EXPORTAÇÃO FINAL
// =======================================================================================
module.exports = {
  processForm,
  uploadCapaAnime,
  uploadVideoEpisodio,
  uploadAvatar,
  uploadCapaPerfil,
  uploadCapa: uploadCapaAnime, // alias para compatibilidade com rotas antigas
};
