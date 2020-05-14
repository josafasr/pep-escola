/**
 * @file Mapeamento da tabela de Recordatorio Alimentar
 * @module models/RecordatorioAlimentar
 * @author Marcos Porto
 */

export default (sequelize, DataTypes) => {
    const RecordatorioAlimentar = sequelize.define('RecordatorioAlimentar', {
        nome: {
            type: DataTypes.STRING,
        },
        tipoRefeicaoId: {
            type: DataTypes.INTEGER,
            field: 'tipo_refeicao_id'
          }
        },
      {
        schema: 'ceuas',
        tableName: 'recordatorio_alimentar'
      });

     RecordatorioAlimentar.associate = (models) => {
             /**
      * Relacionamento com a tabela de consulta_recordatorio_alimentar
      * @see {@link Paciente}
      */
     RecordatorioAlimentar.belongsTo(models.ConsultaRecordatorioAlimentar, {
             as:'consulta_recordatorio_alimentar',
             foreignKey: 'recordatorioAlimentarId'
         })
     }; 
    return RecordatorioAlimentar;
 };