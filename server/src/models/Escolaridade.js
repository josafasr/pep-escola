/**
 * @description Mapeamento da tabela de escolaridades
 * @module src/models/Escolaridade
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const Escolaridade = sequelize.define('Escolaridade', {
    nome: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'dg_escolaridade',
    timestamps: false
  })

  Escolaridade.associate = (models) => {
    /**
     * Relacionamento com a tabela de pacientes
     * @see module:src/models/Paciente
     */
    Escolaridade.hasMany(models.Paciente, {
      as: 'pacientes',
      foreignKey: 'escolaridadeId'
    })
  }

  return Escolaridade
}
