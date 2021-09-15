/**
 * @description Mapeamento da tabela de tipos de queixa
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
            tableName: 'ceuas_tipo_queixa',
            timestamps: false
    });

    TipoQueixa.associate = (models) => {
        /**
         * Relacionamento com a tabela de queixa 
         * @see module:models/Queixa
         */
        TipoQueixa.hasMany(models.Queixa, {
            as: 'queixas',
            foreignKey: 'tipoQueixaId'
        }),

        /**
         * Relacionamento com a tabela de complemento de queixas
         * @see module: src/models/ComplementoConsultaTipoQueixa
         */
        TipoQueixa.hasMany(models.ComplementoConsultaTipoQueixa, {
            as: 'complmentosConsultas',
            foreignKey: 'tipoQueixaId'
        })
    };
    
     return TipoQueixa;
 };