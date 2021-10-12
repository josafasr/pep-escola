/**
 * @description Mapeamento do relacionamento (M:M) entre consulta e seus resonsáveis
 * @module src/models/ResponsavelConsulta
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const ResponsavelConsulta = sequelize.define('ResponsavelConsulta', {
    consultaId: {
      type: DataTypes.UUID,
      field: 'consulta_id'
    },
    responsaveis: DataTypes.TEXT
  }, {
    tableName: 'ceuas_responsavel_consulta',
    timestamps: false
  })

  ResponsavelConsulta.associate = (models) => {
    /**
     * Relacionamento com a tabela de consultas
     * @see module:src/models/Consulta
     */
     ResponsavelConsulta.belongsTo(models.Consulta, {
      as: 'consulta',
      foreignKey: 'consultaId'
    })
  }
  
  return ResponsavelConsulta
}
