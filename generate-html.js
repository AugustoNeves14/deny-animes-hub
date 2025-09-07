const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Caminho das pastas
const VIEWS_DIR = path.join(__dirname, 'views');
const DIST_DIR = path.join(__dirname, 'dist');

// Importar sua API/fetch local
const api = require('./public/js/api.js'); // Ajuste o caminho conforme necessário

// Função para criar diretório se não existir
function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Função para processar todos os EJS
async function renderEjsFiles(dir, outputDir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await renderEjsFiles(fullPath, path.join(outputDir, file));
    } else if (path.extname(file) === '.ejs') {
      ensureDirSync(outputDir);

      // Buscar dados do banco via api.js (ex: animes, posts etc.)
      const data = await api.getAllData?.() || {}; // Ajuste de acordo com sua função

      const html = await ejs.renderFile(fullPath, data, { async: true });

      const outputFileName = path.basename(file, '.ejs') + '.html';
      const outputPath = path.join(outputDir, outputFileName);
      fs.writeFileSync(outputPath, html, 'utf8');
      console.log(`Gerado: ${outputPath}`);
    }
  }
}

// Limpar dist antes de gerar
if (fs.existsSync(DIST_DIR)) fs.rmSync(DIST_DIR, { recursive: true });
ensureDirSync(DIST_DIR);

// Rodar renderização
renderEjsFiles(VIEWS_DIR, DIST_DIR)
  .then(() => console.log('Todos os arquivos HTML foram gerados!'))
  .catch(console.error);
