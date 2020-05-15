/**
 * @file Mapeamento do relacionamento (M:M) entre consulta e queixa
 * @module src/models/ConsultaQueixa
 * @author Marcos Porto
 */
export default (sequelize, DataTypes) => {
    const ConsultaQueixa = sequelize.define('ConsultaQueixa', {
      consultaId: {
        type: DataTypes.INTEGER,
        field: 'consulta_id',
        references: {
          model: 'consulta',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      queixaId: {
        type: DataTypes.INTEGER,
        field: 'queixa_id',
        references: {
          model: 'queixa',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    }, {
      schema: 'ceuas',
      tableName: 'consulta_queixa',
      timestamps: false
    });
    
    return ConsultaQueixa;
  };
