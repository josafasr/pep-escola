/**
 * @description Mapeamento da tabela de grupos
 * @module src/models/Grupo
 * @author Josafá Santos dos Reis
 */

import { v4 as uuid } from 'uuid'

export default (sequelize, DataTypes) => {
  const Grupo = sequelize.define('Grupo', {
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
    tableName: 'auth_grupo',
    hooks: {
      beforeCreate: async (grupo) => {
        if (!grupo.id) {
          const id = await Promise.resolve(uuid())
          grupo.id = id
        }
      }
    }
  })
  Grupo.associate = (models) => {
    /**
     * Relacionamento com a tabela de usuários
     * @see module: src/models/Usuario
     */
    Grupo.belongsToMany(models.Usuario, {
      through: models.UsuarioGrupo,
      as: 'usuarios',
      foreignKey: 'grupoId',
      otherKey: 'usuarioId'
    }),

    /**
     * Relacionamento com a tabela de permissões
     * @see module: src/models/Permissao
     */
    Grupo.belongsToMany(models.Permissao, {
      through: models.GrupoPermissao,
      as: 'permissoes',
      foreignKey: 'grupoId',
      otherKey: 'permissaoId'
    })
  }
  return Grupo
}
