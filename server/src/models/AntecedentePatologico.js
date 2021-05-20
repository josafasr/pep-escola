/**
 * @title Mapeamento da antecedentes patológicos
 * @module src/models/AntecedentePatologico
 * @author Marcos Porto, Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const AntecedentePatologico = sequelize.define('AntecedentePatologico', {
    pacienteId: {
      type: DataTypes.INTEGER,
      field: 'paciente_id'
    },
    patologiaId: {
      type: DataTypes.INTEGER,
      field: 'patologia_id'
    },
    tempoDiagnostico: {
      type: DataTypes.STRING,
      field: 'tempo_diagnostico'
    }
  }, {
    schema: 'ceuas',
    tableName: 'antecedente_patologico'
  })

  AntecedentePatologico.associate = (models) => {
    /**
     * Relacionamento com a tabela de patologias
     * @see module: src/models/Patologia
     */
     AntecedentePatologico.belongsTo(models.Patologia, {
      as:'patologia',
      foreignKey: 'patologiaId'
    }),

    /**
     * Relacionamento com a tabela de pacientes
     * @see module: src/models/Paciente
     */
     AntecedentePatologico.belongsTo(models.Paciente, {
      as:'paciente',
      foreignKey: 'pacienteId'
    })
  }
  
  return AntecedentePatologico
}
