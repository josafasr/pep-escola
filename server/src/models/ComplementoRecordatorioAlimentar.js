/**
 * @description Mapeamento da tabela de complemnto do Recordatorio Alimentar
 * @module src/models/ComplementoRecordatorioAlimentar
 * @author Marcos Porto, Josafá Santos dos Reis
 */

export default (sequelize, DataTypes) => {
    const ComplementoRecordatorioAlimentar = sequelize.define('ComplementoRecordatorioAlimentar', {
      complemento: DataTypes.TEXT,
      consultaId: {
        type: DataTypes.UUID,
        field: 'consulta_id'
      }
    }, {
        tableName: 'ceuas_complemento_recordatorio_alimentar',
        timestamps: false
    })

    ComplementoRecordatorioAlimentar.associate = (models) => {
      /**
      * Relacionamento com a tabela de consultas
      * @see module:models/Consulta
      */
      ComplementoRecordatorioAlimentar.belongsTo(models.Consulta, {
        as:'consulta',
        foreignKey: 'consultaId'
      })
    }
    return ComplementoRecordatorioAlimentar
}
