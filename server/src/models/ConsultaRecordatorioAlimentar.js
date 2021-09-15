/**
 * @file Mapeamento do relacionamento (M:M) entre consulta e recordatorio alimentar
 * @module src/models/ConsultaRecordatorioAlimentar
 * @author Marcos Porto
 */
export default (sequelize, DataTypes) => {
    const ConsultaRecordatorioAlimentar = sequelize.define('ConsultaRecordatorioAlimentar', {
      consultaId: {
        type: DataTypes.UUID,
        field: 'consulta_id',
        references: {
          model: 'ceuas_consulta',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      recordatorioAlimentarId: {
        type: DataTypes.INTEGER,
        field: 'recordatorio_alimentar_id',
        references: {
          model: 'ceuas_recordatorio_alimentar',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    }, {
      tableName: 'ceuas_consulta_recordatorio_alimentar',
      timestamps: false
    });
    
    return ConsultaRecordatorioAlimentar;
  };