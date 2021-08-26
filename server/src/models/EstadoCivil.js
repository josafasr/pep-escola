/**
 * @description Mapeamento da tabela de estados civis
 * @module src/models/EstadoCivil
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const EstadoCivil = sequelize.define('EstadoCivil', {
    nome: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'dg_estado_civil',
    timestamps: false
  })

  EstadoCivil.associate = (models) => {
    /**
     * Relacionamento com a tabela de pacientes
     * @see module:models/Paciente
     */
    EstadoCivil.hasMany(models.Paciente, {
      as: 'pacientes',
      foreignKey: 'estadoCivilId'
    })
  }

  return EstadoCivil
}
