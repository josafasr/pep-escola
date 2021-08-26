/**
 * @description Mapeamento da tabela de cor da pele
 * @module src/models/CorPele
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const CorPele = sequelize.define('CorPele', {
    nome: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'dg_cor_pele',
    timestamps: false
  })

  CorPele.associate = (models) => {
    /**
     * Relacionamento com a tabela de pacientes
     * @see module:models/Paciente
     */
    CorPele.hasMany(models.Paciente, {
      as: 'pacientes',
      foreignKey: 'corPeleId'
    })
  }

  return CorPele
}
