/**
 * @file Mapeamento da tabela de tipos de refeição
 * @module src/models/TipoRefeicao
 * @author Marcos Porto
 */

export default (sequelize, DataTypes) => {
    const TipoRefeicao = sequelize.define('TipoRefeicao', {
        nome: {
            type: DataTypes.STRING
        }
    },
        {
            schema: 'ceuas',
            tableName: 'tipo_refeicao'
        
    });

      TipoRefeicao.associate = (models) => {
      /**
       * Relacionamento com a tabela de recordatorio_alimentar 
       * @see module:models/RecordatorioAlimentar
      */
     TipoRefeicao.hasMany(models.RecordatorioAlimentar, {
        as: 'recordatorioAlimentar',
        foreignKey: 'tipoRefeicaoId'
        })
        };
     return TipoRefeicao;
 };