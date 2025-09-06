"use strict";
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { persistUpload } = require("./dbImageStore"); // Importa o middleware de persistência

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
const memoryStorage = multer.memoryStorage();

const videoDestinationPath = path.join(__dirname, "..", "public", "uploads", "videos");
ensureDir(videoDestinationPath);

const diskStorageVideos = multer.diskStorage({
    destination: (req, file, cb) => cb(null, videoDestinationPath),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || "";
        const name = (file.fieldname || "video") + "-" + Date.now() + "-" + Math.round(Math.random()*1e9) + ext;
        cb(null, name);
    },
});

// -------- Middlewares base do Multer --------
const processForm = multer({
    storage: memoryStorage,
    limits: { fileSize: 20 * 1024 * 1024 },
}).any();

const _uploadCapaAnime = multer({
    storage: memoryStorage,
    fileFilter: imageFilter,
    limits: { fileSize: 15 * 1024 * 1024 },
}).single("capa");

const _uploadAvatar = multer({
    storage: memoryStorage,
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
}).single("avatar");

const _uploadCapaPerfil = multer({
    storage: memoryStorage,
    fileFilter: imageFilter,
    limits: { fileSize: 15 * 1024 * 1024 },
}).single("capa");

const uploadVideoEpisodio = multer({
    storage: diskStorageVideos,
    fileFilter: videoFilter,
    limits: { fileSize: 2 * 1024 * 1024 * 1024 },
}).single("video");

// -------- Composição de Middlewares: Upload -> Persistência --------
const uploadCapaAnime = [
    _uploadCapaAnime,
    persistUpload("capa", { setUrlOnReq: true }),
];

const uploadAvatar = [
    _uploadAvatar,
    persistUpload("avatar", { setUrlOnReq: true }),
];

const uploadCapaPerfil = [
    _uploadCapaPerfil,
    persistUpload("capa", { setUrlOnReq: true }),
];

const uploadCapa = uploadCapaAnime;

// -------- Exportação Final --------
module.exports = {
    processForm,
    uploadCapaAnime,
    uploadVideoEpisodio,
    uploadAvatar,
    uploadCapaPerfil,
    uploadCapa,
};
