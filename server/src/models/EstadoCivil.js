/**
 * @file Mapeamento da tabela de estados civis
 * @module models/EstadoCivil
 * @author Josafá Santos
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
     * Relacionamento com a tabela de pessoas
     * @see module:models/Pessoa
     */
    EstadoCivil.hasMany(models.Pessoa, {
      as: 'pessoas',
      foreignKey: 'estadoCivilId'
    })
  };
  return EstadoCivil;
};
