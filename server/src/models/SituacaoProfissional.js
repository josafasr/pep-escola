/**
 * @file Mapeamento da tabela de situações profissionais
 * @module models/SituacaoProfissional
 * @author Josafá Santos
 */
export default (sequelize, DataTypes) => {
  const SituacaoProfissional = sequelize.define('SituacaoProfissional', {
    nome: {
      type: DataTypes.STRING
    }
  }, {
    schema: 'dados_gerais',
    tableName: 'situacao_profissional'
  });

  SituacaoProfissional.associate = (models) => {
    /**
     * Relacionamento com a tabela de pessoas
     * @see module:models/Pessoa
     */
    SituacaoProfissional.hasMany(models.Pessoa, {
      as: 'pessoas',
      foreignKey: 'situacaoProfissionalId'
    })
  };
  return SituacaoProfissional;
};
