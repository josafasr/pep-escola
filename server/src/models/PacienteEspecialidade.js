/**
 * @description Mapeamento do relacionamento (M:M) entre as tabelas de pacientes e especialidades
 * @module src/models/PacienteEspecialidade
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const PacienteEspecialidade = sequelize.define('PacienteEspecialidade', {

    pacienteId: {
      type: DataTypes.UUID,
      field: 'paciente_id',
      references: {
        model: 'paciente',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    especialidadeId: {
      type: DataTypes.INTEGER,
      field: 'especialidade_id',
      references: {
        model: 'especialidade',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {
    tableName: 'ceuas_paciente_especialidade',
    timestamps: false
  })

  return PacienteEspecialidade
}