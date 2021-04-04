/**
 * @title Mapeamento do relacionamento (M:M) entre consulta e seus resonsáveis
 * @module src/models/ResponsavelConsulta
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const ResponsavelConsulta = sequelize.define('ResponsavelConsulta', {
    consultaId: {
      type: DataTypes.INTEGER,
      field: 'consulta_id'
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      field: 'usuario_id'
    }
  }, {
    schema: 'ceuas',
    tableName: 'responsavel_consulta',
    timestamps: false
  })
  
  return ResponsavelConsulta
}
