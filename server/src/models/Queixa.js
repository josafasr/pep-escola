/**
 * @file Mapeamento da tabela de Queixa
 * @module src/models/Queixa
 * @author Marcos Porto, Josafá Santos dos Reis
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

      Queixa.associate = (models) => {
      /**
      * Relacionamento com a tabela de tipos de queixa
      * @see module:models/TipoQueixa
      */
      Queixa.belongsTo(models.TipoQueixa, {
          as:'tipoQueixa',
          foreignKey: 'tipoQueixaId'
      }),

      /**
      * Relacionamento (M:M) com a tabela de consultas
      * @see module:models/Consulta
      */
      Queixa.belongsToMany(models.Consulta, {
        through: models.ConsultaQueixa,
        as:'consulta',
        foreignKey: 'queixaId',
        otherKey: 'consultaId'
      })
    };
    return Queixa;
 };
