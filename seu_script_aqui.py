# -*- coding: utf-8 -*-
"""
DenyAnimeHub - Fixador de Uploads (Neon BYTEA) - FULL ROBUSTO

O que este script faz:
1.  **Gera dbImageRoute.js:** Rota `/db-image/...` que lê as imagens do Neon usando Pool do 'pg'
    e manda com Content-Type correto + ETag/Cache-Control.
2.  **Gera dbImageStore.js:** Middleware que persiste imagens de 'multer'
    diretamente no Neon (BYTEA).
3.  **Cria uploadMiddleware.db.js:** Uma versão "drop-in" do seu uploadMiddleware,
    compatível com seu app, que usa:
    - Imagens: memoryStorage + persistência no Neon.
    - Vídeos: diskStorage como já era (e o Render lida com eles no disco efêmero).
4.  **Patching no app.js (ou server.js/index.js):**
    - Troca `require('./middleware/uploadMiddleware')` -> `./middleware/uploadMiddleware.db`.
    - Garante `app.use("/", dbImageRoute)`.
    - Remove a rota `app.use('/uploads', express.static(...))` pois as imagens serão do DB.
5.  **Atualiza package.json:** Para adicionar "pg" em dependencies.
6.  **(Opcional) Importa imagens existentes:** Se `IMPORT_EXISTING_UPLOADS` for True,
    cria um script temporário Node.js para importar imagens <=5MB já existentes
    de `public/uploads` para o Neon.
7.  **Limpeza:** Remove o diretório `public/uploads` (após a migração, se ativada).

Como usar:
1.  Salve este arquivo na RAIZ do projeto (ao lado do seu app.js).
2.  Verifique a variável `IMPORT_EXISTING_UPLOADS` abaixo.
3.  Rode: `python seu_script_aqui.py`
4.  Depois: `npm install` (para garantir 'pg')
5.  Faça o deploy local/Render. Os uploads de IMAGEM já irão para o Neon.
6.  **Ajuste seus controllers** para usar `req.fileUrl` ou `req.fileDb.id`.
"""

from pathlib import Path
import os, json, re, base64, hashlib
import subprocess
import time

# -------------------------- CONFIG ---------------------------
PROJECT_ROOT = Path(__file__).resolve().parent
MIDDLEWARE_DIR = PROJECT_ROOT / "middleware"
ROUTES_DIR = PROJECT_ROOT / "routes"
PUBLIC_UPLOADS = PROJECT_ROOT / "public" / "uploads"
PACKAGE_JSON = PROJECT_ROOT / "package.json"
APP_CANDIDATES = ["app.js", "server.js", "index.js"]

# Sua URL de conexão com o banco de dados Neon
# Use o DATABASE_URL do ambiente se disponível, senão a string literal
DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "postgresql://neondb_owner:npg_6hImLi9pNDCM@ep-green-poetry-advyipjs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require",
)

IMPORT_EXISTING_UPLOADS = True  # migra imagens <=5MB de public/uploads
MAX_IMPORT_SIZE = 5 * 1024 * 1024  # 5MB para imagens a serem importadas

