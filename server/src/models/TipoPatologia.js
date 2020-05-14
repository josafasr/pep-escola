/**
 * @file Mapeamento da tabela de tipos de patologia
 * @module models/UnidadeSaude
 * @author Marcos Porto
 */

export default (sequelize, DataTypes) => {
    const TipoPatologia = sequelize.define('TipoPatologia', {
        nome: {
            type: DataTypes.STRING
        },
        descricao: {
            type: DataTypes.STRING
        }
    },
        {
            schema: 'ceuas',
            tableName: 'tipo_patologia'
        
    });

 TipoPatologia.associate = (models) => {
      /**
       * Relacionamento com a tabela de patologia
       * @see module:models/Patologia
      */
     TipoPatologia.hasMany(models.Patologia, {
          as: 'patologia',
          foreignKey: 'tipoPatologiaId'
      })
     };
     return TipoPatologia;
 };