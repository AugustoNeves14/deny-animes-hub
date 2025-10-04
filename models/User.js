'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Definição das associações do modelo.
     */
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'autorId', as: 'posts' });
      User.hasMany(models.Historico, { foreignKey: 'userId', as: 'historicos' });
      User.hasMany(models.Comment, { foreignKey: 'userId', as: 'comments' });
      User.hasMany(models.Rating, { foreignKey: 'userId', as: 'ratings' });
    }

    /**
     * Gera um token de reset de senha.
     * @returns {string} Token original (não criptografado).
     */
    getResetPasswordToken() {
      const resetToken = crypto.randomBytes(20).toString('hex');

      this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

      this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutos

      return resetToken;
    }

    /**
     * Compara a senha inserida com o hash armazenado.
     * @param {string} senhaInserida - senha digitada pelo usuário.
     * @returns {boolean} true se a senha corresponder, caso contrário false.
     */
    async compararSenha(senhaInserida) {
      return await bcrypt.compare(senhaInserida, this.senha);
    }
  }

  User.init(
    {
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
        type: DataTypes.STRING,
        allowNull: true
      },
      resetPasswordExpire: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      defaultScope: { 
        attributes: { exclude: ['senha'] } 
      },
      scopes: { 
        comSenha: { 
          attributes: { include: ['senha'] } 
        } 
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
    }
  );

  return User;
};
