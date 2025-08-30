// ====================================================================================
//
//              DenyAnimeHub - Script Inteligente de Reset Total do Banco
//
// ====================================================================================

'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
// Supondo que você tem um arquivo config.json com as credenciais do Supabase (PostgreSQL)
const config = require(path.join(__dirname, 'config', 'config.json'))[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'postgres',
    // === ALTERAÇÃO AQUI: Desativar SSL ===
    dialectOptions: {
        // Se o seu servidor PostgreSQL não suporta SSL ou não o exige,
        // remova a propriedade `ssl` ou defina `ssl: false`.
        // Para a maioria dos ambientes de desenvolvimento local, `ssl` não é necessário.
        // Se você está realmente usando Supabase, é muito provável que `require: true` e `rejectUnauthorized: false`
        // seja o correto. O fato de você receber este erro pode indicar que
        // você está se conectando a um banco de dados PostgreSQL LOCAL e não ao Supabase,
        // ou sua URL de conexão do Supabase está apontando para um endpoint não SSL.
        // Vou assumir que é um ambiente LOCAL por conta do erro.
        ssl: false // Remova ou defina como false se o servidor não suportar SSL
    },
    logging: console.log
});

const resetBanco = async () => {
    try {
        console.log('🔌 Conectando ao banco de dados...');
        await sequelize.authenticate();
        console.log('✅ Conexão bem-sucedida.');

        console.log('✨ Criando ENUMs necessários (se não existirem)...');
        await sequelize.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_users_role') THEN
                    CREATE TYPE enum_users_role AS ENUM('user', 'admin');
                END IF;
            END$$;
        `);
        console.log('✅ ENUMs verificados/criados.');

        console.log('✨ Definindo modelos do Sequelize...');

        // ========================== USERS ==========================
        const User = sequelize.define('User', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            nome: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false, unique: true },
            senha: { type: DataTypes.STRING, allowNull: false },
            role: { type: DataTypes.ENUM('user', 'admin'), allowNull: false, defaultValue: 'user' },
            avatar: { type: DataTypes.STRING, defaultValue: '/images/default-avatar.png' },
            capaPerfil: { type: DataTypes.STRING, defaultValue: '/images/default-cover.png' },
            bio: { type: DataTypes.TEXT, defaultValue: 'Entusiasta de animes e membro do DenyAnimeHub!' },
            resetPasswordToken: { type: DataTypes.STRING },
            resetPasswordExpire: { type: DataTypes.DATE },
            createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }
        }, { tableName: 'users', timestamps: true });

        // ========================== ANIMES ==========================
        const Anime = sequelize.define('Anime', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            titulo: { type: DataTypes.STRING, allowNull: false, unique: true },
            slug: { type: DataTypes.STRING, allowNull: false, unique: true },
            sinopse: { type: DataTypes.TEXT, allowNull: false },
            anoLancamento: { type: DataTypes.INTEGER },
            generos: { type: DataTypes.TEXT },
            imagemCapa: { type: DataTypes.STRING },
            classificacao: { type: DataTypes.FLOAT, defaultValue: 0 },
            views: { type: DataTypes.INTEGER, defaultValue: 0 },
            trailerUrl: { type: DataTypes.STRING },
            idioma: { type: DataTypes.STRING, defaultValue: 'Legendado' },
            estudio: { type: DataTypes.STRING },
            createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }
        }, { tableName: 'animes', timestamps: true });

        // ========================== POSTS ==========================
        const Post = sequelize.define('Post', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            titulo: { type: DataTypes.STRING, allowNull: false, unique: true },
            conteudo: { type: DataTypes.TEXT, allowNull: false },
            imagemDestaque: { type: DataTypes.STRING },
            categoria: { type: DataTypes.STRING, defaultValue: 'Notícia' },
            tags: { type: DataTypes.TEXT },
            emDestaque: { type: DataTypes.BOOLEAN, defaultValue: false },
            autorNome: { type: DataTypes.STRING },
            createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }
        }, { tableName: 'posts', timestamps: true });

        // ========================== EPISODIOS ==========================
        const Episodio = sequelize.define('Episodio', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            numero: { type: DataTypes.INTEGER, allowNull: false },
            titulo: { type: DataTypes.STRING },
            urlVideo: { type: DataTypes.STRING, allowNull: false },
            tipoVideo: { type: DataTypes.STRING, defaultValue: 'iframe' },
            temporada: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
            createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }
        }, { tableName: 'episodios', timestamps: true });

        // ========================== HISTORICOS ==========================
        const Historico = sequelize.define('Historico', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            progress: { type: DataTypes.INTEGER, defaultValue: 0 },
            createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }
        }, { tableName: 'historicos', timestamps: true });

        // ========================== COMMENTS ==========================
        const Comment = sequelize.define('Comment', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            text: { type: DataTypes.TEXT, allowNull: false },
            createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }
        }, { tableName: 'comments', timestamps: true });

        // ========================== RATINGS ==========================
        const Rating = sequelize.define('Rating', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            rating: { type: DataTypes.INTEGER, allowNull: false },
            createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }
        }, { tableName: 'ratings', timestamps: true });

        // ========================== RELAÇÕES ==========================
        Post.belongsTo(User, { foreignKey: 'autorId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
        Comment.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
        Comment.belongsTo(Anime, { foreignKey: 'animeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
        Episodio.belongsTo(Anime, { foreignKey: 'animeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
        Historico.belongsTo(Anime, { foreignKey: 'animeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
        Rating.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
        Rating.belongsTo(Anime, { foreignKey: 'animeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

        console.log('🗑️ Apagando e recriando todas as tabelas (force: true)...');
        await sequelize.sync({ force: true });
        console.log('✅ Todas as tabelas criadas e prontas para uso.');

        console.log('🎉 Banco de dados resetado e sincronizado com sucesso!');

    } catch (error) {
        console.error('❌ Erro ao resetar o banco:', error);
    } finally {
        await sequelize.close();
        console.log('🔌 Conexão encerrada.');
    }
};

resetBanco();