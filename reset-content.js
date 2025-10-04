// ======================================================================
//              Jutsu de Reset: Limpeza de Conteúdo Legado
//
// ATENÇÃO: Este script APAGA TODOS os animes, episódios e posts do
// seu banco de dados. Use-o UMA VEZ para limpar os dados antigos que não
// possuem slugs e começar do zero com a nova estrutura.
//
// Como usar: node reset-content.js
// ======================================================================

require('dotenv').config(); // Carrega as variáveis de ambiente
const { sequelize, Anime, Post } = require('./models');

const resetContent = async () => {
    console.log('🔥 INICIANDO JUTSU DE RESET DE CONTEÚDO... 🔥');

    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com o banco de dados estabelecida.');

        // O Sequelize é inteligente. Como o modelo Anime tem 'onDelete: CASCADE'
        // para os episódios, ao apagar um anime, todos os seus episódios
        // associados serão apagados automaticamente.

        console.log('\n🔄 Apagando todos os animes e episódios associados...');
        const animesDeletados = await Anime.destroy({
            where: {}, // where vazio significa "todos"
            truncate: true, // Opção mais eficiente para apagar tudo
            cascade: true
        });
        console.log(`✅ ${animesDeletados} registros de animes (e seus episódios) foram apagados.`);

        console.log('\n🔄 Apagando todas as notícias (posts)...');
        const postsDeletados = await Post.destroy({
            where: {},
            truncate: true,
            cascade: true
        });
        console.log(`✅ ${postsDeletados} registros de posts foram apagados.`);
        
        console.log('\n🎉 LIMPEZA COMPLETA! Seu banco de dados está pronto para receber conteúdo novo com slugs.');

    } catch (error) {
        console.error('\n❌ Ocorreu um erro fatal durante a limpeza:', error);
        console.error('\n   Verifique se a conexão com o banco está correta e tente novamente.');
    } finally {
        await sequelize.close();
        console.log('\nConexão com o banco de dados encerrada.');
    }
};

resetContent();