// ====================================================================================
//
//      supabaseConnector.js - DenyAnimeHub (Conexão Robusta Supabase)
//
//      Este script gerencia a inicialização, teste e re-tentativas de conexão
//      com o Supabase, garantindo que o aplicativo Node.js seja resiliente
//      a problemas de rede e configuração. Ele não modifica models, controllers
//      ou a lógica existente do dbProxy.
//
// ====================================================================================

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// --- 1. Validação e Carregamento de Variáveis de Ambiente ---
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// Para operações de backend que exigem privilégios, você pode usar a chave Service Role
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

let initError = false; // Flag para indicar se houve um erro na inicialização das variáveis

if (!SUPABASE_URL) {
    console.error('❌ ERRO CRÍTICO: Variável de ambiente NEXT_PUBLIC_SUPABASE_URL não encontrada.');
    console.error('     Por favor, adicione NEXT_PUBLIC_SUPABASE_URL ao seu arquivo .env ou variáveis de ambiente do Render.');
    initError = true;
}

if (!SUPABASE_ANON_KEY) {
    console.error('❌ ERRO CRÍTICO: Variável de ambiente NEXT_PUBLIC_SUPABASE_ANON_KEY não encontrada.');
    console.error('     Por favor, adicione NEXT_PUBLIC_SUPABASE_ANON_KEY ao seu arquivo .env ou variáveis de ambiente do Render.');
    initError = true;
}

if (initError) {
    console.error('\n🚫 Inicialização do Supabase falhou devido a variáveis de ambiente ausentes. O aplicativo pode não funcionar corretamente.');
    // Não saímos do processo aqui para permitir que o app.js inicie e sirva o front-end,
    // mas as operações de banco de dados via Supabase falharão.
}

// --- 2. Inicialização do Cliente Supabase (Cliente Público) ---
// Este cliente é para operações que usam a chave anon (RLS é aplicado)
const supabase = initError ? null : createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: false, // Não persistir sessão no lado do servidor
    },
    global: {
        // Configurações globais para requisições fetch, incluindo timeout
        fetch: (input, init) => {
            // Adiciona um timeout de 15 segundos para todas as requisições Supabase
            return fetch(input, { ...init, signal: AbortSignal.timeout(15000) });
        },
    },
});

// --- Cliente Supabase com Service Role (APENAS PARA OPERAÇÕES PRIVILEGIADAS DE BACKEND) ---
// Use este cliente onde RLS não deve ser aplicado, por exemplo, em rotas de admin ou automação.
// Certifique-se de que a chave SUPABASE_SERVICE_ROLE_KEY esteja presente e nunca seja exposta ao cliente.
const supabaseAdmin = initError || !SUPABASE_SERVICE_ROLE_KEY ? null : createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
        persistSession: false,
    },
    global: {
        fetch: (input, init) => {
            return fetch(input, { ...init, signal: AbortSignal.timeout(15000) });
        },
    },
});

// --- 3. Função de Teste de Conexão com Re-tentativas ---
const MAX_RETRIES = 10; // Aumentado para 10 tentativas para maior robustez no Render
const RETRY_DELAY_MS = 5000; // 5 segundos de atraso entre tentativas

async function testSupabaseConnection(retries = 0) {
    if (initError || !supabase) {
        console.error('❌ Não é possível testar a conexão: Cliente Supabase não foi inicializado corretamente devido a variáveis de ambiente ausentes.');
        return false;
    }

    if (retries === 0) {
        console.log('\n--- Testando Conexão Supabase ---');
    }

    console.log(`🔌 Tentando conectar ao Supabase (Tentativa ${retries + 1}/${MAX_RETRIES})...`);
    try {
        // Tentamos buscar uma linha simples de uma tabela conhecida (ex: 'animes')
        // para verificar a conectividade e a autenticação.
        const { error: initialError } = await supabase.from('animes').select('id').limit(1);

        if (initialError) {
            // Tratamento específico para erros comuns de conexão
            if (initialError.message.includes('timeout')) {
                console.warn(`⚠️ Erro de Timeout na conexão Supabase: ${initialError.message}`);
            } else if (initialError.message.includes('database is unavailable')) {
                 console.warn(`⚠️ Banco de dados Supabase indisponível: ${initialError.message}`);
            } else if (initialError.code) {
                console.warn(`⚠️ Erro Supabase (Código: ${initialError.code}): ${initialError.message}`);
            } else {
                console.warn(`⚠️ Erro Supabase desconhecido: ${initialError.message}`);
            }
            throw new Error(`Falha na conexão Supabase: ${initialError.message}`);
        }

        console.log('✅ Conexão Supabase estabelecida com sucesso! Banco de dados pronto para uso.');
        return true; // Conexão bem-sucedida

    } catch (err) {
        // Erros de AbortController (timeout) também serão capturados aqui
        if (err.name === 'AbortError') {
            console.warn(`⚠️ Reaquisição Supabase: A requisição excedeu o tempo limite (15s).`);
        } else {
            console.warn(`⚠️ Erro ao testar conexão Supabase: ${err.message}`);
        }

        if (retries < MAX_RETRIES - 1) {
            console.log(`🔄 Re-tentando em ${RETRY_DELAY_MS / 1000} segundos...`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
            return testSupabaseConnection(retries + 1); // Tenta novamente
        } else {
            console.error(`\n❌ FALHA CRÍTICA: Não foi possível conectar ao Supabase após ${MAX_RETRIES} tentativas.`);
            console.error('   Por favor, verifique:');
            console.error('   - Suas variáveis de ambiente (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY).');
            console.error('   - As regras de RLS (Row Level Security) no Supabase para a tabela "animes" (ou qualquer tabela que você esteja usando para teste).');
            console.error('   - O status do seu projeto Supabase.');
            console.error('   - Se o seu ambiente de hospedagem (Render) possui acesso à internet para o Supabase.');
            return false; // Falha na conexão após todas as tentativas
        }
    }
}

// --- 4. Exportações ---
module.exports = {
    supabase,          // Cliente Supabase padrão (com chave anon, para uso geral)
    supabaseAdmin,     // Cliente Supabase com Service Role (para operações privilegiadas de backend)
    testSupabaseConnection,
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY,
    initError, // Exporta o status de erro de inicialização
};

// Se este arquivo for executado diretamente (para teste), ele testará a conexão.
if (require.main === module) {
    (async () => {
        console.log('--- Executando teste de conexão Supabase independente ---');
        const isConnected = await testSupabaseConnection();
        console.log(`\nEstado final da conexão Supabase: ${isConnected ? '✅ CONECTADO' : '❌ DESCONECTADO'}`);
        if (!isConnected) {
            console.error('O aplicativo pode ter problemas de funcionalidade devido à falta de conexão com o banco de dados.');
        }
    })();
}