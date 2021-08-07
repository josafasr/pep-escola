/**
 * @description Mapeamento da tabela de pessoas
 * @module src/models/Pessoa
 * @author Josafá Santos dos Reis
 */

import { v4 as uuid } from 'uuid'

export default (sequelize, DataTypes) => {
  const Pessoa = sequelize.define('Pessoa', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: 3,
          msg: 'O nome deve ter no mínimo 3 carateres'
        }
      }
    },
    dataNascimento: {
      type: DataTypes.DATE,
      field: 'data_nascimento'
    },
    sexo: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'gd_pessoa',
    hooks: {
      beforeCreate: async (pessoa) => {
        if (!pessoa.id) {
          const id = await Promise.resolve(uuid())
          pessoa.id = id
        }
      }
    }
  });

  Pessoa.associate = (models) => {
    /**
     * Relacionamento com a tabela de contatos
     * @see {@link Contato}
     */
    Pessoa.hasOne(models.Contato, {
      as: 'contato',
      foreignKey: 'pessoaId'
    }),

    /**
     * Relacionamento com a tabela de enderecos
     * @see module:models/Endereco
     */
    Pessoa.belongsToMany(models.Endereco, {
      through: models.PessoaEndereco,
      as: 'enderecos',
      foreignKey: 'pessoaId',
      otherKey: 'enderecoId'
    }),

    /**
     * Relacionamento com a tabela de usuários
     * @see {@link Usuario}
     */
    Pessoa.hasOne(models.Usuario, {
      as: 'pessoa',
      foreignKey: 'pessoaId'
    })
  }
  return Pessoa
}
