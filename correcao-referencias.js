// correcao-referencias.js
const fs = require('fs');
const path = require('path');

function corrigirReferencias() {
    console.log('🔍 Procurando e corrigindo referências antigas...');
    
    const diretorios = ['views', 'public', 'controllers'];
    let arquivosCorrigidos = 0;
    
    diretorios.forEach(dir => {
        const dirPath = path.join(__dirname, dir);
        if (fs.existsSync(dirPath)) {
            arquivosCorrigidos += processarDiretorio(dirPath);
        }
    });
    
    console.log(`✅ ${arquivosCorrigidos} arquivos corrigidos`);
}

function processarDiretorio(diretorio) {
    let correcoes = 0;
    const itens = fs.readdirSync(diretorio);
    
    itens.forEach(item => {
        const itemPath = path.join(diretorio, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
            correcoes += processarDiretorio(itemPath);
        } else if (stat.isFile() && 
                  (item.endsWith('.ejs') || item.endsWith('.js') || item.endsWith('.html'))) {
            let conteudo = fs.readFileSync(itemPath, 'utf8');
            const conteudoOriginal = conteudo;
            
            // Substituir referências antigas
            conteudo = conteudo.replace(/\/uploads\/(capas|avatars)\//g, '/db-image/file/');
            conteudo = conteudo.replace(/\/uploads\//g, '/db-image/file/');
            
            if (conteudo !== conteudoOriginal) {
                fs.writeFileSync(itemPath, conteudo, 'utf8');
                console.log(`📝 Corrigido: ${itemPath}`);
                correcoes++;
            }
        }
    });
    
    return correcoes;
}

corrigirReferencias();