/**
 * @description Mapeamento da tabela de antecedentes
 * @module src/models/Antecedente
 * @author Josafá Santos dos Reis
 */

export default (sequelize, DataTypes) => {
  const Antecedente = sequelize.define('Antecedente', {
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    tipoAntecedenteId: {
      type: DataTypes.INTEGER,
      field: 'tipo_antecedente_id'
    }
  }, {
    schema: 'ceuas',
    tableName: 'antecedente',
    timestamps: false
  })

  Antecedente.associate = (models) => {
    /**
     * Relacionamento com a tabela de tipos de antecedentes
     * @see {@link src/models/TipoAntecedente}
     */
    Antecedente.belongsTo(models.TipoAntecedente, {
      as: 'tipoAntecedente',
      foreignKey: 'tipoAntecedenteId'
    })

    /**
     * Relacionamento com a tabela de valores de atributos de antecedentes
     * @see {@link src/models/PacienteAntecedenteAtributo}
     */
    Antecedente.hasMany(models.PacienteAntecedenteAtributo, {
      as: 'atributos',
      foreignKey: 'antecedenteId'
    })
  }

  return Antecedente
}