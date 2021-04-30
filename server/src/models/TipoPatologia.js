/**
 * @title Mapeamento da tabela de tipos de patologia
 * @module src/models/TopoPatologia
 * @author Marcos Porto, Josafá Santos dos Reis
 */

export default (sequelize, DataTypes) => {
  const TipoPatologia = sequelize.define('TipoPatologia', {
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    schema: 'ceuas',
    tableName: 'tipo_patologia',
    timestamps: false 
  })

  TipoPatologia.associate = (models) => {
    /**
     * Relacionamento com a tabela de patologia
     * @see module: src/models/Patologia
     */
    TipoPatologia.hasMany(models.Patologia, {
        as: 'patologias',
        foreignKey: 'tipoPatologiaId'
    })
  }

  return TipoPatologia
}