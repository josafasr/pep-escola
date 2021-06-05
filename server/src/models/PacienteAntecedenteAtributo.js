/**
 * @description Mapeamento do relacionamento entre a tabela de pacientes e antecedentes
 * @module src/models/PacienteAntecedenteAtributo
 * @author Josafá Santos dos Reis
 */

export default (sequelize, DataTypes) => {
  const PacienteAntecedenteAtributo = sequelize.define('PacienteAntecedenteAtributo', {
    atributoValor: {
      type: DataTypes.STRING,
      field: 'atributo_valor'
    },
    pacienteId: {
      type: DataTypes.INTEGER,
      field: 'paciente_id'
    },
    antecedenteAtributoId: {
      type: DataTypes.INTEGER,
      field: 'antecedente_atributo_id'
    },
    antecedenteId: {
      type: DataTypes.INTEGER,
      field: 'antecedente_id'
    }
  }, {
    schema: 'ceuas',
    tableName: 'paciente_antecedente_atributo'
  })

  PacienteAntecedenteAtributo.associate = (models) => {
    /**
     * Relacionamento com a tabela de pacientes
     * @see {@link src/models/Paciente}
     */
     PacienteAntecedenteAtributo.belongsTo(models.Paciente, {
      as: 'paciente',
      foreignKey: 'pacienteId'
    }),

    /**
     * Relacionamento com a tabela de atributos de antecedentes
     * @see {@link src/models/AntecedenteAtributo}
     */
    PacienteAntecedenteAtributo.belongsTo(models.AntecedenteAtributo, {
      as: 'antecedenteAtributo',
      foreignKey: 'antecedenteAtributoId'
    }),

    /**
     * Relacionamento com a tabela de tipos de antecedentes
     * @see {@link src/models/Antecedente}
     */
     PacienteAntecedenteAtributo.belongsTo(models.Antecedente, {
      as: 'antecedente',
      foreignKey: 'antecedenteId'
    })
  }

  return PacienteAntecedenteAtributo
}