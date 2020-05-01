/**
 * @file Mapeamento da tabela de profissões
 * @module src/models/Profissao
 * @author Josafá Santos dos Reis
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
     * Relacionamento com a tabela de pacientes
     * @see module:models/Paciente
     */
    Profissao.hasMany(models.Paciente, {
      as: 'paciente',
      foreignKey: 'profissaoId'
    })
  };
  return Profissao;
};
