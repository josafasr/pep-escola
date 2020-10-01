/**
 * @title Mapeamento da tabela de exame físico
 * @module src/models/ExameFisico
 * @author Marcos Porto, Josafá Santos dos Reis
 */

export default (sequelize, DataTypes) => {
  const ExameFisico = sequelize.define('ExameFisico', {
    nome: {
        type: DataTypes.STRING
    },
    tipoQueixaId: {
        type: DataTypes.INTEGER,
        field: 'tipo_queixa_id'
    }
  },
  {
    schema: 'ceuas',
    tableName: 'exame_fisico',
    timestamps: false
  });

  ExameFisico.associate = (models) => {
    /**
    * Relacionamento com a tabela de tipos de exame físico
    * @see module:src/models/TipoExameFisico
    */
    ExameFisico.belongsTo(models.TipoExameFisico, {
      as:'tipoExameFisico',
      foreignKey: 'tipoExameFisicoId'
    }),

    /**
    * Relacionamento (M:M) com a tabela de consultas
    * @see module:src/models/Consulta
    */
    ExameFisico.belongsToMany(models.Consulta, {
      through: models.ConsultaExameFisico,
      as:'consultas',
      foreignKey: 'exameFisicoId',
      otherKey: 'consultaId'
    })
  }

  return ExameFisico
 }
