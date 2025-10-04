// ====================================================================================
//
//              DenyAnimeHub - Script de Configuração Completa do Banco (NEON)
//
// Descrição:     Script definitivo para criar todas as tabelas no Neon e preparar o ambiente
//                Compatível com: Neon PostgreSQL
//
// Como usar:     1. Configure o arquivo .env com as credenciais do Neon
//                2. Execute: node setup-neon-database.js
//
// ====================================================================================

'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Configurações do Neon
const NEON_CONFIG = {
  database: process.env.NEON_DB_NAME || 'neondb',
  username: process.env.NEON_DB_USER || 'neondb_owner',
  password: process.env.NEON_DB_PASSWORD,
  host: process.env.NEON_DB_HOST || 'ep-rapid-wind-adduizwm-pooler.us-east-1.aws.neon.tech',
  port: process.env.NEON_DB_PORT || 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// Testar conexão
const testarConexao = async (sequelize, nome) => {
  try {
    console.log(`🔌 Testando conexão com ${nome}...`);
    await sequelize.authenticate();
    console.log(`✅ Conexão com ${nome} bem-sucedida.`);
    return true;
  } catch (error) {
    console.log(`❌ Falha na conexão com ${nome}: ${error.message}`);
    return false;
  }
};

// Definir todos os modelos
const definirModelos = (sequelize) => {
  // Modelo User
  const User = sequelize.define('User', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    nome: { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 255]
      }
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    senha: { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 255]
      }
    },
    role: { 
      type: DataTypes.ENUM('user', 'admin', 'moderator'), 
      defaultValue: 'user' 
    },
    avatar: { 
      type: DataTypes.STRING,
      defaultValue: '/images/default-avatar.png'
    },
    capa: { 
      type: DataTypes.STRING,
      defaultValue: '/images/default-cover.jpg'
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    ultimoLogin: {
      type: DataTypes.DATE
    },
    createdAt: { 
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: { 
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  // Modelo Anime
  const Anime = sequelize.define('Anime', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    titulo: { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255]
      }
    },
    sinopse: { 
      type: DataTypes.TEXT, 
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 5000]
      }
    },
    anoLancamento: { 
      type: DataTypes.INTEGER,
      validate: {
        min: 1900,
        max: new Date().getFullYear() + 5
      }
    },
    generos: { 
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    imagemCapa: { 
      type: DataTypes.STRING,
      defaultValue: '/images/default-anime-cover.jpg'
    },
    classificacao: { 
      type: DataTypes.FLOAT, 
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5
      }
    },
    views: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    status: {
      type: DataTypes.ENUM('ongoing', 'completed', 'upcoming'),
      defaultValue: 'ongoing'
    },
    studio: {
      type: DataTypes.STRING
    },
    episodiosTotais: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    slug: { 
      type: DataTypes.STRING, 
      unique: true,
      allowNull: false
    },
    createdAt: { 
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: { 
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  // Modelo Post
  const Post = sequelize.define('Post', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    titulo: { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [5, 255]
      }
    },
    conteudo: { 
      type: DataTypes.TEXT, 
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [50, 10000]
      }
    },
    resumo: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 500]
      }
    },
    imagemDestaque: { 
      type: DataTypes.STRING,
      defaultValue: '/images/default-post-image.jpg'
    },
    categoria: { 
      type: DataTypes.STRING, 
      defaultValue: 'Notícia' 
    },
    tags: { 
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    emDestaque: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: false 
    },
    slug: { 
      type: DataTypes.STRING, 
      unique: true,
      allowNull: false
    },
    views: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    publicado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdAt: { 
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: { 
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  // Modelo Episodio
  const Episodio = sequelize.define('Episodio', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    titulo: { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255]
      }
    },
    numero: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      validate: {
        min: 1
      }
    },
    temporada: { 
      type: DataTypes.INTEGER, 
      defaultValue: 1,
      validate: {
        min: 1
      }
    },
    videoUrl: { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: true,
        isUrl: true
      }
    },
    duracao: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    thumbnails: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    qualidade: {
      type: DataTypes.ENUM('SD', 'HD', 'FHD', '4K'),
      defaultValue: 'HD'
    },
    legendas: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ['Português']
    },
    publicado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdAt: { 
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: { 
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  // Modelo Comment
  const Comment = sequelize.define('Comment', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    conteudo: { 
      type: DataTypes.TEXT, 
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 1000]
      }
    },
    aprovado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    dislikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    createdAt: { 
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: { 
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  // Modelo Rating
  const Rating = sequelize.define('Rating', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    nota: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      validate: { 
        min: 1, 
        max: 5 
      }
    },
    tipo: {
      type: DataTypes.ENUM('anime', 'episodio'),
      defaultValue: 'anime'
    },
    createdAt: { 
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: { 
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  // Modelo Historico
  const Historico = sequelize.define('Historico', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    tempoAssistido: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    porcentagemAssistida: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    },
    completado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    ultimaPosicao: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    createdAt: { 
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: { 
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  // ================== DEFINIR RELACIONAMENTOS ==================

  // User ↔ Post (One-to-Many)
  User.hasMany(Post, { 
    foreignKey: 'autorId', 
    as: 'posts',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });
  Post.belongsTo(User, { 
    foreignKey: 'autorId', 
    as: 'autor'
  });

  // Anime ↔ Episodio (One-to-Many)
  Anime.hasMany(Episodio, { 
    foreignKey: 'animeId', 
    as: 'episodios',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Episodio.belongsTo(Anime, { 
    foreignKey: 'animeId', 
    as: 'anime'
  });

  // User ↔ Comment (One-to-Many)
  User.hasMany(Comment, { 
    foreignKey: 'userId', 
    as: 'comments',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Comment.belongsTo(User, { 
    foreignKey: 'userId', 
    as: 'autor'
  });

  // Anime ↔ Comment (One-to-Many)
  Anime.hasMany(Comment, { 
    foreignKey: 'animeId', 
    as: 'comments',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Comment.belongsTo(Anime, { 
    foreignKey: 'animeId', 
    as: 'anime'
  });

  // Episodio ↔ Comment (One-to-Many)
  Episodio.hasMany(Comment, { 
    foreignKey: 'episodioId', 
    as: 'comments',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Comment.belongsTo(Episodio, { 
    foreignKey: 'episodioId', 
    as: 'episodio'
  });

  // User ↔ Rating (One-to-Many)
  User.hasMany(Rating, { 
    foreignKey: 'userId', 
    as: 'ratings',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Rating.belongsTo(User, { 
    foreignKey: 'userId', 
    as: 'user'
  });

  // Anime ↔ Rating (One-to-Many)
  Anime.hasMany(Rating, { 
    foreignKey: 'animeId', 
    as: 'ratings',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Rating.belongsTo(Anime, { 
    foreignKey: 'animeId', 
    as: 'anime'
  });

  // Episodio ↔ Rating (One-to-Many)
  Episodio.hasMany(Rating, { 
    foreignKey: 'episodioId', 
    as: 'ratings',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Rating.belongsTo(Episodio, { 
    foreignKey: 'episodioId', 
    as: 'episodio'
  });

  // User ↔ Historico (One-to-Many)
  User.hasMany(Historico, { 
    foreignKey: 'userId', 
    as: 'historicos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Historico.belongsTo(User, { 
    foreignKey: 'userId', 
    as: 'user'
  });

  // Anime ↔ Historico (One-to-Many)
  Anime.hasMany(Historico, { 
    foreignKey: 'animeId', 
    as: 'historicos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Historico.belongsTo(Anime, { 
    foreignKey: 'animeId', 
    as: 'anime'
  });

  // Episodio ↔ Historico (One-to-Many)
  Episodio.hasMany(Historico, { 
    foreignKey: 'episodioId', 
    as: 'historicos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Historico.belongsTo(Episodio, { 
    foreignKey: 'episodioId', 
    as: 'episodio'
  });

  return { 
    User, 
    Anime, 
    Post, 
    Episodio, 
    Comment, 
    Rating, 
    Historico 
  };
};

// Dados iniciais para popular o banco
const dadosIniciais = {
  usuarios: [
    {
      nome: 'Administrador',
      email: 'admin@denyanimehub.com',
      senha: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      role: 'admin',
      avatar: '/images/admin-avatar.png',
      ativo: true
    },
    {
      nome: 'Usuário Demo',
      email: 'usuario@denyanimehub.com',
      senha: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      role: 'user',
      avatar: '/images/user-avatar.png',
      ativo: true
    }
  ],
  animes: [
    {
      titulo: 'Demon Slayer: Kimetsu no Yaiba',
      sinopse: 'Tanjiro Kamado é um jovem gentil que vive com sua família nas montanhas. Sua vida muda quando sua família é massacrada por demônios e sua irmã Nezuko é transformada em um demônio. Determinado a salvar sua irmã e vingar sua família, Tanjiro se torna um caçador de demônios.',
      anoLancamento: 2019,
      generos: ['Ação', 'Aventura', 'Fantasia', 'Shounen'],
      imagemCapa: '/images/demon-slayer-cover.jpg',
      classificacao: 4.8,
      status: 'completed',
      studio: 'Ufotable',
      episodiosTotais: 26,
      slug: 'demon-slayer-kimetsu-no-yaiba'
    },
    {
      titulo: 'Attack on Titan',
      sinopse: 'Em um mundo onde a humanidade vive cercada por muralhas gigantes para se proteger de titãs, Eren Yeager jura eliminar todos os titãs após testemunhar a destruição de sua cidade e a morte de sua mãe.',
      anoLancamento: 2013,
      generos: ['Ação', 'Drama', 'Fantasia', 'Shounen'],
      imagemCapa: '/images/attack-on-titan-cover.jpg',
      classificacao: 4.9,
      status: 'completed',
      studio: 'Wit Studio',
      episodiosTotais: 75,
      slug: 'attack-on-titan'
    }
  ]
};

// Popular banco com dados iniciais
const popularBanco = async (modelos) => {
  const { User, Anime, Post, Episodio } = modelos;
  
  try {
    console.log('🌱 Populando banco com dados iniciais...');
    
    // Criar usuários
    const usuarios = await User.bulkCreate(dadosIniciais.usuarios, {
      returning: true,
      individualHooks: false
    });
    console.log(`✅ ${usuarios.length} usuários criados`);
    
    // Criar animes
    const animes = await Anime.bulkCreate(dadosIniciais.animes, {
      returning: true
    });
    console.log(`✅ ${animes.length} animes criados`);
    
    // Criar posts
    const posts = await Post.bulkCreate([
      {
        titulo: 'Bem-vindo ao DenyAnimeHub!',
        conteudo: 'Este é o seu novo hub para assistir e descobrir os melhores animes. Nossa plataforma oferece uma experiência premium para todos os fãs de anime.',
        resumo: 'Boas-vindas à nossa nova plataforma de streaming de animes',
        categoria: 'Notícia',
        tags: ['anime', 'streaming', 'plataforma'],
        emDestaque: true,
        slug: 'bem-vindo-ao-denyanimehub',
        autorId: usuarios[0].id
      },
      {
        titulo: 'Novos lançamentos de Anime para 2024',
        conteudo: 'Confira os animes mais aguardados que serão lançados em 2024. Desde sequências aguardadas até novas franquias promissoras.',
        resumo: 'Preview dos animes mais esperados para o próximo ano',
        categoria: 'Notícia',
        tags: ['lançamentos', '2024', 'novos animes'],
        emDestaque: false,
        slug: 'novos-lancamentos-anime-2024',
        autorId: usuarios[0].id
      }
    ], { returning: true });
    console.log(`✅ ${posts.length} posts criados`);
    
    // Criar episódios para o primeiro anime
    const episodios = await Episodio.bulkCreate([
      {
        titulo: 'Crueldade',
        numero: 1,
        temporada: 1,
        videoUrl: 'https://example.com/videos/demon-slayer-ep1.mp4',
        duracao: 1440,
        qualidade: 'HD',
        legendas: ['Português', 'Inglês'],
        animeId: animes[0].id
      },
      {
        titulo: 'Treinador Sakonji Urokodaki',
        numero: 2,
        temporada: 1,
        videoUrl: 'https://example.com/videos/demon-slayer-ep2.mp4',
        duracao: 1440,
        qualidade: 'HD',
        legendas: ['Português', 'Inglês'],
        animeId: animes[0].id
      }
    ], { returning: true });
    console.log(`✅ ${episodios.length} episódios criados`);
    
    console.log('🎉 Banco populado com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao popular banco:', error.message);
  }
};

// Função principal
const configurarBancoNeon = async () => {
  let sequelize;
  let modelos;
  
  try {
    console.log('🚀 Iniciando configuração do banco de dados Neon...');
    console.log('📋 Ambiente:', process.env.NODE_ENV || 'development');
    
    // Conectar ao Neon
    console.log('🌐 Conectando ao Neon...');
    sequelize = new Sequelize(
      NEON_CONFIG.database,
      NEON_CONFIG.username,
      NEON_CONFIG.password,
      NEON_CONFIG
    );
    
    const neonConectado = await testarConexao(sequelize, 'Neon');
    
    if (!neonConectado) {
      throw new Error('Não foi possível conectar ao banco de dados Neon');
    }
    
    console.log('✅ Conectado ao Neon com sucesso');
    
    // Definir modelos
    modelos = definirModelos(sequelize);
    
    // Sincronizar banco (criar tabelas)
    console.log('🔄 Sincronizando banco de dados...');
    await sequelize.sync({ force: true });
    console.log('✅ Tabelas criadas com sucesso');
    
    // Popular com dados iniciais
    await popularBanco(modelos);
    
    console.log('\n🎉 CONFIGURAÇÃO CONCLUÍDA COM SUCESSO!');
    console.log('📊 Banco de dados Neon pronto para uso');
    console.log('👤 Admin: admin@denyanimehub.com / password');
    console.log('👤 Usuário: usuario@denyanimehub.com / password');
    
  } catch (error) {
    console.error('❌ Erro durante a configuração:', error.message);
    
    if (error.original && error.original.code) {
      console.log('🔧 Código do erro:', error.original.code);
    }
    
  } finally {
    if (sequelize) {
      await sequelize.close();
      console.log('🔌 Conexão com o banco fechada');
    }
  }
};

// Executar se chamado diretamente
if (require.main === module) {
  configurarBancoNeon();
}

module.exports = { 
  configurarBancoNeon, 
  definirModelos,
  testarConexao
};