/**
 * @description Mapeamento do relacionamento (M:M) entre usuários e grupos
 * @module src/models/UsuarioGrupo
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const UsuarioGrupo = sequelize.define('UsuarioGrupo', {
    usuarioId: {
      type: DataTypes.UUID,
      field: 'usuario_id'/* ,
      references: {
        model: 'usuario',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade' */
    },
    grupoId: {
      type: DataTypes.UUID,
      field: 'grupo_id'/* ,
      references: {
        model: 'grupo',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade' */
    }
  }, {
    tableName: 'auth_usuario_grupo',
    timestamps: false
  });
  
  return UsuarioGrupo;
};
