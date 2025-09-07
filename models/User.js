'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define todas as associações que um Usuário possui
      User.hasMany(models.Post, { foreignKey: 'autorId', as: 'posts' });
      User.hasMany(models.Historico, { foreignKey: 'userId', as: 'historicos' });
      User.hasMany(models.Comment, { foreignKey: 'userId', as: 'comments' });
      User.hasMany(models.Rating, { foreignKey: 'userId', as: 'ratings' });
    }

    /**
     * Gera um token de reset de senha para a instância do usuário.
     * @returns {string} O token de reset original (não-criptografado) para ser enviado por e-mail.
     */
    getResetPasswordToken() {
        // Gera um buffer de bytes aleatórios e o converte para uma string hexadecimal
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Cria um hash do token para ser armazenado no banco de dados por segurança
        this.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        
        // Define que o token de reset irá expirar em 10 minutos
        this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        // Retorna o token original, que será enviado ao usuário
        return resetToken;
    }
  }

  // Inicializa o modelo 'User' com todas as suas colunas e configurações
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
    // A coluna 'receberNotificacoes' foi intencionalmente removida conforme a nova lógica.
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    // Escopos para controle de visibilidade da senha
    defaultScope: { 
      attributes: { exclude: ['senha'] } 
    },
    scopes: { 
      comSenha: { 
        attributes: { include: ['senha'] } 
      } 
    },
    // Hooks para criptografar a senha automaticamente antes de salvar
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

  // Adiciona o método de instância para comparar senhas durante o login
  User.prototype.compararSenha = async function (senhaInserida) {
    return await bcrypt.compare(senhaInserida, this.senha);
  };

  return User;
};