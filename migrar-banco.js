'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Associações do usuário
      User.hasMany(models.Post, { foreignKey: 'autorId', as: 'posts' });
      User.hasMany(models.Historico, { foreignKey: 'userId', as: 'historicos' });
      User.hasMany(models.Comment, { foreignKey: 'userId', as: 'comments' });
      User.hasMany(models.Rating, { foreignKey: 'userId', as: 'ratings' });
    }

    getResetPasswordToken() {
      const resetToken = crypto.randomBytes(20).toString('hex');

      this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

      this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

      return resetToken;
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user'
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: '/images/default-avatar.png'
    },
    bio: {
      type: DataTypes.TEXT,
      defaultValue: 'Entusiasta de animes e membro do DenyAnimeHub!'
    },
    capaPerfil: {
      type: DataTypes.STRING,
      defaultValue: '/images/default-cover.png'
    },
    resetPasswordToken: {
      type: DataTypes.STRING
    },
    resetPasswordExpire: {
      type: DataTypes.DATE
    }
    // A coluna 'receberNotificacoes' foi removida
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ['senha'] }
    },
    scopes: {
      comSenha: { attributes: { include: ['senha'] } }
    },
    hooks: {
      beforeCreate: async (user) => {
        if (user.senha) {
          const salt = await bcrypt.genSalt(10);
          user.senha = await bcrypt.hash(user.senha, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('senha')) {
          const salt = await bcrypt.genSalt(10);
          user.senha = await bcrypt.hash(user.senha, salt);
        }
      }
    }
  });

  User.prototype.compararSenha = async function (senhaInserida) {
    return await bcrypt.compare(senhaInserida, this.senha);
  };

  return User;
};
