/**
 * @file Mapeamento da tabela de usuários
 * @module models/Usuario
 * @author Josafá Santos
 */

import bcrypt from 'bcrypt'

export default (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nome: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: 3,
          msg: 'O nome de usuário deve ter no mínimo 3 carateres'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'E-mail inválido'
        }
      }
    },
    senha: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 100],
          msg: 'A senha deve ter no mínimo 6 carateres'
        }
      },
      field: 'hash_senha'
    }
  }, {
    tableName: 'usuario',
    schema: 'seguranca',
    hooks: {
      afterValidate: async (usuario) => {
        const hashSenha = await bcrypt.hash(usuario.senha, 12)
        // eslint-disable-next-line no-param-reassign
        usuario.senha = hashSenha
      }
    }
  });

  Usuario.associate = (models) => {
    /**
     * Relacionamento com a tabela de grupos
     * @see module:models/Grupo
     */
    Usuario.belongsToMany(models.Grupo, {
      through: models.UsuarioGrupo,
      as: 'grupos',
      foreignKey: 'usuarioId',
      otherKey: 'grupoId'
    })
  };
  return Usuario;
};
