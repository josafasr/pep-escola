/**
 * @file Mapeamento da tabela de endereços
 * @module models/Endereco
 * @author Josafá Santos
 */
export default (sequelize, DataTypes) => {
  const Endereco = sequelize.define('Endereco', {
    nome: {
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
    telefone: {
      type: DataTypes.STRING
    },
    telefoneOutro: {
      type: DataTypes.STRING,
      field: 'telefone_outro'
    },
    tipoLogradouroId: {
      type: DataTypes.STRING,
      field: 'tipo_logradouro_id'
    },
    cidadeId: {
      type: DataTypes.STRING,
      field: 'cidade_id'
    }
  }, {
    schema: 'dados_gerais',
    tableName: 'endereco'
  });

  Endereco.associate = (models) => {
    /**
     * Relacionamento com a tabela de pessoas
     * @see module:models/Pessoa
     */
    Endereco.hasMany(models.Pessoa, {
      as: 'pessoas',
      foreignKey: 'enderecoId'
    })
  };
  return Endereco;
};
