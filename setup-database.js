// setup-neon-database.js
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Verificar se a senha está definida
if (!process.env.DB_PASSWORD) {
  console.error('❌ ERRO: A senha do banco de dados (DB_PASSWORD) não está definida no arquivo .env');
  process.exit(1);
}

// Configurações do Neon
const NEON_CONFIG = {
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: console.log,
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
      allowNull: false
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true
    },
    senha: { 
      type: DataTypes.STRING, 
      allowNull: false
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
      allowNull: false
    },
    sinopse: { 
      type: DataTypes.TEXT, 
      allowNull: false
    },
    anoLancamento: { 
      type: DataTypes.INTEGER
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
      defaultValue: 0
    },
    views: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0
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
      allowNull: false
    },
    conteudo: { 
      type: DataTypes.TEXT, 
      allowNull: false
    },
    resumo: {
      type: DataTypes.TEXT
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
      defaultValue: 0
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
      allowNull: false
    },
    numero: { 
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    temporada: { 
      type: DataTypes.INTEGER, 
      defaultValue: 1
    },
    videoUrl: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    duracao: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0
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
      allowNull: false
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
      allowNull: false
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
      defaultValue: 0
    },
    porcentagemAssistida: {
      type: DataTypes.FLOAT,
      defaultValue: 0
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
  User.hasMany(Post, { foreignKey: 'autorId', as: 'posts' });
  Post.belongsTo(User, { foreignKey: 'autorId', as: 'autor' });

  Anime.hasMany(Episodio, { foreignKey: 'animeId', as: 'episodios' });
  Episodio.belongsTo(Anime, { foreignKey: 'animeId', as: 'anime' });

  User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
  Comment.belongsTo(User, { foreignKey: 'userId', as: 'autor' });

  Anime.hasMany(Comment, { foreignKey: 'animeId', as: 'comments' });
  Comment.belongsTo(Anime, { foreignKey: 'animeId', as: 'anime' });

  Episodio.hasMany(Comment, { foreignKey: 'episodioId', as: 'comments' });
  Comment.belongsTo(Episodio, { foreignKey: 'episodioId', as: 'episodio' });

  User.hasMany(Rating, { foreignKey: 'userId', as: 'ratings' });
  Rating.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  Anime.hasMany(Rating, { foreignKey: 'animeId', as: 'ratings' });
  Rating.belongsTo(Anime, { foreignKey: 'animeId', as: 'anime' });

  Episodio.hasMany(Rating, { foreignKey: 'episodioId', as: 'ratings' });
  Rating.belongsTo(Episodio, { foreignKey: 'episodioId', as: 'episodio' });

  User.hasMany(Historico, { foreignKey: 'userId', as: 'historicos' });
  Historico.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  Anime.hasMany(Historico, { foreignKey: 'animeId', as: 'historicos' });
  Historico.belongsTo(Anime, { foreignKey: 'animeId', as: 'anime' });

  Episodio.hasMany(Historico, { foreignKey: 'episodioId', as: 'historicos' });
  Historico.belongsTo(Episodio, { foreignKey: 'episodioId', as: 'episodio' });

  return { User, Anime, Post, Episodio, Comment, Rating, Historico };
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
    }
  ]
};

// Popular banco com dados iniciais
const popularBanco = async (modelos) => {
  const { User, Anime, Post, Episodio } = modelos;
  
  try {
    console.log('🌱 Populando banco com dados iniciais...');
    
    // Criar usuários
    const usuarios = await User.bulkCreate(dadosIniciais.usuarios);
    console.log(`✅ ${usuarios.length} usuários criados`);
    
    // Criar animes
    const animes = await Anime.bulkCreate(dadosIniciais.animes);
    console.log(`✅ ${animes.length} animes criados`);
    
    // Criar posts
    const posts = await Post.bulkCreate([
      {
        titulo: 'Bem-vindo ao DenyAnimeHub!',
        conteudo: 'Este é o seu novo hub para assistir e descobrir os melhores animes.',
        resumo: 'Boas-vindas à nossa nova plataforma',
        categoria: 'Notícia',
        tags: ['anime', 'streaming'],
        emDestaque: true,
        slug: 'bem-vindo-ao-denyanimehub',
        autorId: usuarios[0].id
      }
    ]);
    console.log(`✅ ${posts.length} posts criados`);
    
    // Criar episódios
    const episodios = await Episodio.bulkCreate([
      {
        titulo: 'Crueldade',
        numero: 1,
        temporada: 1,
        videoUrl: 'https://example.com/videos/demon-slayer-ep1.mp4',
        duracao: 1440,
        qualidade: 'HD',
        legendas: ['Português'],
        animeId: animes[0].id
      }
    ]);
    console.log(`✅ ${episodios.length} episódios criados`);
    
    console.log('🎉 Banco populado com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao popular banco:', error.message);
  }
};

// Função principal
const configurarBancoNeon = async () => {
  let sequelize;
  
  try {
    console.log('🚀 Iniciando configuração do banco de dados Neon...');
    
    // Conectar ao Neon
    console.log('🌐 Conectando ao Neon...');
    sequelize = new Sequelize(NEON_CONFIG);
    
    const neonConectado = await testarConexao(sequelize, 'Neon');
    if (!neonConectado) {
      throw new Error('Não foi possível conectar ao banco de dados Neon');
    }
    
    // Definir modelos
    const modelos = definirModelos(sequelize);
    
    // Sincronizar banco (criar tabelas)
    console.log('🔄 Criando tabelas no Neon...');
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

module.exports = { configurarBancoNeon };