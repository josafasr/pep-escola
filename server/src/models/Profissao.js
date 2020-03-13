/**
 * @file Mapeamento da tabela de profissões
 * @module models/Profissao
 * @author Josafá Santos
 */
export default (sequelize, DataTypes) => {
  const Profissao = sequelize.define('Profissao', {
    nome: {
      type: DataTypes.STRING
    }
  }, {
    schema: 'dados_gerais',
    tableName: 'profissao'
  });

  Profissao.associate = (models) => {
    /**
     * Relacionamento com a tabela de pessoas
     * @see module:models/Pessoa
     */
    Profissao.hasMany(models.Pessoa, {
      as: 'pessoas',
      foreignKey: 'profissaoId'
    })
  };
  return Profissao;
};
