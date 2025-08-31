// setup.js

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const axios = require('axios'); // Para buscar o IP público
const dotenv = require('dotenv'); // Para analisar e manipular o .env

console.log('🚀 Iniciando script de configuração e automação DenyAnimeHub...');

// Carrega as variáveis do .env existente para preservar as não relacionadas ao BD
const envConfig = dotenv.parse(fs.readFileSync(path.join(__dirname, '.env') || ''));

// ==========================================================
// 1. CONFIGURAÇÕES CHAVE (AJUSTE AQUI)
// ==========================================================
const SUPABASE_URL = "https://izwuglmezgkkbtpdvkct.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6d3VnbG1lemdra2J0cGR2b2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0ODE5NTIsImV4cCI6MjA3MjA1Nzk1Mn0.ubEKB-1vTsp0cWBVgFuutsvZeN3DRb-d1qDkXjfV06Q";
// Sua DATABASE_URL completa, com a senha já com o escape de %40%40%40
const SUPABASE_DATABASE_URL = "postgresql://postgres:denyneves123%40%40%40@izwuglmezgkkbtpdvkct.supabase.co:5432/postgres?sslmode=require";

// Outras variáveis do .env
const PORT = envConfig.PORT || 3000;
const JWT_SECRET = envConfig.JWT_SECRET || 'uma_chave_super_segura_para_tokens';
const AUTOMATION_API_KEY = envConfig.AUTOMATION_API_KEY || 'sua_chave_de_automacao_segura';
const EMAIL_SERVICE = envConfig.EMAIL_SERVICE || 'gmail';
const EMAIL_USERNAME = envConfig.EMAIL_USERNAME || 'denyneves14@gmail.com';
const EMAIL_PASSWORD = envConfig.EMAIL_PASSWORD || 'mons bfcz pxex cmph'; // ATENÇÃO: Use senha de app ou token
const EMAIL_FROM = envConfig.EMAIL_FROM || '"DenyAnimeHub App"';

// ==========================================================
// 2. FUNÇÕES AUXILIARES
// ==========================================================

async function getPublicIp() {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.error('Falha ao obter o IP público:', error.message);
        return 'UNKNOWN_IP';
    }
}

function updateEnvFile(publicIp) {
    console.log('\n✏️ Atualizando o arquivo .env...');
    const envContent = `
# ==========================================================
# CONFIGURAÇÕES DO PROJETO DENY ANIMES HUB
# ==========================================================

# Porta do servidor Node.js
PORT=${PORT}

# Ambiente (development | production)
NODE_ENV=development

# ==========================================================
# CONFIGURAÇÃO DO BANCO DE DADOS SUPABASE (PostgreSQL)
# ==========================================================

# URL COMPLETA DE CONEXÃO DO SEU BANCO DE DADOS SUPABASE PARA AMBIENTE DE PRODUÇÃO (RENDER)
DATABASE_URL="${SUPABASE_DATABASE_URL}"

# URL COMPLETA DE CONEXÃO DO SEU BANCO DE DADOS SUPABASE PARA AMBIENTE DE DESENVOLVIMENTO LOCAL
DATABASE_URL_LOCAL="${SUPABASE_DATABASE_URL}"

# Seu IP público detectado (para adicionar manualmente na lista branca do Supabase)
# Seu IP Local: ${publicIp}

# ==========================================================
# CONFIGURAÇÃO SUPABASE (API) - ESSENCIAL PARA O SDK (Front-end/Cliente)
# ==========================================================

NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}

# ==========================================================
# SEGURANÇA E AUTENTICAÇÃO
# ==========================================================

JWT_SECRET=${JWT_SECRET}
AUTOMATION_API_KEY=${AUTOMATION_API_KEY}

# ==========================================================
# OUTRAS CONFIGURAÇÕES (EMAIL, API KEYS, ETC)
# ==========================================================

EMAIL_SERVICE=${EMAIL_SERVICE}
EMAIL_USERNAME=${EMAIL_USERNAME}
EMAIL_PASSWORD=${EMAIL_PASSWORD}
EMAIL_FROM=${EMAIL_FROM}
`.trim();
    fs.writeFileSync(path.join(__dirname, '.env'), envContent);
    console.log('✅ Arquivo .env atualizado com sucesso!');
}

function updateConfigFile() {
    console.log('\n✏️ Atualizando config/config.json...');
    const configPath = path.join(__dirname, 'config', 'config.json');
    let config;
    try {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (error) {
        console.error(`❌ Erro ao ler config/config.json: ${error.message}`);
        console.error('Por favor, certifique-se de que o arquivo config/config.json existe e está formatado corretamente.');
        process.exit(1);
    }

    // Configuração para desenvolvimento
    config.development = {
        username: "postgres",
        password: "denyneves123@@@", // Senha direta para desenvolvimento, pode ser substituída por DB_PASSWORD_DEV se quiser
        database: "postgres",
        host: SUPABASE_DATABASE_URL.match(/@([^:]+):/)[1], // Extrai o host da URL
        port: 5432,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        use_env_variable: "DATABASE_URL_LOCAL"
    };

    // Configuração para produção
    config.production = {
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        use_env_variable: "DATABASE_URL"
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log('✅ Arquivo config/config.json atualizado com sucesso!');
}

function runCommand(command, errorMessage) {
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`❌ ${errorMessage}`);
        console.error(error.message);
        process.exit(1);
    }
}

// ==========================================================
// 3. FLUXO PRINCIPAL
// ==========================================================

