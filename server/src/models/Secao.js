/**
 * @file Mapeamento da tabela de seções
 * @module src/models/Secao
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const Secao = sequelize.define('Secao', {
    nome: {
      type: DataTypes.STRING
    },
    descricao: {
      type: DataTypes.TEXT
    }
  }, {
    schema: 'ceuas',
    tableName: 'secao'
  });

  Secao.associate = (models) => {
    /**
     * Relacionamento com a tabela de usuários
     * @see module:src/models/Usuario
     */
    Secao.belongsTo(models.Usuario, {
      as: 'usuario',
      foreignKey: 'usuarioId'
    })//,

    /**
     * Relacionamento com a tabela de campos
     * @see module:src/models/Campo
     */
    /* Secao.hasMany(models.Campo, {
      as: 'campos',
      foreignKey: 'secaoId'
    }) */
  }

  return Secao
}