# ----------------------- JS TEMPLATES ------------------------
DB_IMAGE_ROUTE_JS = f"""
/**
 * @file routes/dbImageRoute.js
 * @description Rota para servir imagens diretamente do Neon (BYTEA) com caching.
 *              Versão robusta e otimizada para performance.
 */
const express = require("express");
const router = express.Router();
const {{ Pool }} = require("pg");
const DB_URL = process.env.DATABASE_URL || "{DATABASE_URL.replace('"', '\\"')}";
const pool = new Pool({{ connectionString: DB_URL, max: 10, idleTimeoutMillis: 30000 }});

// Garante que a tabela 'stored_images' exista na primeira conexão
(async () => {{
    const client = await pool.connect();
    try {{
        await client.query(`
            CREATE TABLE IF NOT EXISTS stored_images (
                id SERIAL PRIMARY KEY,
                filename TEXT NOT NULL,
                mimetype TEXT NOT NULL,
                sha1 TEXT UNIQUE NOT NULL,
                data BYTEA NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log("[dbImageRoute] Tabela 'stored_images' verificada/criada no Neon.");
    }} catch (err) {{
        console.error("[dbImageRoute] Erro ao garantir tabela stored_images:", err);
    }} finally {{
        client.release();
    }}
}})().catch(err => console.error("[dbImageRoute] Erro fatal na inicialização do pool:", err));

/**
 * @route GET /db-image/id/:id
 * @description Serve uma imagem a partir do seu ID numérico no banco de dados.
 *              Altamente recomendado para uso em templates EJS.
 * @param {{string}} req.params.id - O ID da imagem na tabela stored_images.
 */
router.get("/db-image/id/:id", async (req, res) => {{
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id) || id <= 0) {{
        return res.status(400).send("ID de imagem inválido.");
    }}

    let client;
    try {{
        client = await pool.connect();
        const {{ rows }} = await client.query(
            "SELECT mimetype, data, sha1 FROM stored_images WHERE id = $1",
            [id]
        );

        if (!rows.length) {{
            return res.status(404).send("Imagem não encontrada.");
        }}

        const img = rows[0];
        res.setHeader("Content-Type", img.mimetype);
        res.setHeader("ETag", `"${{img.sha1}}"`); // ETag para cache do navegador
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable"); // Cache de 1 ano

        // Envia o buffer binário da imagem
        res.send(img.data);
    }} catch (e) {{
        console.error(`[dbImageRoute] Erro ao buscar imagem por ID ${{id}}:`, e);
        res.status(500).send("Erro interno ao buscar imagem.");
    }} finally {{
        if (client) client.release();
    }}
}});

/**
 * @route GET /db-image/file/:filename
 * @description Serve uma imagem a partir do seu nome de arquivo original no banco de dados.
 *              Menos performático que buscar por ID, mas útil para compatibilidade.
 * @param {{string}} req.params.filename - O nome original do arquivo de imagem.
 */
router.get("/db-image/file/:filename", async (req, res) => {{
    const filename = req.params.filename;
    if (!filename) {{
        return res.status(400).send("Nome de arquivo inválido.");
    }}

    let client;
    try {{
        client = await pool.connect();
        const {{ rows }} = await client.query(
            "SELECT mimetype, data, sha1 FROM stored_images WHERE filename = $1",
            [filename]
        );

        if (!rows.length) {{
            return res.status(404).send("Imagem não encontrada.");
        }}

        const img = rows[0];
        res.setHeader("Content-Type", img.mimetype);
        res.setHeader("ETag", `"${{img.sha1}}"`);
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

        res.send(img.data);
    }} catch (e) {{
        console.error(`[dbImageRoute] Erro ao buscar imagem por filename '${{filename}}':`, e);
        res.status(500).send("Erro interno ao buscar imagem.");
    }} finally {{
        if (client) client.release();
    }}
}});

module.exports = router;
"""

