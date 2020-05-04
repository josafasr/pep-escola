/**
 * @file Mapeamento da tabela de pacientes
 * @module src/models/Paciente
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const Paciente = sequelize.define('Paciente', {
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
    encaminhadoPor: {
      type: DataTypes.STRING,
      field: 'encaminhado_por'
    },
    // pessoaId: {
    //   type: DataTypes.INTEGER,
    //   field: 'pessoa_id'
    // },
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
    profissaoId: {
      type: DataTypes.INTEGER,
      field: 'profissao_id'
    },
    situacaoProfissionalId: {
      type: DataTypes.INTEGER,
      field: 'situacao_profissional_id'
    }
  }, {
    schema: 'ceuas',
    tableName: 'paciente'
  });

  Paciente.associate = (models) => {
    
    /**
     * Relacionamento com a tabela de pessoas
     * @see {@link Pessoa}
     */
    // Paciente.belongsTo(models.Pessoa, {
    //   as: 'pessoa',
    //   foreignKey: 'pessoaId'
    // }),
    
    /**
     * Relacionamento com a tabela de países
     * @see {@link Pais}
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
    })
  };
  return Paciente;
};