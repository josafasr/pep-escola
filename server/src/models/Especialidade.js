/**
 * @description Mapeamento da tabela de especialidade
 * @module src/models/Especialidade
 * @author Marcos Porto
 */

export default (sequelize, DataTypes) => {
  const Especialidade = sequelize.define('Especialidade', {
    nome: {
      type: DataTypes.STRING
    },
    descricao: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'ceuas_especialidade'
  });

  Especialidade.associate = (models) => {
   /**
    * Relacionamento com a tabela de pacientes 
    * @see module:models/Paciente
   */
  Especialidade.belongsToMany(models.Paciente, {
    through: models.PacienteEspecialidade,
    as: 'pacientes',
    foreignKey: 'especialidadeId',
    otherKey: 'pacienteId'
   })
  }
  return Especialidade
 }