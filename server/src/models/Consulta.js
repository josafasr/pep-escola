/**
 * @file Mapeamento da tabela de consultas
 * @module src/models/Consulta
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const Consulta = sequelize.define('Consulta', {
    acompanhante: DataTypes.STRING,
    
    queixaPrincipalObs: {
      type: DataTypes.TEXT,
      field: 'queixa_principal_obs'
    },
    historiaDoencaAtual: {
      type: DataTypes.TEXT,
      field: 'historia_doenca_atual'
    },
    pacienteId: {
      type: DataTypes.INTEGER,
      field: 'paciente_id'
    }
  }, {
    schema: 'ceuas',
    tableName: 'consulta'
  });

  Consulta.associate = (models) => {
    
    /**
     * Relacionamento com a tabela de pacientes
     * @see module:models/Paciente
     */
    Consulta.belongsTo(models.Paciente, {
      as: 'paciente',
      foreignKey: 'pacienteId'
    }),

    /**
     * Relacionamento com a tabela de recordatórrio alimentar
     * @see module:models/RecordatorioAlimentar
     */
    Consulta.hasMany(models.RecordatorioAlimentar, {
      as: 'recordatorioAlimentar',
      foreignKey: 'consultaId'
    }),

    /**
     * Relacionamento (M:M) com a tabela de queixas
     * @see module:models/Queixa
     */
    Consulta.belongsToMany(models.Queixa, {
      through: models.ConsultaQueixa,
      as: 'queixas',
      foreignKey: 'consultaId',
      otherKey: 'queixaId'
    })
  }
  return Consulta
}