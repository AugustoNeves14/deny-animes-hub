// scripts/resetDatabase.js

'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Carrega o .env da raiz do projeto

const env = process.env.NODE_ENV || 'development';

let sequelize;

if (env === 'production') {
    // Para produção (Render), usamos a DATABASE_URL completa
    const dbUrl = process.env.DATABASE_URL.replace('[YOUR_SUPABASE_DB_PASSWORD]', process.env.SUPABASE_DB_PASSWORD);
    sequelize = new Sequelize(dbUrl, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Importante para Supabase com Render
            }
        },
        logging: console.log, // Você pode querer desabilitar isso em produção para menos logs
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
} else {
    // Para desenvolvimento local, usamos a DATABASE_URL_LOCAL
    const dbUrlLocal = process.env.DATABASE_URL_LOCAL.replace('[YOUR_SUPABASE_DB_PASSWORD]', process.env.SUPABASE_DB_PASSWORD);
    sequelize = new Sequelize(dbUrlLocal, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: console.log,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
}


// Modelos (extraídos do seu app.js para manter a consistência)
// Replicar os modelos aqui para que este script possa recriá-los
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

const Post = sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING, allowNull: false, unique: true },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true }, // Adicionado slug para posts
    conteudo: { type: DataTypes.TEXT, allowNull: false },
    imagemDestaque: { type: DataTypes.STRING },
    categoria: { type: DataTypes.STRING, defaultValue: 'Notícia' },
    tags: { type: DataTypes.TEXT },
    emDestaque: { type: DataTypes.BOOLEAN, defaultValue: false },
    autorNome: { type: DataTypes.STRING },
    views: { type: DataTypes.INTEGER, defaultValue: 0 }, // Adicionado views para posts
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }
}, { tableName: 'posts', timestamps: true });

const Episodio = sequelize.define('Episodio', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    numero: { type: DataTypes.INTEGER, allowNull: false },
    titulo: { type: DataTypes.STRING },
    urlVideo: { type: DataTypes.STRING, allowNull: false },
    tipoVideo: { type: DataTypes.STRING, defaultValue: 'iframe' },
    temporada: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }, // Re-adicionado createdAt
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW } // Re-adicionado updatedAt
}, { tableName: 'episodios', timestamps: true });

const Historico = sequelize.define('Historico', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Re-adicionado ID
    progress: { type: DataTypes.INTEGER, defaultValue: 0 },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }
}, { tableName: 'historicos', timestamps: true });

const Comment = sequelize.define('Comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.TEXT, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }
}, { tableName: 'comments', timestamps: true });

const Rating = sequelize.define('Rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }
}, { tableName: 'ratings', timestamps: true });

// Relacionamentos
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

// Adicionar relacionamento de Episodio com Historico
Episodio.hasMany(Historico, { foreignKey: 'episodioId', as: 'historicos' });
Historico.belongsTo(Episodio, { foreignKey: 'episodioId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


User.hasMany(Rating, { foreignKey: 'userId', as: 'ratings' });
Rating.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Anime.hasMany(Rating, { foreignKey: 'animeId', as: 'ratings' });
Rating.belongsTo(Anime, { foreignKey: 'animeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


const resetBanco = async () => {
    try {
        console.log('🔌 Conectando ao banco de dados...');
        await sequelize.authenticate();
        console.log('✅ Conexão bem-sucedida.');

        console.log('✨ Criando ENUMs necessários (se não existirem)...');
        await sequelize.transaction(async (t) => {
            await sequelize.query(`
                CREATE TYPE IF NOT EXISTS enum_users_role AS ENUM('user', 'admin');
            `, { transaction: t });
            // Adicione outros ENUMs se tiver
        });
        console.log('✅ ENUMs verificados/criados.');

        console.log('🗑️ Apagando e recriando todas as tabelas (force: true)...');
        await sequelize.sync({ force: true });
        console.log('✅ Todas as tabelas criadas e prontas para uso.');
        console.log('🎉 Banco de dados resetado e sincronizado com sucesso!');

    } catch (error) {
        console.error('❌ Erro ao resetar o banco:', error);
        process.exit(1);
    } finally {
        await sequelize.close();
        console.log('🔌 Conexão encerrada.');
    }
};

resetBanco();