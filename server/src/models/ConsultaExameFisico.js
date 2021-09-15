/**
 * @description Mapeamento do relacionamento (M:M) entre consulta e exame físico
 * @module src/models/ConsultaExameFisico
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const ConsultaExameFisico = sequelize.define('ConsultaExameFisico', {
    consultaId: {
      type: DataTypes.UUID,
      field: 'consulta_id'
    },
    exameFisicoId: {
      type: DataTypes.INTEGER,
      field: 'exame_fisico_id'
    },
    observacao: DataTypes.TEXT
  }, {
    tableName: 'ceuas_consulta_exame_fisico',
    timestamps: false
  })
  
  return ConsultaExameFisico
}
