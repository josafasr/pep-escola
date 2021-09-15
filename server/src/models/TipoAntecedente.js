/**
 * @description Mapeamento da tabela de tipos de antecedentes
 * @module src/models/TipoAntecedente
 * @author Josafá Santos dos Reis
 */

export default (sequelize, DataTypes) => {
  const TipoAntecedente = sequelize.define('TipoAntecedente', {
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT
  }, {
    tableName: 'ceuas_tipo_antecedente',
    timestamps: false
  })

  TipoAntecedente.associate = (models) => {
    /**
     * Relacionamento com a tabela de antecedentes
     * @see {@link src/models/Antecedente}
     */
    TipoAntecedente.hasMany(models.Antecedente, {
      as: 'antecedentes',
      foreignKey: 'tipoAntecedenteId'
    }),

    /**
     * Relacionamento com a tabela de atributos de antecedentes
     * @see {@link src/models/AntecedenteAtributo}
     */
    TipoAntecedente.hasMany(models.AntecedenteAtributo, {
      as: 'atributos',
      foreignKey: 'tipoAntecedenteId'
    })
  }

  return TipoAntecedente
}