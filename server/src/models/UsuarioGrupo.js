/**
 * @file Mapeamento do relacionamento (M:M) entre usuários e grupos
 * @module models/UsuarioGrupo
 * @author Josafá Santos
 */
export default (sequelize, DataTypes) => {
  const UsuarioGrupo = sequelize.define('UsuarioGrupo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
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

  UsuarioGrupo.associate = (models) => {
    // associations can be defined here
    // UsuarioGrupo.belongsToMany(models.Usuario, {
    //   through: 'usuario_grupo',
    //   as: 'usuarios',
    //   foreignKey: 'usuario_id'
    // }),
    // UsuarioGrupo.belongsToMany(models.Grupo, {
    //   through: 'usuario_grupo',
    //   as: 'grupos',
    //   foreignKey: 'grupo_id'
    // })
  };
  return UsuarioGrupo;
};
