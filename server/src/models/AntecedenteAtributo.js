/**
 * @description Mapeamento da tabela de atributos de antecedentes
 * @module src/models/AntecedenteAtributo
 * @author Josafá Santos dos Reis
 */

export default (sequelize, DataTypes) => {
  const AntecedenteAtributo = sequelize.define('AntecedenteAtributo', {
    nome: DataTypes.STRING,
    tipoDado: {
      type: DataTypes.STRING,
      field: 'tipo_dado'
    },
    tipoAntecedenteId: {
      type: DataTypes.INTEGER,
      field: 'tipo_antecedente_id'
    }
  }, {
    schema: 'ceuas',
    tableName: 'antecedente_atributo',
    timestamps: false
  })

  AntecedenteAtributo.associate = (models) => {
    /**
     * Relacionamento com a tabela de tipos de antecedentes
     * @see {@link src/models/TipoAntecedente}
     */
    AntecedenteAtributo.belongsTo(models.TipoAntecedente, {
      as: 'tipoAntecedente',
      foreignKey: 'tipoAntecedenteId'
    }),

    /**
     * Relacionamento com a tabela de valores de atributos de antecedentes
     * @see {@link src/models/PacienteAntecedenteAtributo}
     */
     AntecedenteAtributo.hasMany(models.PacienteAntecedenteAtributo, {
      as: 'valoresAntecedentesAtributos',
      foreignKey: 'antecedenteAtributoId'
    })
  }

  return AntecedenteAtributo
}