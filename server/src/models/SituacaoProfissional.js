/**
 * @file Mapeamento da tabela de situações profissionais
 * @module src/models/SituacaoProfissional
 * @author Josafá Santos dos Reis
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
     * Relacionamento com a tabela de pacientes
     * @see module:models/Paciente
     */
    SituacaoProfissional.hasMany(models.Paciente, {
      as: 'pecientes',
      foreignKey: 'situacaoProfissionalId'
    })
  };
  return SituacaoProfissional;
};
