/**
 * @description Mapeamento da tabela de usuários
 * @module src/models/Usuario
 * @author Josafá Santos dos Reis
 */

import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

export default (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: {
          args: 3,
          msg: 'O nome de usuário deve ter no mínimo 3 carateres'
        }
      }
    },
    senha: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: 6,
          msg: 'A senha deve ter no mínimo 6 carateres'
        }
      },
      field: 'hash_senha'
    },
    tokenVersion: {
      type: DataTypes.INTEGER,
      field: 'token_version'
    },
    pessoaId: {
      type: DataTypes.UUID,
      field: 'pessoa_id',
      defaultValue: 0
    }
  }, {
    tableName: 'auth_usuario',
    hooks: {
      afterValidate: async (usuario) => {
        if (usuario.senha !== null && usuario.senha !== '') {
          const hashSenha = await bcrypt.hash(usuario.senha, 12)
          // eslint-disable-next-line no-param-reassign
          usuario.senha = hashSenha
        }
      },

      beforeCreate: async (usuario) => {
        if (!usuario.id) {
          const id = await Promise.resolve(uuid())
          usuario.id = id
        }
      }
    }
  })

  Usuario.associate = (models) => {
    /**
     * Relacionamento com a tabela de pessoas
     * @see module: src/models/Pessoa
     */
    Usuario.belongsTo(models.Pessoa, {
      as: 'pessoa',
      foreignKey: 'pessoaId'
    }),

    /**
     * Relacionamento com a tabela de grupos
     * @see module: src/models/Grupo
     */
    Usuario.belongsToMany(models.Grupo, {
      through: models.UsuarioGrupo,
      as: 'grupos',
      foreignKey: 'usuarioId',
      otherKey: 'grupoId'
    }),

    /**
     * Relacionamento com a tabela de consultas
     * @see module: src/models/Consulta
     */
    Usuario.belongsToMany(models.Consulta, {
      through: models.ResponsavelConsulta,
      as: 'consultas',
      foreignKey: 'usuarioId',
      otherKey: 'consultaId'
    }),

    /**
     * Relacionamento com a tabela de avaliação de atendimento
     * @see module: src/models/AvaliacaoAtendimento
     */
    Usuario.hasMany(models.AvaliacaoAtendimento, {
      as: 'avaliacoes',
      foreignKey: 'usuarioId'
    }),

    /**
     * Relacionamento com a tabela de seções
     * @see module:src/models/Secao
     */
     Usuario.hasMany(models.Secao, {
      as: 'secoes',
      foreignKey: 'usuarioId'
    })
  }

  return Usuario
}
