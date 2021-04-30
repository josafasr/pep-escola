/**
 * @title Mapeamento da tabela de Patologia
 * @module src/models/Queixa
 * @author Marcos Porto, Josafá Santos dos Reis
 */

export default (sequelize, DataTypes) => {
  const Patologia = sequelize.define('Patologia', {
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    tipoPatologiaId: {
      type: DataTypes.INTEGER,
      field: 'tipo_patologia_id'
    }
  }, {
    schema: 'ceuas',
    tableName: 'patologia'
  })

  Patologia.associate = (models) => {
    /**
     * Relacionamento com a tabela de tipos de patologia
     * @see module: src/models/TipoPatologia
     */
     Patologia.belongsTo(models.TipoPatologia, {
      as:'tipoPatologia',
      foreignKey: 'tipoPatologiaId'
    }),

    /**
     * Relacionamento M:M com a tabela de pacientes
     * @see module: src/models/Paciente
     */
    Patologia.belongsToMany(models.Paciente, {
      through: models.PacienteAntecedentePatologico,
      as:'pacientes',
      foreignKey: 'patologiaId',
      otherKey: 'pacienteId'
    })
  }

  return Patologia
}