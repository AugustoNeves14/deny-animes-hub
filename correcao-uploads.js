// correcao-uploads.js
const fs = require('fs');
const path = require('path');

// Função para substituir referências antigas por novas
function substituirReferencias() {
    const diretorios = ['views', 'public', 'controllers'];
    
    diretorios.forEach(dir => {
        const dirPath = path.join(__dirname, dir);
        if (fs.existsSync(dirPath)) {
            substituirNoDiretorio(dirPath);
        }
    });
    
    console.log('✅ Substituição de referências concluída');
}

function substituirNoDiretorio(diretorio) {
    const itens = fs.readdirSync(diretorio);
    
    itens.forEach(item => {
        const itemPath = path.join(diretorio, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
            substituirNoDiretorio(itemPath);
        } else if (stat.isFile() && 
                  (item.endsWith('.ejs') || item.endsWith('.js') || item.endsWith('.html'))) {
            let conteudo = fs.readFileSync(itemPath, 'utf8');
            
            // Substituir referências antigas
            conteudo = conteudo.replace(/\/uploads\/(capas|avatars)\//g, '/db-image/file/');
            
            fs.writeFileSync(itemPath, conteudo, 'utf8');
            console.log(`📝 Atualizado: ${itemPath}`);
        }
    });
}

// Executar correção
substituirReferencias();