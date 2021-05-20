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
    tableName: 'patologia',
    timestamps: false
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
     * Relacionamento com a tabela de antecedentes patológicos
     * @see module: src/models/AntecedentePatologico
     */
    Patologia.hasMany(models.AntecedentePatologico, {
      as:'antecedentes',
      foreignKey: 'patologiaId'
    })
  }

  return Patologia
}