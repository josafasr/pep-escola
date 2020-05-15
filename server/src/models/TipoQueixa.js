/**
 * @file Mapeamento da tabela de tipos de queixa
 * @module src/models/TipoQueixa
 * @author Marcos Porto
 */

export default (sequelize, DataTypes) => {
    const TipoQueixa = sequelize.define('TipoQueixa', {
        nome: {
            type: DataTypes.STRING
        },
        descricao: {
            type: DataTypes.STRING
        }
    },
        {
            schema: 'ceuas',
            tableName: 'tipo_queixa'
        
    });

 TipoQueixa.associate = (models) => {
     /**
      * Relacionamento com a tabela de queixa 
      * @see module:models/Queixa
     */
    TipoQueixa.hasMany(models.Queixa, {
         as: 'queixa',
         foreignKey: 'tipoQueixaId'
     })
    };
     return TipoQueixa;
 };