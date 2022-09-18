/**
 * @description Mapeamento da tabela de consultas
 * @module src/models/Consulta
 * @author Josafá Santos dos Reis
 */

import { v4 as uuid } from 'uuid'

export default (sequelize, DataTypes) => {
  const Consulta = sequelize.define('Consulta', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    primeira: DataTypes.BOOLEAN,
    acompanhante: DataTypes.STRING,
    fonteEncaminhamento: {
      type: DataTypes.STRING,
      field: 'fonte_encaminhamento'
    },
    queixaPrincipalObs: {
      type: DataTypes.TEXT,
      field: 'queixa_principal_obs'
    },
    historiaDoencaAtual: {
      type: DataTypes.TEXT,
      field: 'historia_doenca_atual'
    },
    suspeitasDiagnosticas: {
      type: DataTypes.TEXT,
      field: 'suspeitas_diagnosticas'
    },
    planoConduta: {
      type: DataTypes.TEXT,
      fields: 'plano_conduta'
    },
    pacienteId: {
      type: DataTypes.STRING,
      field: 'paciente_id'
    },
    queixaPrincipalId: {
      type: DataTypes.INTEGER,
      field: 'queixa_principal_id'
    }
  }, {
    tableName: 'ceuas_consulta',
    hooks: {
      beforeCreate: async (consulta) => {
        if (!consulta.id) {
          const id = await Promise.resolve(uuid())
          consulta.id = id
        }
      }
    }
  })

  Consulta.associate = (models) => {
    
    /**
     * Relacionamento com a tabela de pacientes
     * @see module:src/models/Paciente
     */
    /* Consulta.belongsTo(models.Paciente, {
      as: 'paciente',
      foreignKey: 'pacienteId'
    }), */

    /**
     * Relacionamento com a tabela de recordatórrio alimentar
     * @see module:src/models/RecordatorioAlimentar
     */
    Consulta.hasMany(models.RecordatorioAlimentar, {
      as: 'recordatorioAlimentar',
      foreignKey: 'consultaId'
    }),

    /**
     * Relacionamento com a tabela de complemento do recordatórrio alimentar
     * @see module:src/models/ComplementoRecordatorioAlimentar
     */
     Consulta.hasOne(models.ComplementoRecordatorioAlimentar, {
      as: 'complementoRecordatorioAlimentar',
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
     * Relacionamento com a tabela de indicativos exame físico
     * @see module:src/models/IndicadoresExameFisico
     */
    Consulta.hasOne(models.IndicadoresExameFisico, {
      as: 'indicadoresExameFisico',
      foreignKey: 'consultaId'
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
    }),

    /**
     * Relacionamento (M:M) com a tabela de usuários
     * @see module:src/models/Usuario
     */
    /* Consulta.belongsToMany(models.Usuario, {
      through: models.ResponsavelConsulta,
      as: 'responsaveis',
      foreignKey: 'consultaId',
      otherKey: 'usuarioId'
    }), */

    /**
     * Relacionamento com a tabela de avaliação de atendimento
     * @see module:src/models/AvaliacaoAtendimento
     */
    /* Consulta.hasOne(models.AvaliacaoAtendimento, {
      as: 'avaliacao',
      foreignKey: 'consultaId'
    }), */

    /**
     * Relacionamento com a tabela de complemento de queixas
     * @see module: src/models/ComplementoConsultaTipoQueixa
     */
    Consulta.hasMany(models.ComplementoConsultaTipoQueixa, {
      as: 'complementosQueixas',
      foreignKey: 'consultaId'
    }),

    /**
     * Relacionamento com a tabela de complemento de exame físico
     * @see {@link src/models/ComplementoConsultaExameFisico}
     */
    Consulta.hasMany(models.ComplementoConsultaExameFisico, {
      as: 'complementosExameFisico',
      foreignKey: 'consultaId'
    }),

    /**
     * Relacionamento com a tabela de valores de atributos de antecedentes
     * @see {@link src/models/ConsultaAntecedenteAtributo}
     */
     Consulta.hasMany(models.ConsultaAntecedenteAtributo, {
      as: 'antecedentesAtributos',
      foreignKey: 'consultaId'
    }),

    /**
     * Relacionamento com a tabela de complemento de complementos de antecedentes
     * @see {@link src/models/ComplementoConsultaAntecedente}
     */
    Consulta.hasMany(models.ComplementoConsultaAntecedente, {
      as: 'complementosAntecedentes',
      foreignKey: 'consultaId'
    })

    /**
     * Relacionamento com a tabela de resnposaveis pela consulta
     * @see {@link src/models/ResponsavelConsulta}
     */
     Consulta.hasOne(models.ResponsavelConsulta, {
      as: 'responsaveis',
      foreignKey: 'consultaId'
    })
  }

  return Consulta
}
