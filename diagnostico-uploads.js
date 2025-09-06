#!/usr/bin/env node
"use strict";

/**
 * SCRIPT DE DIAGNÓSTICO COMPLETO - SISTEMA DE UPLOAD DE IMAGENS
 * Este script verifica todos os componentes do sistema de upload e identifica problemas.
 */

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const crypto = require('crypto');
const mime = require('mime-types');
const simpleGit = require('simple-git');

class DiagnosticoUploads {
    constructor() {
        this.resultados = [];
        this.erros = [];
        this.avisos = [];
        this.config = {
            DB_URL: process.env.DATABASE_URL,
            UPLOAD_DIRS: [
                path.join(__dirname, 'public', 'uploads', 'capas'),
                path.join(__dirname, 'public', 'uploads', 'avatars')
            ]
        };
    }

    async executar() {
        console.log('🚀 INICIANDO DIAGNÓSTICO DO SISTEMA DE UPLOADS...\n');
        
        // Executar todas as verificações
        await this.verificarVariaveisAmbiente();
        await this.verificarConexaoBanco();
        await this.verificarTabelaImagens();
        await this.verificarDiretoriosUpload();
        await this.verificarMiddlewareUpload();
        await this.verificarRotasImagens();
        await this.verificarConfiguracaoMulter();
        await this.verificarControllers();
        await this.verificarFrontend();
        
        // Exibir resultados
        this.exibirRelatorio();
    }

    async verificarVariaveisAmbiente() {
        console.log('1. Verificando variáveis de ambiente...');
        
        if (!this.config.DB_URL) {
            this.erros.push('❌ DATABASE_URL não está definida nas variáveis de ambiente');
        } else {
            this.resultados.push('✅ DATABASE_URL configurada');
        }

        if (!process.env.JWT_SECRET) {
            this.avisos.push('⚠️  JWT_SECRET não definida (pode afetar autenticação)');
        }
    }

    async verificarConexaoBanco() {
        console.log('2. Testando conexão com o banco de dados...');
        
        if (!this.config.DB_URL) {
            this.erros.push('❌ Não é possível testar conexão: DATABASE_URL não definida');
            return;
        }

        try {
            const client = new Client({ connectionString: this.config.DB_URL });
            await client.connect();
            await client.query('SELECT 1');
            await client.end();
            this.resultados.push('✅ Conexão com o banco estabelecida com sucesso');
        } catch (error) {
            this.erros.push(`❌ Falha na conexão com o banco: ${error.message}`);
        }
    }

