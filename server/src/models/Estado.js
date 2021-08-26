/**
 * @description Mapeamento da tabela de estados
 * @module src/models/Estado
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const Estado = sequelize.define('Estado', {
    nome: {
      type: DataTypes.STRING
    },
    sigla: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 2],
        is: ['[A-Z]', 'i']
      }
    }/* ,
    paisId: {
      type: DataTypes.INTEGER,
      field: 'pais_id'
    } */
  }, {
    tableName: 'dg_estado',
    timestamps: false
  })

  Estado.associate = (models) => {
    /**
     * Relacionamento com a tabela de países
     * @see module:models/Pais
     */
    /* Estado.belongsTo(models.Pais, {
      as: 'pais',
      foreignKey: 'paisId'
    }), */

    /**
     * Relacionamento com a tabela de cidades
     * @see module:models/Cidade
     */
    Estado.hasMany(models.Cidade, {
      as: 'cidades',
      foreignKey: 'estadoId'
    })
  }

  return Estado
}
