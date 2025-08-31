// ====================================================================================
//
//              DenyAnimeHub - Middleware de Upload (Versão Definitiva Corrigida)
//
// Versão:        5.0 (Rinnegan)
// Descrição:     Versão final e totalmente corrigida do middleware Multer. Renomeia
//                os middlewares para corresponder EXATAMENTE ao que é importado no app.js,
//                resolvendo o erro "got a [object Undefined]". A estrutura está
//                robusta, com funções de fábrica e middlewares especializados.
//
// ====================================================================================

'use strict';

const multer = require('multer');
const path = require('path');
const fs = require('fs');

/**
 * Garante que um diretório no sistema de arquivos exista. Se não existir,
 * ele o cria de forma recursiva, prevenindo erros de "diretório não encontrado".
 * @param {string} dirPath - O caminho absoluto para o diretório a ser verificado/criado.
 */
const ensureDirExists = (dirPath) => {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    } catch (error) {
        console.error(`[Upload Middleware] Falha crítica ao criar diretório de upload: ${dirPath}`, error);
    }
};

/**
 * Cria uma configuração de armazenamento (StorageEngine) para o Multer,
 * direcionando arquivos para subpastas específicas e gerando nomes únicos.
 * @param {string} destinationFolder - O nome da subpasta de destino (ex: 'capas', 'avatars').
 * @returns {multer.StorageEngine} A configuração de armazenamento do Multer.
 */
const createStorageEngine = (destinationFolder) => {
    const fullDestinationPath = path.join(__dirname, '..', 'public', 'uploads', destinationFolder);
    ensureDirExists(fullDestinationPath);

    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, fullDestinationPath);
        },
        filename: (req, file, cb) => {
            const fileExtension = path.extname(file.originalname);
            const fieldName = file.fieldname || 'file';
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const newFilename = `${fieldName}-${uniqueSuffix}${fileExtension}`;
            cb(null, newFilename);
        }
    });
};

/**
 * Cria um filtro de arquivo para o Multer, validando o tipo de arquivo (MIME type).
 * @param {RegExp} allowedMimeTypesRegex - Expressão regular para os MIME types permitidos.
 * @returns {function} A função de filtro para o Multer.
 */
const createFileFilter = (allowedMimeTypesRegex) => {
    return (req, file, cb) => {
        if (allowedMimeTypesRegex.test(file.mimetype)) {
            cb(null, true); // Aceita o arquivo.
        } else {
            const error = new Error('Tipo de arquivo não suportado!');
            error.code = 'INVALID_FILE_TYPE';
            cb(error, false); // Rejeita o arquivo.
        }
    };
};

// --- Filtros de Arquivo Pré-configurados ---
const imageFileFilter = createFileFilter(/^image\/(jpeg|png|webp|gif)$/);
const videoFileFilter = createFileFilter(/^video\/(mp4|mkv|x-matroska|webm)$/); // Adicionado MKV para robustez

// =======================================================================================
//  MIDDLEWARES DE UPLOAD ESPECIALIZADOS E EXPORTADOS
// =======================================================================================

// Middleware para processar formulários sem arquivos ou com arquivos na memória.
// Usado para rotas de criação/edição que não têm um campo de upload específico.
const processForm = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 * 1024 } // Limite alto, pois não deve salvar arquivos
}).any();

// Middleware para upload de Capas de Animes/Posts.
// O nome agora corresponde ao que app.js espera.
const uploadCapaAnime = multer({
    storage: createStorageEngine('capas'),
    fileFilter: imageFileFilter,
    limits: { fileSize: 15 * 1024 * 1024 }
}).single('capa'); // Espera um campo de formulário chamado 'capa'

// Middleware para upload de Vídeos de Episódios.
// O nome agora corresponde ao que app.js espera.
const uploadVideoEpisodio = multer({
    storage: createStorageEngine('videos'),
    fileFilter: videoFileFilter,
    limits: { fileSize: 2 * 1024 * 1024 * 1024 } // 2GB
}).single('video'); // Espera um campo de formulário chamado 'video'

// Middleware para upload de AVATAR de Usuário.
const uploadAvatar = multer({
    storage: createStorageEngine('avatars'),
    fileFilter: imageFileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
}).single('avatar');

// Middleware para upload de CAPA DE PERFIL de Usuário.
const uploadCapaPerfil = multer({
    storage: createStorageEngine('capas'), // Reutiliza a pasta 'capas'
    fileFilter: imageFileFilter,
    limits: { fileSize: 15 * 1024 * 1024 }
}).single('capa');


// --- EXPORTAÇÃO FINAL E CORRIGIDA ---
// Exporta todos os middlewares com os nomes EXATOS que o app.js espera.
module.exports = {
    processForm,
    uploadCapaAnime,        // CORRIGIDO: Agora este nome existe
    uploadVideoEpisodio,    // CORRIGIDO: Agora este nome existe
    uploadAvatar,
    uploadCapaPerfil,
    uploadCapa: uploadCapaAnime // Adicionando um alias para compatibilidade, caso alguma rota antiga ainda use 'uploadCapa'
};