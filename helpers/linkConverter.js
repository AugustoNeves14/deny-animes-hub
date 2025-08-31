// ==================================================================================================
//
//              DenyAnimeHub - Helper: Conversor de Links (Versão Definitiva e Robusta)
//
// Versão:        5.0 (Final "Rinnegan")
// Descrição:     Esta é a versão definitiva do conversor de links, combinando a lógica
//                precisa com a máxima robustez. Garante o tratamento correto de URLs do
//                Google Drive usando a rota de /preview para compatibilidade com iframes,
//                lida com outros serviços e possui fallbacks seguros para qualquer
//                formato de URL inesperado ou tipo não suportado, evitando quebras na aplicação.
//                O código é extensivamente documentado para clareza e manutenção.
//
// ==================================================================================================

'use strict';

/**
 * Converte URLs de diversas fontes para um formato "embeddable" (incorporável) e seguro.
 * A função é projetada para ser robusta, com validações de entrada, tratamento de erros
 * e logging detalhado para facilitar a depuração.
 *
 * @param {string} url - A URL original a ser convertida.
 * @param {string} type - O tipo de serviço (ex: 'gdrive', 'mega', 'mediafire', 'iframe').
 * @returns {string|null} A URL processada e pronta para o player. Retorna a URL original
 *                        como fallback em caso de falha na conversão específica, ou `null`
 *                        se a entrada inicial for completamente inválida.
 */
function convertToEmbedUrl(url, type) {
    // --- 1. VALIDAÇÃO DE ENTRADA ESSENCIAL ---
    // Impede a execução com dados nulos, indefinidos, que não são string ou vazios.
    if (!url || typeof url !== 'string' || url.trim() === '') {
        console.error("[linkConverter] ERRO: URL fornecida é inválida, nula ou vazia. Impossível converter.");
        return null; // Retorna null pois não há o que processar.
    }

    try {
        // --- 2. LÓGICA PRINCIPAL PARA GOOGLE DRIVE (A CORREÇÃO CRÍTICA) ---
        if (type === 'gdrive') {
            // Expressão regular robusta para extrair o ID do arquivo de múltiplos formatos de URL do Google Drive.
            const regex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|drive\/folders\/))([a-zA-Z0-9_-]{25,})/;
            const match = url.match(regex);

            if (match && match[1]) {
                const fileId = match[1];
                // A URL de /preview é a única garantida para funcionar em iframes, resolvendo problemas de permissão.
                const embeddableUrl = `https://drive.google.com/file/d/${fileId}/preview`;
                console.log(`[linkConverter] INFO: Link do Google Drive convertido com sucesso para: ${embeddableUrl}`);
                return embeddableUrl;
            } else {
                // Se a regex falhar, o formato do link é desconhecido.
                console.warn(`[linkConverter] AVISO: Formato da URL do GDrive não reconhecido. Não foi possível extrair o ID. Retornando URL original como fallback: ${url}`);
                return url; // Fallback de segurança: retorna a URL original.
            }
        }

        // --- 3. LÓGICA PARA OUTROS SERVIÇOS ---
        // Utiliza um array para verificar múltiplos tipos de forma limpa.
        if (['mega', 'mediafire', 'iframe'].includes(type)) {
            // Tratamento específico para links do Mega.nz
            if (type === 'mega' && url.includes('/file/')) {
                const embedUrl = url.replace('/file/', '/embed/');
                console.log(`[linkConverter] INFO: Link do Mega convertido para formato de incorporação: ${embedUrl}`);
                return embedUrl;
            }
            
            // Para 'mediafire' e 'iframe', a URL geralmente já está no formato correto.
            console.log(`[linkConverter] INFO: URL do tipo '${type}' utilizada diretamente sem conversão.`);
            return url;
        }

        // --- 4. FALLBACK PARA TIPOS NÃO SUPORTADOS ---
        // Se o 'type' não corresponder a nenhuma das lógicas acima.
        console.warn(`[linkConverter] AVISO: Tipo de link '${type}' não é suportado ou reconhecido. Retornando URL original.`);
        return url;

    } catch (error) {
        // --- 5. CAPTURA DE ERRO GERAL ---
        // Pega qualquer erro inesperado durante o processamento da string.
        console.error(`[linkConverter] ERRO CRÍTICO INESPERADO ao tentar converter a URL '${url}' do tipo '${type}':`, error);
        // Retorna a URL original como o fallback mais seguro para não interromper a aplicação.
        return url;
    }
}

// Exporta a função para ser utilizada em outras partes do sistema.
module.exports = {
    convertToEmbedUrl
};