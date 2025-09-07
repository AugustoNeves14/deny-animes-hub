// Arquivo: migrations/xxxxxxxxxxxxxx-create-initial-tables.js

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * A função 'up' é executada quando você roda 'db:migrate'.
   * Ela aplica as mudanças ao banco de dados.
   */
  async up(queryInterface, Sequelize) {
    // --- Tabela de Usuários ---
    await queryInterface.createTable('users', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nome: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      senha: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.ENUM('user', 'admin'), allowNull: false, defaultValue: 'user' },
      avatar: { type: Sequelize.STRING, defaultValue: '/images/default-avatar.png' },
      bio: { type: Sequelize.TEXT, defaultValue: 'Entusiasta de animes e membro do DenyAnimeHub!' },
      capaPerfil: { type: Sequelize.STRING, defaultValue: '/images/default-cover.png' },
      resetPasswordToken: { type: Sequelize.STRING },
      resetPasswordExpire: { type: Sequelize.DATE },
      receberNotificacoes: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // --- Tabela de Animes ---
    await queryInterface.createTable('animes', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      slug: { type: Sequelize.STRING, allowNull: false, unique: true },
      titulo: { type: Sequelize.STRING, allowNull: false },
      sinopse: { type: Sequelize.TEXT, allowNull: false },
      anoLancamento: { type: Sequelize.INTEGER },
      generos: { type: Sequelize.JSONB }, // Usar JSONB é mais eficiente para buscas em PostgreSQL
      imagemCapa: { type: Sequelize.STRING },
      trailerUrl: { type: Sequelize.STRING },
      estudio: { type: Sequelize.STRING },
      classificacao: { type: Sequelize.FLOAT },
      views: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // --- Tabela de Posts (Notícias) ---
    await queryInterface.createTable('posts', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      slug: { type: Sequelize.STRING, allowNull: false, unique: true },
      titulo: { type: Sequelize.STRING, allowNull: false },
      conteudo: { type: Sequelize.TEXT, allowNull: false },
      imagemDestaque: { type: Sequelize.STRING },
      emDestaque: { type: Sequelize.BOOLEAN, defaultValue: false },
      views: { type: Sequelize.INTEGER, defaultValue: 0 },
      autorId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // --- Tabela de Episódios ---
    await queryInterface.createTable('episodios', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      numero: { type: Sequelize.INTEGER, allowNull: false },
      titulo: { type: Sequelize.STRING },
      urlVideo: { type: Sequelize.STRING, allowNull: false },
      tipoVideo: { type: Sequelize.STRING, allowNull: false },
      temporada: { type: Sequelize.INTEGER, allowNull: false },
      animeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'animes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Se o anime for deletado, seus episódios também são.
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
    
    // --- Tabela de Comentários ---
    await queryInterface.createTable('comments', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      text: { type: Sequelize.TEXT, allowNull: false },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      animeId: {
        type: Sequelize.INTEGER,
        references: { model: 'animes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // Adicionar outras tabelas como 'ratings' e 'historicos' se necessário.
  },

  /**
   * A função 'down' é executada quando você reverte uma migração.
   * Ela desfaz as mudanças, deletando as tabelas na ordem inversa da criação.
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
    await queryInterface.dropTable('episodios');
    await queryInterface.dropTable('posts');
    await queryInterface.dropTable('animes');
    await queryInterface.dropTable('users');
  }
};