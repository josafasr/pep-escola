/**
 * @description Mapeamento da tabela de tempo de estudo
 * @module src/models/TempoEstudo
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const TempoEstudo = sequelize.define('TempoEstudo', {
    nome: DataTypes.STRING
  }, {
    tableName: 'dg_tempo_estudo',
    timestamps: false
  })

  TempoEstudo.associate = (models) => {
    /**
     * Relacionamento com a tabela de pacientes
     * @see module:src/models/Paciente
     */
    TempoEstudo.hasMany(models.Paciente, {
      as: 'pacientes',
      foreignKey: 'tempoEstudoId'
    })
  }

  return TempoEstudo
}
