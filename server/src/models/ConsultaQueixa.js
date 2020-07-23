/**
 * @title Mapeamento do relacionamento (M:M) entre consulta e queixa
 * @module src/models/ConsultaQueixa
 * @author Marcos Porto
 */
export default (sequelize, DataTypes) => {
    const ConsultaQueixa = sequelize.define('ConsultaQueixa', {
      consultaId: {
        type: DataTypes.INTEGER,
        field: 'consulta_id'
      },
      queixaId: {
        type: DataTypes.INTEGER,
        field: 'queixa_id'
      }
    }, {
      schema: 'ceuas',
      tableName: 'consulta_queixa',
      timestamps: false
    })
    
    return ConsultaQueixa
  }
