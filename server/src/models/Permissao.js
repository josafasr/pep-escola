/**
 * @description Mapeamento da tabela de permissões
 * @module src/models/Permissao
 * @author Josafá Santos dos Reis
 */

import { v4 as uuid } from 'uuid'

export default (sequelize, DataTypes) => {
  const Permissao = sequelize.define('Permissao', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING
    },
    descricao: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'auth_permissao',
    hooks: {
      beforeCreate: async (permissao) => {
        if (!permissao.id) {
          const id = await Promise.resolve(uuid())
          permissao.id = id
        }
      }
    }
  })
  Permissao.associate = (models) => {
    /**
     * Relacionamento com a tabela de grupos
     * @see module: src/models/Grupo
     */
    Permissao.belongsToMany(models.Grupo, {
      through: models.GrupoPermissao,
      as: 'grupos',
      foreignKey: 'permissaoId',
      otherKey: 'grupoId'
    })
  }
  return Permissao
}
