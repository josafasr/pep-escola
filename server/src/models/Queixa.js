/**
 * @file Mapeamento da tabela de Queixa
 * @module models/Queixa
 * @author Marcos Porto
 */

 export default (sequelize, DataTypes) =>{
    const Queixa = sequelize.define('Queixa',{
        nome: {
            type: DataTypes.STRING
        },
        tipo_queixa_id: {
            type: DataTypes.INTEGER
        }
    },
    {
        schema: 'ceuas',
        tableName: 'queixa'
    });

    //   Queixa.associate = (models) => {
    //         /**
    //  * Relacionamento com a tabela de Queixa
    //  * @see {@link Queixa}
    //  */
    //     Queixa.belongsTo(models.Paciente, {
    //         as:'consulta_queixa',
    //         foreignKey: 'queixaId'
    //     })
    // }; 
    return Queixa;
 };