DB_IMAGE_STORE_JS = f"""
/**
 * @file middleware/dbImageStore.js
 * @description Middleware para persistir uploads de IMAGEM diretamente no Neon (BYTEA).
 *              Usado em conjunto com Multer para processar arquivos em memória.
 */
"use strict";
const {{ Pool }} = require("pg");
const crypto = require("crypto");

const DB_URL = process.env.DATABASE_URL || "{DATABASE_URL.replace('"', '\\"')}";
const pool = new Pool({{ connectionString: DB_URL, max: 10, idleTimeoutMillis: 30000 }});

/**
 * Garante que a tabela 'stored_images' exista.
 */
async function ensureTable() {{
    const client = await pool.connect();
    try {{
        await client.query(`
            CREATE TABLE IF NOT EXISTS stored_images (
                id SERIAL PRIMARY KEY,
                filename TEXT NOT NULL,
                mimetype TEXT NOT NULL,
                sha1 TEXT UNIQUE NOT NULL,
                data BYTEA NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log("[dbImageStore] Tabela 'stored_images' verificada/criada.");
    }} catch (err) {{
        console.error("[dbImageStore] Erro ao garantir tabela stored_images:", err);
    }} finally {{
        client.release();
    }}
}}
ensureTable().catch(console.error);

/**
 * Salva um único arquivo (buffer) no banco de dados.
 * @param {{object}} file - Objeto de arquivo do Multer (com `buffer`, `originalname`, `mimetype`).
 * @returns {{object|null}} O registro salvo (id, filename, mimetype, sha1) ou null em caso de falha.
 */
async function saveOne(file) {{
    if (!file || !file.buffer) return null;

    const buf = file.buffer;
    const sha1 = crypto.createHash("sha1").update(buf).digest("hex");
    const client = await pool.connect();

    try {{
        // Tenta inserir; se houver conflito (sha1 já existe), atualiza o filename
        // e retorna os dados existentes. Isso evita duplicatas.
        const insert = `
            INSERT INTO stored_images (filename, mimetype, sha1, data)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (sha1) DO UPDATE SET filename = EXCLUDED.filename
            RETURNING id, filename, mimetype, sha1;
        `;
        const {{ rows }} = await client.query(insert, [
            file.originalname || file.fieldname,
            file.mimetype,
            sha1,
            buf,
        ]);
        return rows[0];
    }} catch (e) {{
        console.error(`[dbImageStore] Erro ao salvar arquivo '${{file.originalname}}' no Neon:`, e);
        return null;
    }} finally {{
        client.release();
    }}
}}

/**
 * Middleware que processa arquivos em memória (do Multer) e os persiste no Neon.
 * Adiciona `req.fileDb`, `req.fileUrl`, `req.filesDb`, `req.filesUrl` ao request.
 *
 * @param {{string|Array<string>}} fieldNames - O(s) nome(s) do(s) campo(s) de arquivo no formulário.
 * @param {{object}} [options] - Opções de configuração.
 * @param {{boolean}} [options.setUrlOnReq=true] - Define se URLs amigáveis (`req.fileUrl`) devem ser adicionadas ao request.
 * @returns {{function}} Middleware assíncrono.
 */
function persistUpload(fieldNames, options = {{}}) {{
    const names = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
    const setUrl = options.setUrlOnReq !== false; // default true

    return async function(req, res, next) {{
        try {{
            const collectedFiles = [];

            // Coleta arquivos de diferentes configurações do Multer (single, array, any)
            if (req.files) {{
                if (Array.isArray(req.files)) {{ // Multer .array() ou .any()
                    collectedFiles.push(...req.files.filter(f => names.includes(f.fieldname)));
                }} else {{ // Multer .fields() (por campo)
                    for (const n of names) {{
                        const arr = req.files[n];
                        if (Array.isArray(arr)) collectedFiles.push(...arr);
                    }}
                }}
            }}
            // Para .single()
            if (req.file && names.includes(req.file.fieldname)) {{
                collectedFiles.push(req.file);
            }}

            const results = [];
            for (const f of collectedFiles) {{
                const saved = await saveOne(f);
                if (saved) results.push(saved);
            }}

            if (setUrl) {{
                // Expõe URLs amigáveis para controllers usarem na persistência no modelo
                if (results.length === 1) {{
                    req.fileDb = results[0]; // Objeto completo salvo no DB
                    // A URL mais recomendada, por ID numérico
                    req.fileUrl = `/db-image/id/${{results[0].id}}`;
                    // URL alternativa por filename, para compatibilidade ou legibilidade (menos eficiente)
                    req.fileUrlByName = `/db-image/file/${{encodeURIComponent(results[0].filename)}}`;
                }} else if (results.length > 1) {{
                    req.filesDb = results;
                    req.filesUrl = results.map(r => `/db-image/id/${{r.id}}`);
                }}
            }}

            next();
        }} catch (e) {{
            console.error("[dbImageStore] Erro crítico no middleware persistUpload:", e);
            res.status(500).json({{ success: false, error: "Falha interna ao processar upload de imagem." }});
        }}
    }};
}}

module.exports = {{
    persistUpload,
}};
"""

