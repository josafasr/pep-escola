/**
 * @file Mapeamento da tabela de pessoas
 * @module models/Pessoa
 * @author Josafá Santos
 */
export default (sequelize, DataTypes) => {
  const Pessoa = sequelize.define('Pessoa', {
    nome: {
      type: DataTypes.STRING
    },
    dataNascimento: {
      type: DataTypes.DATE,
      field: 'data_nascimento'
    },
    sexo: {
      type: DataTypes.INTEGER
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
    profissaoId: {
      type: DataTypes.INTEGER,
      field: 'profissao_id'
    },
    situacaoProfissionalId: {
      type: DataTypes.INTEGER,
      field: 'situacao_profissional_id'
    },
    enderecoId: {
      type: DataTypes.INTEGER,
      field: 'endereco_id'
    }
  }, {
    schema: 'dados_gerais',
    tableName: 'pessoa'
  });

  Pessoa.associate = (models) => {
    /**
     * Relacionamento com a tabela de países
     * @see {@link Pais}
     */
    Pessoa.belongsTo(models.Pais, {
      as: 'nacionalidade',
      foreignKey: 'nacionalidadeId'
    }),

    /**
     * Relacionamento com a tabela de cidades
     * @see module:models/Cidade
     */
    Pessoa.belongsTo(models.Cidade, {
      as: 'naturalidade',
      foreignKey: 'naturalidadeId'
    }),

    /**
     * Relacionamento com a tabela de estados civis
     * @see module:models/EstadoCivil
     */
    Pessoa.belongsTo(models.EstadoCivil, {
      as: 'estadoCivil',
      foreignKey: 'estadoCivilId'
    }),

    /**
     * Relacionamento com a tabela de cores de pele
     * @see module:models/CorPele
     */
    Pessoa.belongsTo(models.CorPele, {
      as: 'corPele',
      foreignKey: 'corPeleId'
    }),

    /**
     * Relacionamento com a tabela de escolaridades
     * @see module:models/Escolaridade
     */
    Pessoa.belongsTo(models.Escolaridade, {
      as: 'escolaridade',
      foreignKey: 'escolaridadeId'
    }),

    /**
     * Relacionamento com a tabela de profissões
     * @see module:models/Profissao
     */
    Pessoa.belongsTo(models.Profissao, {
      as: 'profissao',
      foreignKey: 'profissaoId'
    }),

    /**
     * Relacionamento com a tabela de situações profissionais
     * @see module:models/SituacaoProfissional
     */
    Pessoa.belongsTo(models.SituacaoProfissional, {
      as: 'situacaoProfissional',
      foreignKey: 'situacaoProfissionalId'
    }),

    /**
     * Relacionamento com a tabela de endereços
     * @see module:models/Endereco
     */
    Pessoa.belongsTo(models.Endereco, {
      as: 'endereco',
      foreignKey: 'enderecoId'
    })
  };
  return Pessoa;
};
