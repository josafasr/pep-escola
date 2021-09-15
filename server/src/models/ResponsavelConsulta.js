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
    usuarioId: {
      type: DataTypes.UUID,
      field: 'usuario_id'
    }
  }, {
    tableName: 'ceuas_responsavel_consulta',
    timestamps: false
  })
  
  return ResponsavelConsulta
}
