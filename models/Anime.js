'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    static associate(models) {
      Anime.hasMany(models.Episodio, { foreignKey: { name: 'animeId', allowNull: false }, as: 'episodios', onDelete: 'CASCADE' });
      Anime.hasMany(models.Historico, { foreignKey: 'animeId', as: 'historicos' });
      Anime.hasMany(models.Comment, { foreignKey: 'animeId', as: 'comments', onDelete: 'CASCADE' });
      Anime.hasMany(models.Rating, { foreignKey: 'animeId', as: 'ratings', onDelete: 'CASCADE' });
    }
  }
  Anime.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    titulo: { type: DataTypes.STRING, allowNull: false, unique: true },
    sinopse: { type: DataTypes.TEXT('long'), allowNull: false },
    anoLancamento: { type: DataTypes.INTEGER, allowNull: false },
    generos: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() { const v = this.getDataValue('generos'); try { return v ? JSON.parse(v) : []; } catch(e) { return []; } },
      set(v) { const t = Array.isArray(v) ? v : (v ? v.split(',').map(s => s.trim()) : []); this.setDataValue('generos', JSON.stringify(t)); }
    },
    imagemCapa: { type: DataTypes.STRING, allowNull: false },
    trailerUrl: { type: DataTypes.STRING, allowNull: true, validate: { isUrl: { msg: 'A URL do trailer deve ser um link válido.' } } },
    idioma: { type: DataTypes.STRING, allowNull: true, defaultValue: 'Legendado' },
    estudio: { type: DataTypes.STRING, allowNull: true },
    classificacao: { type: DataTypes.FLOAT, allowNull: true, validate: { min: 0, max: 10 } },
    views: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false }
  }, {
    sequelize,
    modelName: 'Anime',
    tableName: 'animes',
    timestamps: true,
    indexes: [
      { unique: true, fields: ['slug'] },
      { fields: ['titulo'] }
    ]
  });
  return Anime;
};