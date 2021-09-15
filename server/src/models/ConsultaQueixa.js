/**
 * @description Mapeamento do relacionamento (M:M) entre consulta e queixa
 * @module src/models/ConsultaQueixa
 * @author Marcos Porto
 */
export default (sequelize, DataTypes) => {
    const ConsultaQueixa = sequelize.define('ConsultaQueixa', {
      consultaId: {
        type: DataTypes.UUID,
        field: 'consulta_id'
      },
      queixaId: {
        type: DataTypes.INTEGER,
        field: 'queixa_id'
      }
    }, {
      tableName: 'ceuas_consulta_queixa',
      timestamps: false
    })
    
    return ConsultaQueixa
  }