UPLOAD_MIDDLEWARE_DB_JS = r"""
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
        const err = new Error(`Tipo de imagem não suportado: ${{file.mimetype}}`);
        err.code = "INVALID_FILE_TYPE";
        cb(err, false);
    }
};

const videoFilter = (req, file, cb) => {
    if (/^video\//i.test(file.mimetype)) {
        cb(null, true);
    } else {
        const err = new Error(`Tipo de vídeo não suportado: ${{file.mimetype}}`);
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
    processForm,
    uploadCapaAnime,
    uploadVideoEpisodio, // Vídeos continuam em disco
    uploadAvatar,
    uploadCapaPerfil,
    uploadCapa, // Alias
};
"""

# ----------------------- helpers (py) ------------------------
def log_step(message):
    print(f"[{time.strftime('%H:%M:%S')}] {message}")

def write_file(path: Path, content: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    log_step(f"✔ Escreveu {path.relative_to(PROJECT_ROOT)}")

def backup_if_exists(path: Path):
    if path.exists():
        bak = path.with_suffix(path.suffix + ".backup")
        i = 1
        while bak.exists():
            bak = path.with_suffix(f"{path.suffix}.backup{i}")
            i += 1
        bak.write_text(path.read_text(encoding="utf-8"), encoding="utf-8")
        log_step(f"↺ Backup criado: {bak.relative_to(PROJECT_ROOT)}")
        return bak
    return None

def patch_app_file(app_path: Path):
    log_step(f"✎ Aplicando patch em {app_path.name}...")
    backup_if_exists(app_path)
    code = app_path.read_text(encoding="utf-8")

    # 1. Garante import de dbImageRoute
    if 'dbImageRoute' not in code:
        code = re.sub(
            r'(const\s+express\s*=\s*require\([\'"]express[\'"]\)\s*;?)',
            r'\1\nconst dbImageRoute = require("./routes/dbImageRoute");',
            code, count=1
        )
        log_step("   - Adicionado `require('./routes/dbImageRoute')`")

    # 2. Garante app.use("/", dbImageRoute);
    if 'dbImageRoute' in code and 'app.use("/", dbImageRoute)' not in code:
        # Encontra o primeiro app.use() e insere depois, ou fallback
        m = re.search(r'(app\.use\(.*?\)\s*;)', code, flags=re.S)
        if m:
            insert_at = m.end()
            code = code[:insert_at] + '\napp.use("/", dbImageRoute);' + code[insert_at:]
        else:
            # fallback: logo após const app = express();
            code = re.sub(
                r'(const\s+app\s*=\s*express\(\)\s*;?)',
                r'\1\napp.use("/", dbImageRoute);',
                code, count=1
            )
        log_step("   - Adicionado `app.use(\"/\", dbImageRoute)`")
    elif 'app.use("/", dbImageRoute)' in code:
        log_step("   - `app.use(\"/\", dbImageRoute)` já está presente.")
    else:
        log_step("   - Falha ao integrar `dbImageRoute` (verifique `const app = express()` ou `app.use()`).")


    # 3. Troca require do uploadMiddleware para a versão .db
    if 'require("./middleware/uploadMiddleware")' in code:
        code = re.sub(
            r'require\(\s*[\'"]\.\/middleware\/uploadMiddleware[\'"]\s*\)',
            'require("./middleware/uploadMiddleware.db")',
            code
        )
        log_step("   - Atualizado `require` de `uploadMiddleware` para `uploadMiddleware.db`")
    else:
        log_step("   - `require` de `uploadMiddleware` não encontrado ou já alterado.")

    # 4. Remove ou comenta a linha `app.use('/uploads', express.static(...))`
    static_uploads_regex = r"app\.use\(\s*['\"]\/uploads['\"],\s*express\.static\(path\.join\(__dirname,\s*['\"]public\/uploads['\"]\)\)\s*\);"
    if re.search(static_uploads_regex, code):
        code = re.sub(static_uploads_regex, r"// Removido pelo script: app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))); // Imagens agora são servidas do DB.", code)
        log_step("   - Removida linha `app.use('/uploads', express.static(...))`")
    else:
        log_step("   - Linha `app.use('/uploads', express.static(...))` não encontrada ou já removida.")


    app_path.write_text(code, encoding="utf-8")
    log_step(f"✔ Patch aplicado em {app_path.name}")

def update_package_json():
    log_step("✎ Verificando package.json para dependências...")
    if not PACKAGE_JSON.exists():
        log_step("⚠ package.json não encontrado — pulei dependências.")
        return

    backup_if_exists(PACKAGE_JSON)
    data = json.loads(PACKAGE_JSON.read_text(encoding="utf-8"))
    deps = data.get("dependencies") or {}
    
    changed = False
    if "pg" not in deps:
        deps["pg"] = "^8.12.0" # Versão atualizada ou compatível
        changed = True
    if "multer" not in deps: # Certifica que multer está lá para o novo middleware
        deps["multer"] = "^1.4.5-lts.1" # Versão comum para LTS
        changed = True

    data["dependencies"] = deps
    
    if changed:
        PACKAGE_JSON.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
        log_step("✔ package.json atualizado: adicionada(s) dependência(s) 'pg' e/ou 'multer'")
    else:
        log_step("ℹ 'pg' e 'multer' já presentes em dependencies")

def detect_app_file():
    for name in APP_CANDIDATES:
        p = PROJECT_ROOT / name
        if p.exists():
            return p
    return None

def get_mime_type_from_filename(filename: str):
    lower = filename.lower()
    if lower.endswith(".png"): return "image/png"
    if lower.endswith(".jpg") or lower.endswith(".jpeg"): return "image/jpeg"
    if lower.endswith(".webp"): return "image/webp"
    if lower.endswith(".gif"): return "image/gif"
    return None

def migrate_existing_uploads():
    """
    Importa imagens elegíveis de `public/uploads` para o Neon.
    Isso é feito gerando e executando um script Node.js temporário para
    reaproveitar o cliente 'pg' e evitar dependências Python de Postgres.
    """
    log_step("🔄 Iniciando migração de imagens existentes para o Neon...")
    if not PUBLIC_UPLOADS.exists() or not any(PUBLIC_UPLOADS.iterdir()):
        log_step("ℹ public/uploads não existe ou está vazio — nada para migrar.")
        # Mesmo se não houver nada para migrar, o diretório deve ser removido.
        if PUBLIC_UPLOADS.exists():
            log_step("🗑 Removendo diretório `public/uploads` vazio.")
            try:
                # Remove apenas se estiver realmente vazio ou tiver apenas subdiretórios que serão recriados pelos vídeos.
                # Para evitar problemas, vamos remover apenas arquivos de imagem.
                for item in PUBLIC_UPLOADS.iterdir():
                    if item.is_file() and get_mime_type_from_filename(item.name):
                        item.unlink()
                # Se após remover as imagens, o diretório ficar vazio, removemos.
                # ou se houver apenas subdiretórios de vídeos que são mantidos.
                if not any(f.is_file() for f in PUBLIC_UPLOADS.iterdir()):
                    # Não remove o diretório base 'uploads' se ele contiver a pasta 'videos'
                    if not (PUBLIC_UPLOADS / "videos").exists() or len(list(PUBLIC_UPLOADS.iterdir())) == 1 and (PUBLIC_UPLOADS / "videos").is_dir():
                        # Se não há videos ou só tem a pasta videos, assume que ela será recriada/manuseada pelo diskStorage.
                        # Melhor não remover a pasta 'videos' se já houver conteúdo nela,
                        # o `ensureDirExists` do `uploadMiddleware.db.js` cuida dela.
                        pass
                    # fs.rmdir(PUBLIC_UPLOADS) # Desativado para não apagar a pasta `videos`
                
            except OSError as e:
                log_step(f"⚠ Erro ao limpar public/uploads: {e}")

        return

    # Gera um script Node.js temporário para fazer a importação
    importer_script = PROJECT_ROOT / "__import_uploads_to_neon.js"
    
    importer_content = f"""
/**
 * @file __import_uploads_to_neon.js
 * @description Script Node.js temporário para importar imagens existentes
 *              de `public/uploads` para o banco de dados Neon.
 */
const fs = require("fs");
const path = require("path");
const {{ Pool }} = require("pg");
const crypto = require("crypto");

const ROOT = __dirname;
const BASE_UPLOAD_DIR = path.join(ROOT, "public", "uploads");
const MAX_FILE_SIZE = {MAX_IMPORT_SIZE}; // {MAX_IMPORT_SIZE / (1024 * 1024)}MB

const DB_URL = process.env.DATABASE_URL || "{DATABASE_URL.replace('"', '\\"')}";
const pool = new Pool({{ connectionString: DB_URL, max: 5, idleTimeoutMillis: 10000 }}); // Menos conexões para importação

(async () => {{
    const client = await pool.connect();
    try {{
        // Garante que a tabela exista antes de tentar inserir
        await client.query(`
            CREATE TABLE IF NOT EXISTS stored_images (
                id SERIAL PRIMARY KEY,
                filename TEXT NOT NULL,
                mimetype TEXT NOT NULL,
                sha1 TEXT UNIQUE NOT NULL,
                data BYTEA NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log("[Importer] Tabela 'stored_images' verificada/criada.");

        /**
         * Retorna o MIME type com base na extensão do arquivo.
         * @param {{string}} filename - Nome do arquivo.
         * @returns {{string|null}} MIME type ou null se não for um tipo de imagem suportado.
         */
        function getMimeTypeOfImage(filename) {{
            const lower = filename.toLowerCase();
            if (lower.endsWith(".png")) return "image/png";
            if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
            if (lower.endsWith(".webp")) return "image/webp";
            if (lower.endsWith(".gif")) return "image/gif";
            return null; // Não processa outros tipos (e.g., vídeos)
        }}

        /**
         * Percorre um diretório recursivamente e retorna todos os caminhos de arquivos.
         * @param {{string}} dir - Diretório a ser percorrido.
         * @returns {{Array<string>}} Lista de caminhos absolutos dos arquivos.
         */
        function walkSync(dir) {{
            let files = [];
            const items = fs.readdirSync(dir, {{ withFileTypes: true }});

            for (const item of items) {{
                const fullPath = path.join(dir, item.name);
                if (item.isDirectory()) {{
                    files = files.concat(walkSync(fullPath));
                }} else if (item.isFile()) {{
                    files.push(fullPath);
                }}
            }}
            return files;
        }}

        if (!fs.existsSync(BASE_UPLOAD_DIR)) {{
            console.log("[Importer] Diretório `public/uploads` não encontrado. Nenhuma imagem para importar.");
            process.exit(0);
        }}

        const allFiles = walkSync(BASE_UPLOAD_DIR);
        let importedCount = 0;
        let skippedNotImage = 0;
        let skippedTooBig = 0;
        let skippedAlreadyExists = 0;

        console.log(`[Importer] Encontrados ${{allFiles.length}} arquivos em ${{BASE_UPLOAD_DIR}}.`);

        for (const filePath of allFiles) {{
            const relativePath = path.relative(BASE_UPLOAD_DIR, filePath);
            const basename = path.basename(filePath);
            const mime = getMimeTypeOfImage(basename);

            if (!mime) {{
                skippedNotImage++;
                continue; // Ignora arquivos que não são imagens
            }}

            let fileData;
            try {{
                fileData = fs.readFileSync(filePath);
            }} catch (readErr) {{
                console.error(`[Importer] Erro ao ler arquivo ${{filePath}}:`, readErr);
                continue;
            }}

            if (fileData.length > MAX_FILE_SIZE) {{
                skippedTooBig++;
                continue; // Ignora imagens muito grandes (excedem o limite definido)
            }}

            const sha1 = crypto.createHash("sha1").update(fileData).digest("hex");

            try {{
                const insertQuery = `
                    INSERT INTO stored_images (filename, mimetype, sha1, data)
                    VALUES ($1, $2, $3, $4)
                    ON CONFLICT (sha1) DO NOTHING
                    RETURNING id;`; // Retorna id se for inserido
                const {{ rowCount }} = await client.query(insertQuery, [basename, mime, sha1, fileData]);

                if (rowCount > 0) {{
                    importedCount++;
                    console.log(`[Importer] ✅ Importado: ${{relativePath}}`);
                    fs.unlinkSync(filePath); // Remove o arquivo local após importação bem-sucedida
                }} else {{
                    skippedAlreadyExists++;
                    console.log(`[Importer] ℹ Já existe (SHA1): ${{relativePath}}. Removendo arquivo local.`);
                    fs.unlinkSync(filePath); // Remove mesmo se já existir, pois está no DB
                }}
            }} catch (dbErr) {{
                console.error(`[Importer] Erro ao importar ${{relativePath}} para o Neon:`, dbErr);
            }}
        }}

        console.log("\\n[Importer] --- Relatório Final ---");
        console.log(`[Importer] Imagens importadas para o Neon: ${{importedCount}}`);
        console.log(`[Importer] Ignoradas (não-imagem): ${{skippedNotImage}}`);
        console.log(`[Importer] Ignoradas (maior que ${{MAX_FILE_SIZE / (1024 * 1024)}}MB): ${{skippedTooBig}}`);
        console.log(`[Importer] Ignoradas (já existente no DB): ${{skippedAlreadyExists}}`);
        console.log("[Importer] Arquivos locais de imagens elegíveis foram removidos.");

        // Limpa diretórios vazios recursivamente após a migração
        function removeEmptyDirs(dir) {{
            const items = fs.readdirSync(dir, {{ withFileTypes: true }});
            for (const item of items) {{
                if (item.isDirectory()) {{
                    const subDirPath = path.join(dir, item.name);
                    removeEmptyDirs(subDirPath); // Chama recursivamente
                    try {{
                        if (!fs.readdirSync(subDirPath).length) {{ // Se o subdiretório estiver vazio
                            fs.rmdirSync(subDirPath);
                            console.log(`[Importer] 🗑 Removido diretório vazio: ${{path.relative(BASE_UPLOAD_DIR, subDirPath)}}`);
                        }}
                    }} catch (e) {{
                        // Ignora erros se o diretório não estiver realmente vazio (ex: tem arquivos de vídeo)
                    }}
                }}
            }}
        }}

        removeEmptyDirs(BASE_UPLOAD_DIR); // Tenta remover subdiretórios vazios
        
        // Remove o diretório 'uploads' completo se estiver vazio ou se só tiver 'videos'
        if (fs.existsSync(BASE_UPLOAD_DIR)) {{
            const remainingItems = fs.readdirSync(BASE_UPLOAD_DIR);
            if (remainingItems.length === 0) {{
                fs.rmdirSync(BASE_UPLOAD_DIR);
                console.log(`[Importer] 🗑 Removido diretório raiz vazio: public/uploads`);
            }} else if (remainingItems.length === 1 && remainingItems[0] === "videos") {{
                 console.log(`[Importer] ℹ Diretório public/uploads contém apenas a pasta 'videos'. Mantido.`);
            }}
        }}


    }} catch (e) {{
        console.error("[Importer] Erro fatal durante a importação:", e);
        process.exit(1);
    }} finally {{
        client.release();
        await pool.end(); // Fecha o pool de conexões
        console.log("[Importer] Conexão com o banco de dados fechada.");
    }}
}})().catch(e => {{
    console.error("[Importer] Erro na execução principal do importador:", e);
    process.exit(1);
}});
"""
    write_file(importer_script, importer_content)
    log_step("✔ Gerado importador temporário: __import_uploads_to_neon.js")

    log_step(f"→ Executando importador temporário: node {importer_script.name}")
    try:
        # Executa o script Node.js para realizar a migração

        result = subprocess.run(["node", str(importer_script)], 
                                capture_output=True, text=True, check=True,
                                env={**os.environ, "DATABASE_URL": DATABASE_URL}) # Passa DATABASE_URL explicitamente
        log_step(f"stdout:\n{result.stdout}")
        if result.stderr:
            log_step(f"stderr:\n{result.stderr}")
        log_step("✔ Importação de imagens existentes concluída via script Node.js.")
    except subprocess.CalledProcessError as e:
        log_step(f"❌ Erro ao executar o script de importação: {e}")
        log_step(f"stdout:\n{e.stdout}")
        log_step(f"stderr:\n{e.stderr}")
        log_step("Pode ser necessário executar manualmente: `node __import_uploads_to_neon.js`")
    except FileNotFoundError:
        log_step("❌ Comando 'node' não encontrado. Certifique-se de que Node.js está instalado.")
        log_step("Você precisará executar manualmente: `node __import_uploads_to_neon.js` (com DATABASE_URL no ambiente)")
    finally:
        # Tenta remover o script temporário
        if importer_script.exists():
            importer_script.unlink()
            log_step(f"🗑 Removido script temporário: {importer_script.name}")


# ----------------------------- Main --------------------------
def main():
    log_step("🚀 Iniciando fixador de uploads para Neon (BYTEA) ...")

    # 1) Gerar/atualizar arquivos JS de middleware e rota
    write_file(ROUTES_DIR / "dbImageRoute.js", DB_IMAGE_ROUTE_JS)
    write_file(MIDDLEWARE_DIR / "dbImageStore.js", DB_IMAGE_STORE_JS)

    orig_upload = MIDDLEWARE_DIR / "uploadMiddleware.js"
    if orig_upload.exists():
        backup_if_exists(orig_upload) # Cria backup do original
    write_file(MIDDLEWARE_DIR / "uploadMiddleware.db.js", UPLOAD_MIDDLEWARE_DB_JS)
    log_step("✔ Arquivos de middleware e rota JS gerados/atualizados.")

    # 2) Patch em app.js/server.js/index.js
    app_file = detect_app_file()
    if not app_file:
        log_step("❌ Não encontrei app.js/server.js/index.js na raiz. Abortando patch.")
        return
    patch_app_file(app_file)
    log_step(f"✔ Arquivo principal `{app_file.name}` corrigido.")

    # 3) package.json -> pg e multer
    update_package_json()
    log_step("✔ `package.json` verificado e atualizado.")

    # 4) Importador opcional das imagens já existentes
    if IMPORT_EXISTING_UPLOADS:
        migrate_existing_uploads()
    else:
        log_step("ℹ Migração de imagens existentes desativada (IMPORT_EXISTING_UPLOADS=False).")
        # Mesmo se não migrar, remove o diretório de imagens se estiver vazio
        if PUBLIC_UPLOADS.exists() and not any(f.is_file() for f in PUBLIC_UPLOADS.iterdir()):
            try:
                # Remove apenas se estiver realmente vazio ou tiver apenas subdiretórios de vídeos que são mantidos.
                if not (PUBLIC_UPLOADS / "videos").exists() or len(list(PUBLIC_UPLOADS.iterdir())) == 1 and (PUBLIC_UPLOADS / "videos").is_dir():
                    pass # não remove a pasta `videos`
                else:
                    # Se há outros arquivos ou subdiretórios além de 'videos', não remove tudo automaticamente.
                    # Apenas limpa arquivos de imagem elegíveis se nenhum vídeo estiver presente fora da pasta de vídeos.
                    pass
            except OSError as e:
                log_step(f"⚠ Erro ao limpar public/uploads (sem migração): {e}")

    log_step("\n✅ Processo de configuração concluído com sucesso!")
    log_step("--------------------------------------------------")
    log_step("Próximos passos cruciais:")
    log_step("  1) Execute `npm install` para garantir a dependência 'pg'.")
    log_step("  2) **Atualize seus controllers:** Onde você salvava `req.file.filename`,")
    log_step("     agora use `req.fileUrl` (para `/db-image/id/:id`) ao salvar no seu modelo (Sequelize).")
    log_step("     Exemplo: `anime.capa = req.fileUrl;`")
    log_step("     Ou, se preferir salvar o ID: `anime.capaDbId = req.fileDb.id;`")
    log_step("     E em seus templates, use: `<img src=\"/db-image/id/<%= anime.capaDbId %>\" />`")
    log_step("  3) Inicie seu aplicativo. Os uploads de IMAGEM agora irão direto para o Neon.")
    log_step("     Os uploads de VÍDEO continuarão a ir para o disco efêmero no Render.")
    log_step("--------------------------------------------------")

if __name__ == "__main__":
    main()