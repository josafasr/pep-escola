/**
 * @file Mapeamento da tabela de religiões
 * @module models/Religiao
 * @author Josafá Santos
 */
export default (sequelize, DataTypes) => {
  const Religiao = sequelize.define('Religiao', {
    nome: {
      type: DataTypes.STRING
    }
  }, {
    schema: 'dados_gerais',
    tableName: 'religiao'
  });

  Religiao.associate = (models) => {
    /**
     * Relacionamento com a tabela de pesssoas
     * @see module:models/Pessoa
     */
    Religiao.hasMany(models.Pessoa, {
      as: 'pessoas',
      foreignKey: 'religiaoId'
    })
  };
  return Religiao;
};
