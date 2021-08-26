/**
 * @description Mapeamento da tabela de endereços
 * @module src/models/Endereco
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const Endereco = sequelize.define('Endereco', {
    logradouro: {
      type: DataTypes.STRING
    },
    numero: {
      type: DataTypes.INTEGER
    },
    bairro: {
      type: DataTypes.STRING
    },
    complemento: {
      type: DataTypes.STRING
    },
    cep: {
      type: DataTypes.STRING,
      validate: {
        len: [8, 8],
        is: ['[0-9]', 'i']
      }
    },
    ativo: {
      type: DataTypes.BOOLEAN
    },
    tipoLogradouroId: {
      type: DataTypes.INTEGER,
      field: 'tipo_logradouro_id'
    },
    cidadeId: {
      type: DataTypes.INTEGER,
      field: 'cidade_id'
    }
  }, {
    tableName: 'dg_endereco'
  })

  Endereco.associate = (models) => {

    /**
     * Relacionamento com a tabela de tipos de logradouro
     * @see module:models/TipoLogradouro
     */
    Endereco.belongsTo(models.TipoLogradouro, {
      as: 'tipoLogradouro',
      foreignKey: 'tipoLogradouroId'
    }),

    /**
     * Relacionamento com a tabela de cidades
     * @see module:models/Cidade
     */
    Endereco.belongsTo(models.Cidade, {
      as: 'cidade',
      foreignKey: 'cidadeId'
    }),

    /**
     * Relacionamento com a tabela de pessoas
     * @see module:models/Pessoa
     */
    Endereco.belongsToMany(models.Pessoa, {
      through: models.PessoaEndereco,
      as: 'pessoas',
      foreignKey: 'enderecoId',
      otherKey: 'pessoaId'
    })
  }

  return Endereco
}
