/**
 * @description Mapeamento do relacionamento (M:M) entre grupos e permissões
 * @module src/models/GrupoPermissao
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const GrupoPermissao = sequelize.define('GrupoPermissao', {
    grupoId: {
      type: DataTypes.UUID,
      field: 'grupo_id'
    },
    permissaoId: {
      type: DataTypes.UUID,
      field: 'permissao_id'
    }
  }, {
    tableName: 'auth_grupo_permissao',
    timestamps: false
  })
  
  return GrupoPermissao
}
