/**
 * @file Mapeamento da tabela de tipos de Apresenatação de Medicamentos
 * @module models/ApresentacaoMedicamento
 * @author Josafá Santos
 */
export default (sequelize, DataTypes) => {
  const ApresentacaoMedicamento = sequelize.define('ApresentacaoMedicamento', {
    nome: {
      type: DataTypes.STRING
    }
  },
  {
    schema: 'ceuas',
    tableName: 'apresentacao_medicamento'
  });

  ApresentacaoMedicamento.associate = (models) => {
    /**
     * Relacionamento com a tabela de medicamentos
     * @see module:models/Medicamento
     */
    ApresentacaoMedicamento.hasMany(models.Medicamento, {
      as: 'medicamentos',
      foreignKey: 'apresentacaoMedicamentoId'
    })
  };
  return ApresentacaoMedicamento;
};
