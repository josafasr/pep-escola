/**
 * @description Mapeamento da tabela de pacientes
 * @module src/models/Paciente
 * @author Josafá Santos dos Reis
 */

import { v4 as uuid } from 'uuid'

import db from '.'
import { generateProntuaryNumber } from '../utils'

export default (sequelize, DataTypes) => {
  const Paciente = sequelize.define('Paciente', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    prontuario: DataTypes.STRING,
    rg: DataTypes.STRING,
    cpf: DataTypes.STRING,
    cartaoFamilia: {
      type: DataTypes.STRING,
      field: 'cartao_familia'
    },
    cns: DataTypes.STRING,
    agenteComunitario: {
      type: DataTypes.STRING,
      field: 'agente_comunitario'
    },
    /** vincular à consulta */
    /* encaminhadoPor: {
      type: DataTypes.STRING,
      field: 'encaminhado_por'
    }, */
    pessoaId: {
      type: DataTypes.UUID,
      field: 'pessoa_id'
    },
    unidadeSaudeId: {
      type: DataTypes.UUID,
      field: 'unidade_saude_id'
    },
    nacionalidadeId: {
      type: DataTypes.INTEGER,
      field: 'nacionalidade_id'
    },
    naturalidadeId: {
      type: DataTypes.INTEGER,
      field: 'naturalidade_id'
    },
    estadoCivilId: {
      type: DataTypes.INTEGER,
      field: 'estado_civil_id'
    },
    religiaoId: {
      type: DataTypes.INTEGER,
      field: 'religiao_id'
    },
    corPeleId: {
      type: DataTypes.INTEGER,
      field: 'cor_pele_id'
    },
    escolaridadeId: {
      type: DataTypes.INTEGER,
      field: 'escolaridade_id'
    },
    tempoEstudoId: {
      type: DataTypes.INTEGER,
      field: 'tempo_estudo_id'
    },
    profissaoId: {
      type: DataTypes.INTEGER,
      field: 'profissao_id'
    },
    situacaoProfissionalId: {
      type: DataTypes.INTEGER,
      field: 'situacao_profissional_id'
    }
  }, {
    tableName: 'ceuas_paciente',
    hooks: {
      beforeCreate: async (paciente) => {
        if (!paciente.id) {
          const id = await Promise.resolve(uuid())
          paciente.id = id
        }

        if (!paciente.prontuario) {
          const numProntuario = await generateProntuaryNumber(db)
          paciente.prontuario = numProntuario
        }
      }
    }
  })

  Paciente.associate = (models) => {
    
    /**
     * Relacionamento com a tabela de pessoas
     * @see module: src/models/Pessoa
     */
    Paciente.belongsTo(models.Pessoa, {
      as: 'pessoa',
      foreignKey: 'pessoaId'
    }),

    /**
     * Relacionamento com a tabela de unidades de saúde
     * @see module:models/UnidadeSaude
     */
    Paciente.belongsTo(models.UnidadeSaude, {
      as: 'unidadeSaude',
      foreignKey: 'unidadeSaudeId'
    }),
    
    /**
     * Relacionamento com a tabela de países
     * @see module:models/Pais
     */
    Paciente.belongsTo(models.Pais, {
      as: 'nacionalidade',
      foreignKey: 'nacionalidadeId'
    }),

    /**
     * Relacionamento com a tabela de cidades
     * @see module:models/Cidade
     */
    Paciente.belongsTo(models.Cidade, {
      as: 'naturalidade',
      foreignKey: 'naturalidadeId'
    }),

    /**
     * Relacionamento com a tabela de estados civis
     * @see module:models/EstadoCivil
     */
    Paciente.belongsTo(models.EstadoCivil, {
      as: 'estadoCivil',
      foreignKey: 'estadoCivilId'
    }),

    /**
     * Relacionamento com a tabela de religioes
     * @see module:models/Religiao
     */
    Paciente.belongsTo(models.Religiao, {
      as: 'religiao',
      foreignKey: 'religiaoId'
    }),

    /**
     * Relacionamento com a tabela de cores de pele
     * @see module:models/CorPele
     */
    Paciente.belongsTo(models.CorPele, {
      as: 'corPele',
      foreignKey: 'corPeleId'
    }),

    /**
     * Relacionamento com a tabela de escolaridades
     * @see module:models/Escolaridade
     */
    Paciente.belongsTo(models.Escolaridade, {
      as: 'escolaridade',
      foreignKey: 'escolaridadeId'
    }),

    /**
     * Relacionamento com a tabela de tempos de estudo
     * @see module:src/models/TempoEstudo
     */
    Paciente.belongsTo(models.TempoEstudo, {
      as: 'tempoEstudo',
      foreignKey: 'tempoEstudoId'
    }),

    /**
     * Relacionamento com a tabela de profissões
     * @see module:models/Profissao
     */
    Paciente.belongsTo(models.Profissao, {
      as: 'profissao',
      foreignKey: 'profissaoId'
    }),

    /**
     * Relacionamento com a tabela de situações profissionais
     * @see module:models/SituacaoProfissional
     */
    Paciente.belongsTo(models.SituacaoProfissional, {
      as: 'situacaoProfissional',
      foreignKey: 'situacaoProfissionalId'
    }),

    /**
     * Relacionamento com a tabela de especialidades
     * @see module:models/Especialidade
     */
    Paciente.belongsToMany(models.Especialidade, {
      through: models.PacienteEspecialidade,
      as: 'especialidades',
      foreignKey: 'pacienteId',
      otherKey: 'especialidadeId'
    }),

    /**
     * Relacionamento com a tabela de antecedentes patológicos
     * @see module: src/models/AntecedentePatologico
     */
     Paciente.hasMany(models.AntecedentePatologico, {
      as:'antecedentesPatologicos',
      foreignKey: 'pacienteId'
    })
  }

  return Paciente
}