    async verificarTabelaImagens() {
        console.log('3. Verificando tabela de imagens no banco...');
        
        if (!this.config.DB_URL) return;

        try {
            const client = new Client({ connectionString: this.config.DB_URL });
            await client.connect();
            
            // Verificar se a tabela existe
            const tableCheck = await client.query(`
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_name = 'stored_images'
                );
            `);
            
            if (!tableCheck.rows[0].exists) {
                this.erros.push('❌ Tabela stored_images não existe no banco');
                await client.end();
                return;
            }
            
            this.resultados.push('✅ Tabela stored_images existe');
            
            // Verificar estrutura da tabela
            const structureCheck = await client.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = 'stored_images'
                ORDER BY ordinal_position;
            `);
            
            const colunasEsperadas = ['id', 'filename', 'mimetype', 'sha1', 'data', 'created_at'];
            const colunasEncontradas = structureCheck.rows.map(row => row.column_name);
            
            const colunasFaltantes = colunasEsperadas.filter(col => !colunasEncontradas.includes(col));
            if (colunasFaltantes.length > 0) {
                this.erros.push(`❌ Colunas faltantes na tabela: ${colunasFaltantes.join(', ')}`);
            } else {
                this.resultados.push('✅ Estrutura da tabela está correta');
            }
            
            // Verificar se há imagens no banco
            const countCheck = await client.query('SELECT COUNT(*) FROM stored_images');
            this.resultados.push(`✅ ${countCheck.rows[0].count} imagens encontradas no banco`);
            
            await client.end();
            
        } catch (error) {
            this.erros.push(`❌ Erro ao verificar tabela: ${error.message}`);
        }
    }

    async verificarDiretoriosUpload() {
        console.log('4. Verificando diretórios de upload...');
        
        this.config.UPLOAD_DIRS.forEach(dir => {
            if (fs.existsSync(dir)) {
                const files = fs.readdirSync(dir).filter(file => 
                    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
                );
                
                if (files.length > 0) {
                    this.avisos.push(`⚠️  ${files.length} imagens encontradas em ${dir} (podem ser migradas)`);
                } else {
                    this.resultados.push(`✅ Diretório ${dir} está vazio (bom sinal)`);
                }
            } else {
                this.resultados.push(`✅ Diretório ${dir} não existe (imagens estão no banco)`);
            }
        });
    }

    async verificarMiddlewareUpload() {
        console.log('5. Verificando middlewares de upload...');
        
        const middlewares = [
            'middleware/uploadMiddleware.db.js',
            'middleware/dbImageStore.js'
        ];
        
        middlewares.forEach(mw => {
            const filePath = path.join(__dirname, mw);
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf8');
                
                // Verificar se está usando memoryStorage
                if (content.includes('memoryStorage')) {
                    this.resultados.push(`✅ ${mw} está configurado para memoryStorage`);
                } else {
                    this.erros.push(`❌ ${mw} não está usando memoryStorage`);
                }
                
                // Verificar se está usando persistUpload
                if (content.includes('persistUpload')) {
                    this.resultados.push(`✅ ${mw} está usando persistUpload`);
                }
                
            } else {
                this.erros.push(`❌ Arquivo de middleware não encontrado: ${mw}`);
            }
        });
    }

    async verificarRotasImagens() {
        console.log('6. Verificando rotas de imagens...');
        
        const routesFile = path.join(__dirname, 'routes', 'dbImageRoute.js');
        if (!fs.existsSync(routesFile)) {
            this.erros.push('❌ Rota de imagens não encontrada: routes/dbImageRoute.js');
            return;
        }
        
        const content = fs.readFileSync(routesFile, 'utf8');
        
        // Verificar se as rotas estão definidas
        if (content.includes('/db-image/id/')) {
            this.resultados.push('✅ Rota /db-image/id/:id está definida');
        } else {
            this.erros.push('❌ Rota /db-image/id/:id não encontrada');
        }
        
        if (content.includes('/db-image/file/')) {
            this.resultados.push('✅ Rota /db-image/file/:filename está definida');
        } else {
            this.erros.push('❌ Rota /db-image/file/:filename não encontrada');
        }
    }

    async verificarConfiguracaoMulter() {
        console.log('7. Verificando configuração do Multer...');
        
        const uploadMiddlewarePath = path.join(__dirname, 'middleware', 'uploadMiddleware.db.js');
        if (!fs.existsSync(uploadMiddlewarePath)) {
            this.erros.push('❌ Middleware de upload não encontrado');
            return;
        }
        
        const content = fs.readFileSync(uploadMiddlewarePath, 'utf8');
        
        // Verificar limites de tamanho
        if (content.includes('15 * 1024 * 1024')) {
            this.resultados.push('✅ Limite de 15MB para imagens configurado');
        } else {
            this.avisos.push('⚠️  Limite de tamanho para imagens não padronizado');
        }
        
        // Verificar filtros de tipo de arquivo
        if (content.includes('imageFilter')) {
            this.resultados.push('✅ Filtro de imagens configurado');
        }
    }

    async verificarControllers() {
        console.log('8. Verificando controllers...');
        
        const controllers = [
            'controllers/userController.js',
            'controllers/animeController.js',
            'controllers/postController.js'
        ];
        
        let controllersUsandoUpload = 0;
        
        controllers.forEach(controller => {
            const filePath = path.join(__dirname, controller);
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf8');
                
                if (content.includes('req.fileUrl') || content.includes('req.filesUrl')) {
                    controllersUsandoUpload++;
                    this.resultados.push(`✅ ${controller} está usando URLs do banco`);
                }
                
                if (content.includes('/uploads/')) {
                    this.erros.push(`❌ ${controller} ainda referencia caminhos locais (/uploads/)`);
                }
            }
        });
        
        if (controllersUsandoUpload > 0) {
            this.resultados.push(`✅ ${controllersUsandoUpload} controllers estão configurados para banco`);
        }
    }

    async verificarFrontend() {
        console.log('9. Verificando frontend...');
        
        // Verificar views EJS
        const viewsDir = path.join(__dirname, 'views');
        if (fs.existsSync(viewsDir)) {
            const ejsFiles = fs.readdirSync(viewsDir).filter(file => file.endsWith('.ejs'));
            let viewsComUrlsAntigas = 0;
            
            ejsFiles.forEach(file => {
                const content = fs.readFileSync(path.join(viewsDir, file), 'utf8');
                if (content.includes('/uploads/')) {
                    viewsComUrlsAntigas++;
                }
            });
            
            if (viewsComUrlsAntigas > 0) {
                this.erros.push(`❌ ${viewsComUrlsAntigas} views ainda referenciam /uploads/ (devem usar /db-image/)`);
            } else {
                this.resultados.push('✅ Views estão usando URLs do banco');
            }
        }
        
        // Verificar arquivos estáticos
        const publicDir = path.join(__dirname, 'public');
        if (fs.existsSync(publicDir)) {
            const jsFiles = this.buscarArquivosPorExtensao(publicDir, ['.js']);
            let jsComUrlsAntigas = 0;
            
            jsFiles.forEach(file => {
                const content = fs.readFileSync(file, 'utf8');
                if (content.includes('/uploads/')) {
                    jsComUrlsAntigas++;
                }
            });
            
            if (jsComUrlsAntigas > 0) {
                this.avisos.push(`⚠️  ${jsComUrlsAntigas} arquivos JS ainda referenciam /uploads/`);
            }
        }
    }

    buscarArquivosPorExtensao(diretorio, extensoes, arquivos = []) {
        const itens = fs.readdirSync(diretorio);
        
        itens.forEach(item => {
            const itemPath = path.join(diretorio, item);
            const stat = fs.statSync(itemPath);
            
            if (stat.isDirectory()) {
                this.buscarArquivosPorExtensao(itemPath, extensoes, arquivos);
            } else if (extensoes.includes(path.extname(item).toLowerCase())) {
                arquivos.push(itemPath);
            }
        });
        
        return arquivos;
    }

    exibirRelatorio() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 RELATÓRIO DE DIAGNÓSTICO - SISTEMA DE UPLOAD');
        console.log('='.repeat(60));
        
        // Exibir erros críticos primeiro
        if (this.erros.length > 0) {
            console.log('\n🚨 ERROS CRÍTICOS:');
            this.erros.forEach(erro => console.log(erro));
        }
        
        // Exibir avisos
        if (this.avisos.length > 0) {
            console.log('\n⚠️  AVISOS:');
            this.avisos.forEach(aviso => console.log(aviso));
        }
        
        // Exibir resultados positivos
        if (this.resultados.length > 0) {
            console.log('\n✅ RESULTADOS POSITIVOS:');
            this.resultados.forEach(resultado => console.log(resultado));
        }
        
        console.log('\n' + '='.repeat(60));
        
        // Resumo e recomendações
        if (this.erros.length === 0 && this.avisos.length === 0) {
            console.log('🎉 TUDO PARECE CORRETO! O sistema de upload deve funcionar perfeitamente.');
        } else {
            console.log('💡 RECOMENDAÇÕES:');
            
            if (this.erros.some(e => e.includes('DATABASE_URL'))) {
                console.log('• Verifique se a variável DATABASE_URL está configurada no Render');
            }
            
            if (this.erros.some(e => e.includes('tabela'))) {
                console.log('• Execute o script de migração para criar a tabela stored_images');
            }
            
            if (this.erros.some(e => e.includes('/uploads/'))) {
                console.log('• Atualize todas as referências para usar /db-image/ em vez de /uploads/');
            }
            
            if (this.avisos.some(a => a.includes('imagens encontradas'))) {
                console.log('• Execute o script de migração para mover imagens locais para o banco');
            }
        }
        
        console.log('='.repeat(60));
    }
}

// Executar o diagnóstico
const diagnostico = new DiagnosticoUploads();
diagnostico.executar().catch(console.error);