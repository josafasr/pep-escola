/**
 * @file Mapeamento da tabela de agendamento
 * @module models/Agendamento
 * @author Marcos Porto
 */

export default (sequelize, DataTypes) =>{
    const Agendamento = sequelize.define('Agendamento',{
        insercao: {
            type: DataTypes.BOOLEAN
        },
        retorno: {
            type: DataTypes.BOOLEAN,
        },
        ambulatorio: {
            type: DataTypes.STRING,
            field: 'tipo_queixa_id'
        },
        data_horario: {
            type: DataTypes.DATE,
        },
        confirmado: {
            type: DataTypes.BOOLEAN,
        },
        status: {
            type: DataTypes.ENUM,
            values: ['Ausente', 'Falta', 'Em atendimento','Atendido']
        },
        cancelado: {
            type: DataTypes.BOOLEAN,
        },
         pacienteId: {
             type: DataTypes.INTEGER,
             field: 'paciente_id'
         },
         usuarioId: {
             type: DataTypes.INTEGER,
             field: 'usuario_id'
         }
    },
    {
        schema: 'ceuas',
        tableName: 'agendamento'
    });

       Agendamento.associate = (models) => {
             /**
      * Relacionamento com a tabela de Paciente
      * @see {@link Paciente}
          */
         Agendamento.belongsTo(models.Paciente, {
             as:'paciente',
             foreignKey: 'pacienteId'
         })

             /**
      * Relacionamento com a tabela de Usuario
      * @see {@link Usuario}
      */
         Agendamento.belongsTo(models.Usuario, {
             as:'usuario',
             foreignKey: 'usuarioId'
         })

    }; 
    return Agendamento;
 };