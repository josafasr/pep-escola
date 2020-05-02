/**
 * @file Mapeamento do relacionamento (M:M) entre usuários e grupos
 * @module src/models/UsuarioGrupo
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const UsuarioGrupo = sequelize.define('UsuarioGrupo', {
    usuarioId: {
      type: DataTypes.INTEGER,
      field: 'usuario_id',
      references: {
        model: 'usuario',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    grupoId: {
      type: DataTypes.INTEGER,
      field: 'grupo_id',
      references: {
        model: 'grupo',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {
    schema: 'seguranca',
    tableName: 'usuario_grupo',
    timestamps: false
  });
  
  return UsuarioGrupo;
};
