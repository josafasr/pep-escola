/**
 * @title Mapeamento do relacionamento (M:M) entre pacientes e patologias
 * @module src/models/PacienteAntecedentePatologico
 * @author Marcos Porto, Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const PacienteAntecedentePatologico = sequelize.define('PacienteAntecedentePatologico', {
    pacienteId: {
      type: DataTypes.INTEGER,
      field: 'paciente_id'
    },
    patologiaId: {
      type: DataTypes.INTEGER,
      field: 'patologia_id'
    }
  }, {
    schema: 'ceuas',
    tableName: 'paciente_antecedente_patologico'
  })
  
  return PacienteAntecedentePatologico
}
