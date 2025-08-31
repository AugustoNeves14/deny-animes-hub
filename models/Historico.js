'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Historico extends Model {
    static associate(models) {
      // [CORREÇÃO]: Padronizando os aliases para minúsculo
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      this.belongsTo(models.Anime, { foreignKey: 'animeId', as: 'anime' });
      this.belongsTo(models.Episodio, { foreignKey: 'episodioId', as: 'episodio' });
    }
  }
  Historico.init({
    progress: { type: DataTypes.INTEGER, defaultValue: 0 },
    userId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, references: { model: 'users', key: 'id' } },
    episodioId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, references: { model: 'episodios', key: 'id' } },
    animeId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'animes', key: 'id' } }
  }, {
    sequelize,
    modelName: 'Historico',
    tableName: 'historicos',
    timestamps: true
  });
  return Historico;
};