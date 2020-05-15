/**
 * @file Mapeamento da tabela de Recordatorio Alimentar
 * @module src/models/RecordatorioAlimentar
 * @author Marcos Porto, Josafá Santos dos Reis
 */

export default (sequelize, DataTypes) => {
    const RecordatorioAlimentar = sequelize.define('RecordatorioAlimentar', {
        quantidade: DataTypes.INTEGER,
        consultaId: {
          type: DataTypes.INTEGER,
          field: 'consulta_id'
        },
        tipoRefeicaoId: {
          type: DataTypes.INTEGER,
          field: 'tipo_refeicao_id'
        },
        alimentoId: {
          type: DataTypes.INTEGER,
          field: 'alimento_id'
        }
    }, {
        schema: 'ceuas',
        tableName: 'recordatorio_alimentar'
    })

    RecordatorioAlimentar.associate = (models) => {
      /**
      * Relacionamento com a tabela de consultas
      * @see module:models/Consulta
      */
      RecordatorioAlimentar.belongsTo(models.Consulta, {
        as:'consulta',
        foreignKey: 'consultaId'
      }),

      /**
      * Relacionamento com a tabela de tipos de refeição
      * @see module:models/TipoRefeicao
      */
      RecordatorioAlimentar.belongsTo(models.TipoRefeicao, {
        as:'tipoRefeicao',
        foreignKey: 'tipoRefeicaoId'
      }),
      
      /**
      * Relacionamento com a tabela de tipos de alimentos
      * @see module:models/Alimento
      */
      RecordatorioAlimentar.belongsTo(models.Alimento, {
        as:'alimento',
        foreignKey: 'alimentoId'
      })
    }
    return RecordatorioAlimentar
}
