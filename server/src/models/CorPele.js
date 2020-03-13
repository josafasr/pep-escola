/**
 * @file Mapeamento da tabela de cor da pele
 * @module models/CorPele
 * @author Josafá Santos
 */
export default (sequelize, DataTypes) => {
  const CorPele = sequelize.define('CorPele', {
    nome: {
      type: DataTypes.STRING
    }
  }, {
    schema: 'dados_gerais',
    tableName: 'cor_pele'
  });

  CorPele.associate = (models) => {
    /**
     * Relacionamento com a tabela de pessoas
     * @see module:models/Pessoa
     */
    CorPele.hasMany(models.Pessoa, {
      as: 'pessoas',
      foreignKey: 'corPeleId'
    })
  };
  return CorPele;
};
