// ====================================================================================
//
//              DenyAnimeHub - Script Inteligente de Reset Total do Banco
//
// ====================================================================================

'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
// Garante que as variáveis de ambiente são carregadas para o NODE_ENV
require('dotenv').config(); 
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, 'config', 'config.json'))[env];

// Configuração do SSL condicional
const sequelizeConfig = {
    host: config.host,
    dialect: 'postgres',
    dialectOptions: {
        ssl: env === 'production' ? { rejectUnauthorized: false } : false // Habilita SSL para produção, desabilita para dev
    },
    logging: console.log,
    // Adiciona o pool de conexões para melhor gerenciamento em produção
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

const sequelize = new Sequelize(config.database, config.username, config.password, sequelizeConfig);

const resetBanco = async () => {
    try {
        console.log('🔌 Conectando ao banco de dados...');
        await sequelize.authenticate();
        console.log('✅ Conexão bem-sucedida.');

        console.log('✨ Criando ENUMs necessários (se não existirem)...');
        // Usar um transaction para garantir atomicidade se ocorrer erro na criação de ENUMs
        await sequelize.transaction(async (t) => {
            await sequelize.query(`
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_users_role') THEN
                        CREATE TYPE enum_users_role AS ENUM('user', 'admin');
                    END IF;
                END$$;
            `, { transaction: t });
        });
        console.log('✅ ENUMs verificados/criados.');

        console.log('✨ Definindo modelos do Sequelize...');

        // ========================== USERS ==========================
        const User = sequelize.define('User', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            nome: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false, unique: true },
            senha: { type: DataTypes.STRING, allowNull: false },
            // Referencia o ENUM criado acima
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
        // Definindo as associações para serem reconhecidas pelo Sequelize
        User.hasMany(Post, { foreignKey: 'autorId', as: 'posts' });
        Post.belongsTo(User, { foreignKey: 'autorId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

        User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
        Comment.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

        Anime.hasMany(Comment, { foreignKey: 'animeId', as: 'comments' });
        Comment.belongsTo(Anime, { foreignKey: 'animeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

        Anime.hasMany(Episodio, { foreignKey: 'animeId', as: 'episodios' });
        Episodio.belongsTo(Anime, { foreignKey: 'animeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

        User.hasMany(Historico, { foreignKey: 'userId', as: 'historicos' });
        Historico.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
        
        Anime.hasMany(Historico, { foreignKey: 'animeId', as: 'historicos' });
        Historico.belongsTo(Anime, { foreignKey: 'animeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

        User.hasMany(Rating, { foreignKey: 'userId', as: 'ratings' });
        Rating.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
        
        Anime.hasMany(Rating, { foreignKey: 'animeId', as: 'ratings' });
        Rating.belongsTo(Anime, { foreignKey: 'animeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

        console.log('🗑️ Apagando e recriando todas as tabelas (force: true)...');
        // Sincroniza todos os modelos, criando as tabelas se não existirem (ou recriando com force: true)
        await sequelize.sync({ force: true });

        console.log('✅ Todas as tabelas criadas e prontas para uso.');
        console.log('🎉 Banco de dados resetado e sincronizado com sucesso!');

    } catch (error) {
        console.error('❌ Erro ao resetar o banco:', error);
        // Garante que o processo Node.js termine com erro se o reset falhar
        process.exit(1); 
    } finally {
        await sequelize.close();
        console.log('🔌 Conexão encerrada.');
    }
};

resetBanco();