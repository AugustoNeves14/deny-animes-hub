// ====================================================================================
//
//              DenyAnimeHub - Controller: Proxy de Download (Susanoo)
//
// Versão:        1.0
// Descrição:     Este controller atua como um intermediário para forçar o download
//                direto de arquivos hospedados em serviços de terceiros.
//
// ====================================================================================

const axios = require('axios');

exports.proxyDownload = async (req, res) => {
    try {
        const externalUrl = req.query.url;
        let filename = req.query.filename || 'download.mp4';

        if (!externalUrl) {
            return res.status(400).send('URL externa não fornecida.');
        }
        
        // Decodifica a URL para garantir que ela esteja no formato correto
        const decodedUrl = decodeURIComponent(externalUrl);

        // Define o cabeçalho que FORÇA o navegador a tratar a resposta como um download
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        // Faz a requisição para a URL externa, solicitando a resposta como um stream
        const response = await axios({
            method: 'GET',
            url: decodedUrl,
            responseType: 'stream'
        });

        // Define o tipo de conteúdo da resposta com base no que o servidor externo enviou
        res.setHeader('Content-Type', response.headers['content-type']);
        
        // "Conecta" o stream de download do servidor externo diretamente à resposta para o usuário.
        // Isso é crucial para a eficiência, pois o arquivo não é salvo no seu servidor primeiro.
        response.data.pipe(res);

    } catch (error) {
        console.error("Erro no proxy de download:", error.message);
        res.status(500).send('Falha ao buscar o arquivo externo.');
    }
};