/**
 * @file Mapeamento do relacionamento (M:M) entre consulta e recordatorio alimentar
 * @module src/models/ConsultaRecordatorioAlimentar
 * @author Marcos Porto
 */
export default (sequelize, DataTypes) => {
    const ConsultaRecordatorioAlimentar = sequelize.define('ConsultaRecordatorioAlimentar', {
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
      recordatorioAlimentarId: {
        type: DataTypes.INTEGER,
        field: 'recordatorio_alimentar_id',
        references: {
          model: 'recordatorio_alimentar',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    }, {
      schema: 'ceuas',
      tableName: 'consulta_recordatorio_alimentar',
      timestamps: false
    });
    
    return ConsultaRecordatorioAlimentar;
  };