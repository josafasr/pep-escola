/**
 * @file Mapeamento da tabela de escolaridades
 * @module models/Escolaridade
 * @author Josafá Santos
 */
export default (sequelize, DataTypes) => {
  const Escolaridade = sequelize.define('Escolaridade', {
    nome: {
      type: DataTypes.STRING
    }
  }, {
    schema: 'dados_gerais',
    tableName: 'escolaridade'
  });

  Escolaridade.associate = (models) => {
    /**
     * Relacionamento com a tabela de pessoas
     * @see module:models/Pessoa
     */
    Escolaridade.hasMany(models.Pessoa, {
      as: 'pessoas',
      foreignKey: 'escolaridadeId'
    })
  };
  return Escolaridade;
};
