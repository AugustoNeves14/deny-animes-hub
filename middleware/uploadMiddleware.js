/**
 * @file middleware/uploadMiddleware.db.js
 * @description Versão "drop-in" do seu uploadMiddleware:
 *              - IMAGENS: memoryStorage + persistência no Neon (DB).
 *              - VÍDEOS: diskStorage como antes (para arquivos grandes).
 *              Exports compatíveis: processForm, uploadCapaAnime, uploadVideoEpisodio,
 *              uploadAvatar, uploadCapaPerfil, uploadCapa (alias).
 */
"use strict";
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { persistUpload } = require("./dbImageStore"); // Importa o novo middleware de persistência

// -------- Helpers e validadores --------
const ensureDir = (p) => {
    try {
        if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
    } catch(e){
        console.error(`[uploadMiddleware.db] Erro ao criar diretório '${p}':`, e);
    }
};

const imageFilter = (req, file, cb) => {
    if (/^image\/(jpeg|png|webp|gif)$/i.test(file.mimetype)) {
        cb(null, true);
    } else {
        const err = new Error(`Tipo de imagem não suportado: ${file.mimetype}`);
        err.code = "INVALID_FILE_TYPE";
        cb(err, false);
    }
};

const videoFilter = (req, file, cb) => {
    if (/^video\//i.test(file.mimetype)) {
        cb(null, true);
    } else {
        const err = new Error(`Tipo de vídeo não suportado: ${file.mimetype}`);
        err.code = "INVALID_FILE_TYPE";
        cb(err, false);
    }
};

// -------- Configurações de Storage para Multer --------
// IMAGENS -> processadas em memória (serão salvas no Neon pelo dbImageStore)
const memoryStorage = multer.memoryStorage();

// VÍDEOS -> mantidos em disco (comportamento anterior, para arquivos grandes)
const videoDestinationPath = path.join(__dirname, "..", "public", "uploads", "videos");
ensureDir(videoDestinationPath); // Garante que o diretório de vídeos exista

const diskStorageVideos = multer.diskStorage({
    destination: (req, file, cb) => cb(null, videoDestinationPath),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || "";
        const name = (file.fieldname || "video") + "-" + Date.now() + "-" + Math.round(Math.random()*1e9) + ext;
        cb(null, name);
    },
});

// -------- Middlewares base do Multer --------

/**
 * @name processForm
 * @description Middleware para processar formulários com ou sem arquivos.
 *              Arquivos são guardados em memória (para campos tipo text/number, etc).
 */
const processForm = multer({
    storage: memoryStorage, // Usa memória para tudo, incluindo arquivos pequenos
    limits: { fileSize: 20 * 1024 * 1024 }, // Limite de 20MB para arquivos em memória (para não estourar RAM)
}).any();

/**
 * @name _uploadCapaAnime (interno)
 * @description Processa o upload de uma única capa de anime/post em memória.
 */
const _uploadCapaAnime = multer({
    storage: memoryStorage,
    fileFilter: imageFilter,
    limits: { fileSize: 15 * 1024 * 1024 }, // Até 15MB em memória para a capa
}).single("capa");

/**
 * @name _uploadAvatar (interno)
 * @description Processa o upload de um único avatar de usuário em memória.
 */
const _uploadAvatar = multer({
    storage: memoryStorage,
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Até 5MB em memória para o avatar
}).single("avatar");

/**
 * @name _uploadCapaPerfil (interno)
 * @description Processa o upload de uma única capa de perfil de usuário em memória.
 */
const _uploadCapaPerfil = multer({
    storage: memoryStorage,
    fileFilter: imageFilter,
    limits: { fileSize: 15 * 1024 * 1024 }, // Até 15MB em memória para a capa de perfil
}).single("capa");

/**
 * @name uploadVideoEpisodio
 * @description Processa o upload de um único vídeo de episódio em disco.
 */
const uploadVideoEpisodio = multer({
    storage: diskStorageVideos,
    fileFilter: videoFilter,
    limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // Até 2GB para vídeos
}).single("video");

// -------- Composição de Middlewares: Upload Multer -> Persistência no Neon --------
// Esses são os middlewares que seus controllers realmente usarão.
// Eles primeiro fazem o upload para a memória (Multer) e, em seguida,
// o `persistUpload` salva o buffer no Neon e adiciona `req.fileUrl` ao request.

/**
 * @name uploadCapaAnime
 * @description Middleware completo para upload e persistência de capa de anime/post no Neon.
 */
const uploadCapaAnime = [
    _uploadCapaAnime,
    persistUpload("capa", { setUrlOnReq: true }),
];

/**
 * @name uploadAvatar
 * @description Middleware completo para upload e persistência de avatar de usuário no Neon.
 */
const uploadAvatar = [
    _uploadAvatar,
    persistUpload("avatar", { setUrlOnReq: true }),
];

/**
 * @name uploadCapaPerfil
 * @description Middleware completo para upload e persistência de capa de perfil de usuário no Neon.
 */
const uploadCapaPerfil = [
    _uploadCapaPerfil,
    persistUpload("capa", { setUrlOnReq: true }),
];

// Alias para compatibilidade com rotas antigas, se houver
const uploadCapa = uploadCapaAnime;

// -------- Exportação Final --------
module.exports = {
    processForm,          // Para processar formulários gerais
    uploadCapaAnime,      // Capas de anime/post
    uploadVideoEpisodio,  // Vídeos de episódios (disco)
    uploadAvatar,         // Avatar de usuário
    uploadCapaPerfil,     // Capas de perfil
    uploadCapa,           // Alias para uploadCapaAnime
};
