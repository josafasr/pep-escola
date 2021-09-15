/**
 * @description Mapeamento da tabela de tipos de exame físico
 * @module src/models/TipoExameFisico
 * @author Josafá Santos dos Reis
 */

export default (sequelize, DataTypes) => {
  const TipoExameFisico = sequelize.define('TipoExameFisico', {
    nome: {
      type: DataTypes.STRING
    },
    descricao: {
      type: DataTypes.TEXT
    }
  },
  {
    tableName: 'ceuas_tipo_exame_fisico',
    timestamps: false
  })

  TipoExameFisico.associate = (models) => {
    /**
     * Relacionamento com a tabela de exame físico
     * @see module:src/models/ExameFisico
     */
    TipoExameFisico.hasMany(models.ExameFisico, {
      as: 'examesFisicos',
      foreignKey: 'tipoExameFisicoId'
    })
  }

  return TipoExameFisico
 }