async function main() {
    const publicIp = await getPublicIp();
    updateEnvFile(publicIp);
    updateConfigFile();

    console.log('\n--- VERIFICAÇÕES MANUAIS CRÍTICAS ---');
    console.log('🚨 AÇÃO MANUAL NECESSÁRIA (MUITO IMPORTANTE):');
    console.log(`1. Vá ao painel do Supabase -> Database -> Settings -> Network Restrictions.`);
    console.log(`2. Adicione os seguintes IPs à "Allowlist IPs":`);
    console.log(`   - Seu IP Público (para desenvolvimento local): \x1b[33m${publicIp}\x1b[0m`);
    console.log(`   - Para produção no Render: Adicione \x1b[33m0.0.0.0/0\x1b[0m (acesso total, menos seguro, mas bom para testes iniciais) OU os blocos CIDR específicos do Render (consulte https://render.com/docs/ip-addresses para a sua região).`);
    console.log(`3. Salve as alterações no Supabase.`);

    console.log('\n🚨 AÇÃO MANUAL NO RENDER (MUITO IMPORTANTE):');
    console.log('1. Vá ao painel do Render para o seu serviço (https://dashboard.render.com/).');
    console.log('2. Acesse "Environment" (Ambiente).');
    console.log('3. Adicione/Atualize as seguintes variáveis de ambiente (use os VALORES EXATOS abaixo):');
    console.log(`   - \x1b[36mNODE_ENV\x1b[0m: \x1b[32mproduction\x1b[0m`);
    console.log(`   - \x1b[36mDATABASE_URL\x1b[0m: \x1b[32m"${SUPABASE_DATABASE_URL}"\x1b[0m`);
    console.log(`   - \x1b[36mNEXT_PUBLIC_SUPABASE_URL\x1b[0m: \x1b[32m${SUPABASE_URL}\x1b[0m`);
    console.log(`   - \x1b[36mNEXT_PUBLIC_SUPABASE_ANON_KEY\x1b[0m: \x1b[32m${SUPABASE_ANON_KEY}\x1b[0m`);
    console.log(`   - \x1b[36mPORT\x1b[0m: \x1b[32m${PORT}\x1b[0m`);
    console.log(`   - \x1b[36mJWT_SECRET\x1b[0m: \x1b[32m${JWT_SECRET}\x1b[0m`);
    console.log(`   - \x1b[36mAUTOMATION_API_KEY\x1b[0m: \x1b[32m${AUTOMATION_API_KEY}\x1b[0m`);
    console.log(`   - \x1b[36mEMAIL_SERVICE\x1b[0m: \x1b[32m${EMAIL_SERVICE}\x1b[0m`);
    console.log(`   - \x1b[36mEMAIL_USERNAME\x1b[0m: \x1b[32m${EMAIL_USERNAME}\x1b[0m`);
    console.log(`   - \x1b[36mEMAIL_PASSWORD\x1b[0m: \x1b[32m${EMAIL_PASSWORD}\x1b[0m`);
    console.log(`   - \x1b[36mEMAIL_FROM\x1b[0m: \x1b[32m${EMAIL_FROM}\x1b[0m`);
    console.log(`4. Salve as variáveis de ambiente no Render.`);

    console.log('\n--- Teste de Conexão Local (Supabase) ---');
    console.log('Tentando iniciar o servidor para testar a conexão com o Supabase...');
    console.log('Isso só funcionará SE SEU IP JÁ ESTIVER NA LISTA BRANCA DO SUPABASE.');

    // Inicia o servidor em um processo filho e o mata após alguns segundos ou em erro
    const child = execSync('node app.js &', { encoding: 'utf8', stdio: 'pipe' });
    console.log('Servidor iniciado (verifique a saída para erros). Aguardando para testar...');

    // Esperar um pouco para o servidor subir e tentar conectar
    await new Promise(resolve => setTimeout(resolve, 5000));

    try {
        // Tente fazer uma requisição simples para o servidor local
        const response = await axios.get(`http://localhost:${PORT}/`);
        if (response.status === 200) {
            console.log('✅ Teste de conexão local com o servidor (e implicitamente o Supabase) BEM-SUCEDIDO!');
        } else {
            console.warn(`⚠️ Teste de conexão local com o servidor falhou com status ${response.status}.`);
        }
    } catch (error) {
        console.error('❌ ERRO NO TESTE DE CONEXÃO LOCAL: ', error.message);
        console.error('Isso pode significar que seu servidor não subiu corretamente, ou que a conexão com o Supabase ainda está falhando.');
        console.error('Por favor, verifique a lista branca de IPs no Supabase e a sua configuração local.');
    } finally {
        // Mata o processo do servidor iniciado
        console.log('Encerrando o servidor de teste...');
        runCommand('taskkill /f /im node.exe || killall node', 'Falha ao encerrar o processo do Node.js (pode ser um erro, mas o script continua).');
    }


    console.log('\n--- Automação Git ---');
    runCommand('git add .', 'Falha ao adicionar arquivos ao Git.');
    console.log('✅ Arquivos adicionados ao Git.');
    runCommand(`git commit -m "feat: Configuração automatizada do Supabase e Render"`, 'Falha ao fazer commit no Git.');
    console.log('✅ Commit realizado.');
    runCommand('git push', 'Falha ao enviar alterações para o repositório remoto.');
    console.log('✅ Push para o repositório remoto realizado!');

    console.log('\n🎉 O script de automação DenyAnimeHub foi concluído!');
    console.log('LEMBRE-SE DE REALIZAR AS AÇÕES MANUAIS NO SUPABASE E NO RENDER PARA FINALIZAR A CONFIGURAÇÃO.');
    console.log('Após as ações manuais, force um novo deploy no Render.');
}

main().catch(error => {
    console.error('\n❌ Um erro inesperado ocorreu durante a execução do script:', error);
    runCommand('taskkill /f /im node.exe || killall node', 'Tentativa de encerrar processo do Node.js após erro.');
    process.exit(1);
});