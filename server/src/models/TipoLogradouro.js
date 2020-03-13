/**
 * @file Mapeamento da tabela de tipos de logradouros
 * @module models/TipoLogradouro
 * @author Josafá Santos
 */
export default (sequelize, DataTypes) => {
  const TipoLogradouro = sequelize.define('TipoLogradouro', {
    nome: {
      type: DataTypes.STRING
    }
  }, {
    schema: 'dados_gerais',
    tableName: 'tipo_logradouro'
  });

  TipoLogradouro.associate = (models) => {
    /**
     * Relacionamento com a tabela de tipos de logradouro
     * @see module:models/Endereco
     */
    TipoLogradouro.hasMany(models.Endereco, {
      as: 'enderecos',
      foreignKey: 'tipoLogradouroId'
    })
  };
  return TipoLogradouro;
};
