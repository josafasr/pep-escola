/**
 * @description Mapeamento da tabela de religiões
 * @module src/models/Religiao
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const Religiao = sequelize.define('Religiao', {
    nome: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'dg_religiao',
    timestamps: false
  });

  Religiao.associate = (models) => {
    /**
     * Relacionamento com a tabela de pacientes
     * @see module:models/Paciente
     */
    Religiao.hasMany(models.Paciente, {
      as: 'pacientes',
      foreignKey: 'religiaoId'
    })
  }

  return Religiao
}
