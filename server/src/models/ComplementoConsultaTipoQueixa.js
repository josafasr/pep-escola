/**
 * @description Mapeamento da tabela de complemento das quaixas na consulta
 * @module src/models/ComplementoConsultaTipoQueixa
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
    const ComplementoConsultaTipoQueixa = sequelize.define('ComplementoConsultaTipoQueixa', {
      complemento: DataTypes.TEXT,
      consultaId: {
        type: DataTypes.UUID,
        field: 'consulta_id'
      },
      tipoQueixaId: {
        type: DataTypes.INTEGER,
        field: 'tipo_queixa_id'
      }
    }, {
      tableName: 'ceuas_complemento_consulta_tipo_queixa',
      timestamps: false
    })

    ComplementoConsultaTipoQueixa.associate = (models) => {
      /**
       * Relacionamento com a tabela de consultas
       * @see module: src/models/Consulta
       */
      ComplementoConsultaTipoQueixa.belongsTo(models.Consulta, {
        as: 'consulta',
        foreignKey: 'consultaId'
      }),

      /**
       * Relacionamento com a tabela de tipos de queixas
       * @see module: src/models/TipoQueixa
       */
       ComplementoConsultaTipoQueixa.belongsTo(models.TipoQueixa, {
        as: 'tipoQueixa',
        foreignKey: 'tipoQueixaId'
      })
    }
    
    return ComplementoConsultaTipoQueixa
  }
