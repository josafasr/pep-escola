/**
 * @file Mapeamento da tabela de Unidades de saúde
 * @module models/UnidadeSaude
 * @author Marcos Porto
 */

 export default (sequelize, DataTypes) => {
    const UnidadeSaude = sequelize.define('UnidadeSaude', {
        nome: {
            type: DataTypes.STRING,
            validate: {
              len: {
                args: [3, 100],
                msg: 'O nome da unidade de saúde deve ter no mínimo 3 carateres'
              }
            }
        },
        cnes: {
            type: DataTypes.STRING,
            validate: {
              len: {
                args: [11, 11],
                msg: 'O nome da cnes deve ter 11 carateres'
              }
            }
        }
      }, 
      {
        schema: 'ceuas',
        tableName: 'unidade_saude'
      });

    //   UnidadeSaude.associate = (models) => {
    //         /**
    //  * Relacionamento com a tabela de paciente
    //  * @see {@link Paciente}
    //  */
    //     UnidadeSaude.belongsTo(models.Paciente, {
    //         as:'paciente',
    //         foreignKey: 'unidadeSaudeId'
    //     })
    // }; 
    return UnidadeSaude;
 };