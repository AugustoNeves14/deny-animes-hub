'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Episodio extends Model {
    static associate(models) {
      Episodio.belongsTo(models.Anime, { foreignKey: 'animeId', as: 'anime' });
      // [CORREÇÃO] Adiciona a associação que faltava com o Histórico
      Episodio.hasMany(models.Historico, { foreignKey: 'episodioId', as: 'historicos' });
    }
  }
  Episodio.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    numero: { type: DataTypes.INTEGER, allowNull: false },
    titulo: { type: DataTypes.STRING, allowNull: true },
    urlVideo: { type: DataTypes.STRING, allowNull: false },
    tipoVideo: { type: DataTypes.STRING, defaultValue: 'iframe' },
    temporada: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    animeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'animes', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Episodio',
    tableName: 'episodios',
    timestamps: false
  });
  return Episodio;
};