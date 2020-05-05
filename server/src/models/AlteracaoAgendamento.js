/**
 * @file Mapeamento da tabela de Alteração Agendamento
 * @module models/AlteracaoAgendamento
 * @author Marcos Porto
 */

export default (sequelize, DataTypes) =>{
    const AlteracaoAgendamento = sequelize.define('AlteracaoAgendamento',{
        data_hora_anterior: {
            type: DataTypes.DATE
        },
        data_hora_proxima: {
            type: DataTypes.DATE
        },
        motivo: {
            type: DataTypes.STRING
        },
        agendamentoId: {
            type: DataTypes.INTEGER,
            field: 'agendamento_id'
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            field: 'usuario_id'
        }
    },
    {
        schema: 'ceuas',
        tableName: 'alteracao_agendamento'
    });

    AlteracaoAgendamento.associate = (models) => {
        /**
      * Relacionamento com a tabela de agendamento
      * @see {@link Agendamento}
      */
     AlteracaoAgendamento.belongsTo(models.Agendamento, {
             as:'agendamento',
             foreignKey: 'agendamentoId'
         })

    /**
      * Relacionamento com a tabela de usuario
      * @see {@link Usuario}
      */
     AlteracaoAgendamento.belongsTo(models.Usuario, {
        as:'usuario',
        foreignKey: 'usuarioId'
        })
     }; 
    return AlteracaoAgendamento;
 };