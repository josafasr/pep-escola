/**
 * @file Mapeamento da tabela de medicamentos
 * @module models/Medicamento
 * @author Josafá Santos
 */
export default (sequelize, DataTypes) => {
  const Medicamento = sequelize.define('Medicamento', {
    nome: {
      type: DataTypes.STRING
    },
    dose: {
      type: DataTypes.STRING
    },
    apresentacaoMedicamentoId: {
      type: DataTypes.INTEGER,
      field: 'apresentacao_medicamento_id'
    }
  },
  {
    schema: 'ceuas',
    tableName: 'medicamento'
  });

  Medicamento.associate = (models) => {
    /**
     * Relacionamento com a tabela de apresentações de medicamentos
     * @see module:models/ApresentacaoMedicamento
     */
    Medicamento.belongsTo(models.ApresentacaoMedicamento, {
      as: 'apresentacao',
      foreignKey: 'apresentacaoMedicamentoId'
    })
  };
  return Medicamento;
};
