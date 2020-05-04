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
        tipoQueixaId: {
            type: DataTypes.INTEGER,
            field: 'tipo_queixa_id'
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
    //     Queixa.belongsTo(models.ConsultaQueixa, {
    //         as:'consulta_queixa',
    //         foreignKey: 'queixaId'
    //     })
    // }; 
    return Queixa;
 };
