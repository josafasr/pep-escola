/**
 * @file Mapeamento da tabela de grupos
 * @module models/Grupo
 * @author Josafá Santos
 */
export default (sequelize, DataTypes) => {
  const Grupo = sequelize.define('Grupo', {
    nome: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'grupo',
    schema: 'seguranca'
  });
  Grupo.associate = (models) => {
    /**
     * Relacionamento com a tabela de usuários
     * @see module:models/Usuario
     */
    Grupo.belongsToMany(models.Usuario, {
      through: models.UsuarioGrupo,
      as: 'usuarios',
      foreignKey: 'grupoId',
      otherKey: 'usuarioId'
    })
  };
  return Grupo;
};
