/**
 * @description Mapeamento da tabela de Queixa
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
        tableName: 'ceuas_queixa',
        timestamps: false
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
        as:'consultas',
        foreignKey: 'queixaId',
        otherKey: 'consultaId'
      }),

      /**
      * Relacionamento com a tabela de consultas
      * @see module:models/Consulta
      */
      Queixa.hasMany(models.Consulta, {
        as:'queixaPrincipalConsultas',
        foreignKey: 'queixaPrincipalId'
      })

      /* Queixa.hasMany(models.ConsultaQueixa, {
        as:'queixaConsultas',
        foreignKey: 'queixaId'
      }) */
    };
    return Queixa;
 };
