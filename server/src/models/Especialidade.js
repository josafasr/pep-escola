/**
 * @file Mapeamento da tabela de especialidade
 * @module models/Especialidade
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
            schema: 'ceuas',
            tableName: 'especialidade'
        
    });

    // Especialidade.associate = (models) => {
    //  /**
    //   * Relacionamento com a tabela de paciente_especialidade 
    //   * @see module:models/PacienteEspecialidade
    //  */
    // Especialidade.hasMany(models.PacienteEspecialidade, {
    //      as: 'paciente_especialidade',
    //      foreignKey: 'especialidadeId'
    //  })
    // };
     return Especialidade;
 };