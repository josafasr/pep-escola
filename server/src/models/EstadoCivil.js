/**
 * @file Mapeamento da tabela de estados civis
 * @module src/models/EstadoCivil
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const EstadoCivil = sequelize.define('EstadoCivil', {
    nome: {
      type: DataTypes.STRING
    }
  }, {
    schema: 'dados_gerais',
    tableName: 'estado_civil'
  });

  EstadoCivil.associate = (models) => {
    /**
     * Relacionamento com a tabela de pacientes
     * @see module:models/Paciente
     */
    EstadoCivil.hasMany(models.Paciente, {
      as: 'pacientes',
      foreignKey: 'estadoCivilId'
    })
  };
  return EstadoCivil;
};
