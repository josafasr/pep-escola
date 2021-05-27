/**
 * @description Mapeamento da tabela de complemento do exame físico na consulta
 * @module src/models/ComplementoConsultaExameFisico
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
    const ComplementoConsultaExameFisico = sequelize.define('ComplementoConsultaExameFisico', {
      complemento: DataTypes.TEXT,
      consultaId: {
        type: DataTypes.INTEGER,
        field: 'consulta_id'
      },
      tipoExameFisicoId: {
        type: DataTypes.INTEGER,
        field: 'tipo_exame_fisico_id'
      }
    }, {
      schema: 'ceuas',
      tableName: 'complemento_consulta_tipo_queixa',
      timestamps: false
    })

    ComplementoConsultaExameFisico.associate = (models) => {
      /**
       * Relacionamento com a tabela de consultas
       * @see module: src/models/Consulta
       */
      ComplementoConsultaExameFisico.belongsTo(models.Consulta, {
        as: 'consulta',
        foreignKey: 'consultaId'
      }),

      /**
       * Relacionamento com a tabela de tipos de exames físicos
       * @see module: src/models/ExameFisico
       */
       ComplementoConsultaExameFisico.belongsTo(models.TipoExameFisico, {
        as: 'tipoExameFisico',
        foreignKey: 'tipoExameFisicoId'
      })
    }
    
    return ComplementoConsultaExameFisico
  }
