// build.js
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

// Configurações de diretórios
const VIEWS_DIR = path.join(process.cwd(), 'views');
const DIST_DIR = path.join(process.cwd(), 'dist');

// Inicializa Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- Função para buscar todos os dados do Supabase ---
async function getAllData() {
  let result = {
    animes: [],
    episodios: [],
    posts: [],
    users: []
  };

  try {
    const { data: animes, error: animeError } = await supabase.from('animes').select('*');
    if (animeError) console.error('Erro ao buscar animes:', animeError);
    else result.animes = animes;

    const { data: episodios, error: epiError } = await supabase.from('episodios').select('*');
    if (epiError) console.error('Erro ao buscar episódios:', epiError);
    else result.episodios = episodios;

    const { data: posts, error: postError } = await supabase.from('posts').select('*');
    if (postError) console.error('Erro ao buscar posts:', postError);
    else result.posts = posts;

    const { data: users, error: userError } = await supabase.from('users').select('*');
    if (userError) console.error('Erro ao buscar usuários:', userError);
    else result.users = users;

  } catch (err) {
    console.error('Erro geral ao buscar dados do Supabase:', err);
  }

  return result;
}

// --- Prepara a pasta dist ---
function prepareDist() {
  if (fs.existsSync(DIST_DIR)) fs.rmSync(DIST_DIR, { recursive: true, force: true });
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// --- Renderiza EJS de uma pasta e suas subpastas ---
async function renderFolder(srcDir, distDir, data) {
  const files = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const file of files) {
    const srcPath = path.join(srcDir, file.name);
    const distPath = path.join(distDir, file.name.replace('.ejs', '.html'));

    if (file.isDirectory()) {
      fs.mkdirSync(distPath, { recursive: true });
      await renderFolder(srcPath, distPath, data);
    } else if (file.name.endsWith('.ejs')) {
      try {
        const html = await ejs.renderFile(srcPath, {
          ...data,
          title: data.title || 'Deny Animes Hub',
          userIsLoggedIn: data.userIsLoggedIn ?? false,
          api: data.api || {}
        }, { async: true });
        fs.writeFileSync(distPath, html);
        console.log(`Gerado: ${distPath}`);
      } catch (err) {
        console.error(`Erro ao renderizar ${srcPath}:`, err);
      }
    }
  }
}

// --- Função principal ---
async function build() {
  console.log('Iniciando build...');
  prepareDist();

  // Busca todos os dados do Supabase
  const apiData = await getAllData();

  // Renderiza todos os EJS
  await renderFolder(VIEWS_DIR, DIST_DIR, {
    api: apiData,
    userIsLoggedIn: false,
    title: 'Deny Animes Hub'
  });

  console.log('Build finalizado! HTMLs gerados em dist/');
}

// Executa
build().catch(err => console.error('Erro no build:', err));
