'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
      this.belongsTo(models.Anime, { foreignKey: 'animeId', as: 'anime' });
    }
  }
  Comment.init({
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: { msg: "O comentário não pode estar vazio." }, len: { args: [3, 1000], msg: "O comentário deve ter entre 3 e 1000 caracteres." } }
    },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    animeId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'animes', key: 'id' } }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: true,
  });
  return Comment;
};