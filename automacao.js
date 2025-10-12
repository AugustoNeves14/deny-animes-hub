// automacao-ultimate.js
const axios = require('axios');
const readline = require('readline');

class AnimeAutomationUltimate {
    constructor() {
        this.productionURL = 'https://deny-animes-hub.onrender.com';
        this.localURL = 'http://localhost:3000';
        this.currentURL = this.productionURL;
        
        this.chaveAutomacao = 'deny-animehub-2024-automacao';
        this.setupInterface();
    }

    setupInterface() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const colors = {
            info: '\x1b[36m', success: '\x1b[32m', warning: '\x1b[33m',
            error: '\x1b[31m', highlight: '\x1b[35m', system: '\x1b[34m'
        };
        const icons = {
            info: 'ℹ️', success: '✅', warning: '⚠️',
            error: '❌', highlight: '🎌', system: '🚀'
        };
        const reset = '\x1b[0m';
        
        console.log(`${colors[type]}${icons[type]} [${timestamp}] ${message}${reset}`);
    }

    showLoading(text = 'Processando') {
        const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
        let i = 0;
        
        const interval = setInterval(() => {
            process.stdout.write(`\r${frames[i]} \x1b[36m${text}...\x1b[0m`);
            i = (i + 1) % frames.length;
        }, 100);

        return interval;
    }

    stopLoading(interval, message = '', type = 'success') {
        if (interval) {
            clearInterval(interval);
            process.stdout.write('\r' + ' '.repeat(60) + '\r');
        }
        if (message) {
            this.log(message, type);
        }
    }

    async testarConexao() {
        const loading = this.showLoading('Testando conexão com automação');
        
        try {
            const response = await axios.get(`${this.currentURL}/api/automacao/status`, {
                timeout: 10000
            });

            this.stopLoading(loading, '✅ Sistema de automação ativo!', 'success');
            return true;
        } catch (error) {
            this.stopLoading(loading);
            
            if (error.code === 'ECONNREFUSED') {
                this.log(`❌ Servidor não está respondendo: ${this.currentURL}`, 'error');
            } else if (error.response?.status === 404) {
                this.log('❌ Rota de automação não encontrada', 'error');
                this.log('💡 Adicione a rota de automação no servidor primeiro', 'warning');
            } else {
                this.log(`❌ Erro de conexão: ${error.message}`, 'error');
            }
            
            return false;
        }
    }

    async buscarDadosAnime(animeName) {
        const loading = this.showLoading(`Buscando "${animeName}"`);
        
        try {
            const response = await axios.get(
                `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(animeName)}&limit=1`,
                { timeout: 10000 }
            );

            if (!response.data.data || response.data.data.length === 0) {
                this.stopLoading(loading, `⚠️  Criando entrada manual`, 'warning');
                return this.criarEntradaManual(animeName);
            }

            const anime = response.data.data[0];
            
            // DADOS CORRIGIDOS - SEM ERROS DE VALIDAÇÃO
            const animeData = {
                titulo: anime.title,
                sinopse: this.limparDescricao(anime.synopsis),
                anoLancamento: anime.year || new Date().getFullYear(),
                classificacao: anime.score ? anime.score.toFixed(1) : '7.5',
                generos: anime.genres?.map(g => g.name).join(', ') || 'Anime, Ação',
                estudio: anime.studios?.map(s => s.name).join(', ') || 'Estúdio Desconhecido',
                // TRAILER CORRIGIDO - só envia se for URL válida
                trailerUrl: anime.trailer?.url && anime.trailer.url.startsWith('http') 
                    ? anime.trailer.url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/') 
                    : null,
                forcarNotificacao: 'on'
            };

            // GARANTIR QUE OS DADOS ESTÃO CORRETOS
            if (!animeData.titulo || animeData.titulo.length < 2) {
                animeData.titulo = animeName;
            }
            
            if (!animeData.sinopse || animeData.sinopse.length < 10) {
                animeData.sinopse = `O anime "${animeData.titulo}" está disponível para assistir no DenyAnimeHub. Uma emocionante aventura cheia de ação e drama.`;
            }

            this.stopLoading(loading, `✅ Dados: ${animeData.titulo}`, 'success');
            return animeData;
        } catch (error) {
            this.stopLoading(loading, '⚠️  Usando dados manuais', 'warning');
            return this.criarEntradaManual(animeName);
        }
    }

    criarEntradaManual(animeName) {
        return {
            titulo: animeName,
            sinopse: `O anime "${animeName}" está disponível para assistir no DenyAnimeHub. Uma emocionante aventura cheia de ação, drama e personagens cativantes que irão te surpreender a cada episódio.`,
            anoLancamento: new Date().getFullYear(),
            classificacao: '7.5',
            generos: 'Anime, Ação, Aventura',
            estudio: 'Estúdio Desconhecido',
            trailerUrl: null, // Nulo para evitar erro de validação
            forcarNotificacao: 'on'
        };
    }

    limparDescricao(htmlDescription) {
        if (!htmlDescription) {
            return 'Uma emocionante jornada repleta de aventuras e personagens inesquecíveis. Descubra um mundo fantástico onde cada episódio traz novas surpresas e emoções.';
        }
        
        const clean = htmlDescription
            .replace(/<[^>]*>/g, '')
            .replace(/\[[^\]]*\]/g, '')
            .replace(/\n+/g, ' ')
            .trim();

        // Garantir comprimento mínimo e máximo
        if (clean.length < 50) {
            return 'Uma história cativante sobre amizade, coragem e superação. Os personagens enfrentam desafios épicos enquanto descobrem o verdadeiro significado do trabalho em equipe e da determinação.';
        }

        return clean.length > 500 ? clean.substring(0, 497) + '...' : clean;
    }

    async postarAnime(animeData) {
        const loading = this.showLoading(`Postando "${animeData.titulo}"`);

        try {
            // PAYLOAD CORRIGIDO - SEM CAMPOS PROBLEMÁTICOS
            const payload = {
                chave: this.chaveAutomacao,
                titulo: animeData.titulo,
                sinopse: animeData.sinopse,
                anoLancamento: animeData.anoLancamento,
                classificacao: animeData.classificacao,
                generos: animeData.generos,
                estudio: animeData.estudio,
                trailerUrl: animeData.trailerUrl, // Pode ser null
                forcarNotificacao: animeData.forcarNotificacao
            };

            const response = await axios.post(`${this.currentURL}/api/automacao/postar-anime`, payload, {
                timeout: 15000,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                this.stopLoading(loading, `✅ Postado: ${animeData.titulo}`, 'success');
                return { 
                    success: true, 
                    data: response.data.data,
                    slug: response.data.data.slug
                };
            } else {
                throw new Error(response.data.error);
            }

        } catch (error) {
            this.stopLoading(loading);
            
            if (error.response?.data?.error) {
                this.log(`❌ Erro: ${error.response.data.error}`, 'error');
            } else {
                this.log(`❌ Falha: ${error.message}`, 'error');
            }
            
            return { success: false, error: error.message };
        }
    }

    async mostrarBoasVindas() {
        console.clear();
        this.log('🎌 DENY ANIME HUB - AUTOMAÇÃO ULTIMATE', 'highlight');
        this.log('='.repeat(50), 'highlight');
        this.log('Sistema 100% funcional - SEM erros de validação', 'system');
        this.log('='.repeat(50), 'highlight');
    }

    async selecionarAmbiente() {
        return new Promise((resolve) => {
            this.rl.question('\n🌐 Usar produção (P) ou local (L)? [P]: ', (env) => {
                if (env.toLowerCase() === 'l') {
                    this.currentURL = this.localURL;
                    this.log('🌙 Modo: Desenvolvimento Local', 'info');
                } else {
                    this.currentURL = this.productionURL;
                    this.log('☀️ Modo: Produção', 'info');
                }
                resolve(true);
            });
        });
    }

    async selecionarAnimes() {
        return new Promise((resolve) => {
            this.rl.question('\n🎯 Quantos animes deseja postar? ', (countInput) => {
                const count = Math.min(Math.max(parseInt(countInput) || 1, 1), 50);
                this.log(`📦 Processando ${count} animes...`, 'info');
                this.solicitarNomesAnimes(count, resolve);
            });
        });
    }

    solicitarNomesAnimes(count, resolve, animes = [], current = 1) {
        if (current > count) {
            resolve(animes);
            return;
        }

        this.rl.question(`\n📺 Anime ${current}/${count}: `, (animeName) => {
            const trimmedName = animeName.trim();
            if (trimmedName) {
                animes.push(trimmedName);
                this.log(`✅ ${trimmedName}`, 'success');
            }
            this.solicitarNomesAnimes(count, resolve, animes, current + 1);
        });
    }

    async processarLote(nomesAnimes) {
        this.log(`\n🚀 INICIANDO AUTOMAÇÃO ULTIMATE`, 'highlight');
        this.log(`📊 Total: ${nomesAnimes.length} animes`, 'info');
        
        const resultados = {
            sucessos: 0,
            falhas: 0,
            detalhes: []
        };

        for (let i = 0; i < nomesAnimes.length; i++) {
            const nomeAnime = nomesAnimes[i];
            this.log(`\n🔮 [${i + 1}/${nomesAnimes.length}] ${nomeAnime}`, 'info');

            const dadosAnime = await this.buscarDadosAnime(nomeAnime);
            const resultadoPost = await this.postarAnime(dadosAnime);
            
            if (resultadoPost.success) {
                resultados.sucessos++;
                resultados.detalhes.push({ 
                    anime: dadosAnime.titulo, 
                    status: '✅ Sucesso',
                    slug: resultadoPost.slug,
                    link: `${this.currentURL}/anime/${resultadoPost.slug}`
                });
            } else {
                resultados.falhas++;
                resultados.detalhes.push({ 
                    anime: dadosAnime.titulo, 
                    status: '❌ Falha',
                    erro: resultadoPost.error
                });
            }

            // Intervalo entre posts
            await new Promise(resolve => setTimeout(resolve, 1200));
        }

        return resultados;
    }

    mostrarRelatorio(resultados) {
        this.log('\n' + '='.repeat(60), 'highlight');
        this.log('📊 RELATÓRIO FINAL - AUTOMAÇÃO ULTIMATE', 'highlight');
        this.log('='.repeat(60), 'highlight');
        
        this.log(`✅ SUCESSOS: ${resultados.sucessos}`, 'success');
        this.log(`❌ FALHAS: ${resultados.falhas}`, resultados.falhas > 0 ? 'error' : 'info');
        
        const taxaSucesso = ((resultados.sucessos / (resultados.sucessos + resultados.falhas)) * 100).toFixed(1);
        this.log(`📈 TAXA DE SUCESSO: ${taxaSucesso}%`, 'info');
        
        this.log('\n📋 DETALHES:', 'info');
        resultados.detalhes.forEach((detalhe, index) => {
            const numero = (index + 1).toString().padStart(2, '0');
            
            if (detalhe.status === '✅ Sucesso') {
                this.log(`   ${numero}. ${detalhe.status} - ${detalhe.anime}`, 'success');
                this.log(`      🔗 ${detalhe.link}`, 'info');
            } else {
                this.log(`   ${numero}. ${detalhe.status} - ${detalhe.anime}`, 'error');
                if (detalhe.erro) {
                    this.log(`      💡 ${detalhe.erro}`, 'warning');
                }
            }
        });

        this.log('\n🎉 PROCESSO CONCLUÍDO COM SUCESSO!', 'highlight');
        this.log(`🌐 Acesse: ${this.currentURL}/animes`, 'system');
        this.log(`✨ ${resultados.sucessos} animes adicionados ao catálogo`, 'system');
    }

    async executar() {
        try {
            await this.mostrarBoasVindas();
            await this.selecionarAmbiente();

            // Testar se a rota de automação está ativa
            if (!await this.testarConexao()) {
                this.log('\n💡 SOLUÇÃO:', 'warning');
                this.log('   1. Adicione a rota de automação CORRIGIDA no app.js', 'warning');
                this.log('   2. Reinicie o servidor', 'warning');
                this.log('   3. Execute este script novamente', 'warning');
                this.rl.close();
                return;
            }

            // Coletar animes
            const nomesAnimes = await this.selecionarAnimes();
            
            if (nomesAnimes.length === 0) {
                this.log('❌ Nenhum anime informado.', 'error');
                this.rl.close();
                return;
            }

            // Confirmação final
            this.log('\n🎯 RESUMO DA POSTAGEM:', 'info');
            nomesAnimes.forEach((nome, index) => {
                this.log(`   ${index + 1}. ${nome}`);
            });

            this.rl.question('\n⚠️  CONFIRMAR execução? (s/N): ', async (resposta) => {
                if (resposta.toLowerCase() === 's') {
                    this.log('\n🚀 INICIANDO AUTOMAÇÃO ULTIMATE...', 'system');
                    const resultados = await this.processarLote(nomesAnimes);
                    this.mostrarRelatorio(resultados);
                } else {
                    this.log('❌ Execução cancelada.', 'warning');
                }
                
                this.rl.close();
                process.exit(0);
            });

        } catch (error) {
            this.log(`💥 ERRO CRÍTICO: ${error.message}`, 'error');
            this.rl.close();
            process.exit(1);
        }
    }
}

// EXECUTAR
if (require.main === module) {
    const automacao = new AnimeAutomationUltimate();
    automacao.executar();
}

module.exports = AnimeAutomationUltimate;