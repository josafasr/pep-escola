/**
 * @description Mapeamento do relacionamento entre as tabelas de consultas e antecedentes
 * @module src/models/ConsultaAntecedenteAtributo
 * @author Josafá Santos dos Reis
 */

export default (sequelize, DataTypes) => {
  const ConsultaAntecedenteAtributo = sequelize.define('ConsultaAntecedenteAtributo', {
    atributoValor: {
      type: DataTypes.STRING,
      field: 'atributo_valor'
    },
    consultaId: {
      type: DataTypes.INTEGER,
      field: 'consulta_id'
    },
    antecedenteAtributoId: {
      type: DataTypes.INTEGER,
      field: 'antecedente_atributo_id'
    },
    antecedenteId: {
      type: DataTypes.INTEGER,
      field: 'antecedente_id'
    }
  }, {
    schema: 'ceuas',
    tableName: 'consulta_antecedente_atributo'
  })

  ConsultaAntecedenteAtributo.associate = (models) => {
    /**
     * Relacionamento com a tabela de consultas
     * @see {@link src/models/Consulta}
     */
     ConsultaAntecedenteAtributo.belongsTo(models.Consulta, {
      as: 'consulta',
      foreignKey: 'consultaId'
    }),

    /**
     * Relacionamento com a tabela de atributos de antecedentes
     * @see {@link src/models/AntecedenteAtributo}
     */
    ConsultaAntecedenteAtributo.belongsTo(models.AntecedenteAtributo, {
      as: 'antecedenteAtributo',
      foreignKey: 'antecedenteAtributoId'
    }),

    /**
     * Relacionamento com a tabela de tipos de antecedentes
     * @see {@link src/models/Antecedente}
     */
     ConsultaAntecedenteAtributo.belongsTo(models.Antecedente, {
      as: 'antecedente',
      foreignKey: 'antecedenteId'
    })
  }

  return ConsultaAntecedenteAtributo
}