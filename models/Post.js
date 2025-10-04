'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'autorId', as: 'autor' });
    }
  }
  Post.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'posts_slug_key',
        msg: 'Este slug já está em uso. O título da notícia provavelmente já existe.'
      }
    },
    titulo: { type: DataTypes.STRING, allowNull: false, unique: true },
    conteudo: { type: DataTypes.TEXT('long'), allowNull: false },
    imagemDestaque: { type: DataTypes.STRING, allowNull: true },
    autorId: { type: DataTypes.INTEGER, allowNull: true },
    autorNome: { type: DataTypes.STRING, allowNull: true },
    tags: {
      type: DataTypes.TEXT,
      get() { const v = this.getDataValue('tags'); try { return v ? JSON.parse(v) : []; } catch (e) { return []; } },
      set(v) { const t = Array.isArray(v) ? v : (v ? v.split(',').map(s => s.trim()) : []); this.setDataValue('tags', JSON.stringify(t)); }
    },
    categoria: { type: DataTypes.STRING, defaultValue: "Notícia" },
    emDestaque: { type: DataTypes.BOOLEAN, defaultValue: false },
    views: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
    timestamps: true,
    indexes: [
      { unique: true, fields: ['slug'] },
      { fields: ['titulo'] }
    ]
  });
  return Post;
};