/**
 * @file Mapeamento da tabela de Patologia
 * @module models/Queixa
 * @author Marcos Porto
 */

export default (sequelize, DataTypes) =>{
    const Patologia = sequelize.define('Patologia',{
        nome: {
            type: DataTypes.STRING
        },
        descricao: {
            type: DataTypes.STRING
        },
        tipoPatologiaId: {
            type: DataTypes.INTEGER,
            field: 'tipo_patologia_id'
        }
    },
    {
        schema: 'ceuas',
        tableName: 'patologia'
    });

    //    Patologia.associate = (models) => {
    //          /**
    //   * Relacionamento com a tabela de antecente patologico
    //   * @see {@link Queixa}
    //   */
    //      Patologia.belongsTo(models.AntecentePatologico, {
    //          as:'antecentePatologico',
    //          foreignKey: 'patologiaId'
    //      })
    //  }; 
    return Patologia;
 };