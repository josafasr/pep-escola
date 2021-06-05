/**
 * @description Mapeamento M:M entre as tabelas de pacientes e antecedentes
 * @module src/models/PacienteAntecedente
 * @author Josafá Santos dos Reis
 */

export default (sequelize, DataTypes) => {
  const PacienteAntecedente = sequelize.define('PacienteAntecedente', {
    pacienteId: {
      type: DataTypes.INTEGER,
      field: 'paciente_id'
    },
    antecedenteId: {
      type: DataTypes.INTEGER,
      field: 'antecedente_id'
    }
  }, {
    schema: 'ceuas',
    tableName: 'paciente_antecedente'
  })

  PacienteAntecedente.associate = (models) => {
    /**
     * Relacionamento com a tabela de pacientes
     * @see {@link src/models/Paciente}
     */
     PacienteAntecedente.belongsTo(models.Paciente, {
      as: 'paciente',
      foreignKey: 'pacienteId'
    }),

    /**
     * Relacionamento com a tabela de antecedentes
     * @see {@link src/models/Antecedente}
     */
     PacienteAntecedente.belongsTo(models.Antecedente, {
      as: 'antecedente',
      foreignKey: 'antecedenteId'
    })
  }

  return PacienteAntecedente
}