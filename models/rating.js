'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Anime, { foreignKey: 'animeId' });
    }
  }
  Rating.init({
    // [CORREÇÃO] O 'id' primário é implícito e gerenciado pelo Sequelize,
    // removê-lo da definição e deixar as chaves estrangeiras como colunas normais
    // simplifica e resolve conflitos de índice.
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { 
        min: { args: [1], msg: "A avaliação mínima é 1." },
        max: { args: [5], msg: "A avaliação máxima é 5." }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    animeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'animes', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'Rating',
    tableName: 'ratings',
    // A definição do índice único foi movida para cá, que é a forma mais robusta.
    // O Sequelize agora entende melhor como gerenciar este índice.
    indexes: [{
      unique: true,
      fields: ['userId', 'animeId'],
      name: 'unique_user_anime_rating' // Dando um nome explícito ao índice
    }]
  });
  return Rating;
};