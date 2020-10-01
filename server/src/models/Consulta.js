/**
 * @title Mapeamento da tabela de consultas
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
    },
    queixaPrincipalId: {
      type: DataTypes.INTEGER,
      field: 'queixa_principal_id'
    },
    suspeitasDiagnosticas: {
      type: DataTypes.TEXT,
      field: 'suspeitas_diagnosticas'
    },
    planoConduta: {
      type: DataTypes.TEXT,
      fields: 'plano_conduta'
    }
  }, {
    schema: 'ceuas',
    tableName: 'consulta'
  });

  Consulta.associate = (models) => {
    
    /**
     * Relacionamento com a tabela de pacientes
     * @see module:src/models/Paciente
     */
    Consulta.belongsTo(models.Paciente, {
      as: 'paciente',
      foreignKey: 'pacienteId'
    }),

    /**
     * Relacionamento com a tabela de recordatórrio alimentar
     * @see module:src/models/RecordatorioAlimentar
     */
    Consulta.hasMany(models.RecordatorioAlimentar, {
      as: 'recordatorioAlimentar',
      foreignKey: 'consultaId'
    }),

    /**
     * Relacionamento com a tabela de queixas
     * @see module:src/models/Queixa
     */
    Consulta.belongsTo(models.Queixa, {
      as: 'queixaPrincipal',
      foreignKey: 'queixaPrincipalId'
    }),

    /**
     * Relacionamento (M:M) com a tabela de queixas
     * @see module:src/models/Queixa
     */
    Consulta.belongsToMany(models.Queixa, {
      through: models.ConsultaQueixa,
      as: 'queixas',
      foreignKey: 'consultaId',
      otherKey: 'queixaId'
    }),

    /**
     * Relacionamento (M:M) com a tabela de exame físico
     * @see module:src/models/ExameFisico
     */
    Consulta.belongsToMany(models.ExameFisico, {
      through: models.ConsultaExameFisico,
      as: 'exameFisico',
      foreignKey: 'consultaId',
      otherKey: 'exameFisicoId'
    })
  }

  return Consulta
}
