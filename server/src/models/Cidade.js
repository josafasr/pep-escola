/**
 * @file Mapeamento da tabela de cidades
 * @module src/models/Cidade
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const Cidade = sequelize.define('Cidade', {
    nome: {
      type: DataTypes.STRING
    },
    codigoIBGE: {
      type: DataTypes.STRING,
      field: 'codigo_ibge'
    },
    estadoId: {
      type: DataTypes.INTEGER,
      field: 'estado_id'
    }
  }, {
    schema: 'dados_gerais',
    tableName: 'cidade'
  });

  Cidade.associate = (models) => {
    /**
     * Relacionamento com a tabela de estados
     * @see module:models/Estado
     */
    Cidade.belongsTo(models.Estado, {
      as: 'estado',
      foreignKey: 'estadoId'
    }),

    /**
     * Relacionamento com a tabela de pacientes
     * @see module:models/Paciente
     */
    Cidade.hasMany(models.Paciente, {
      as: 'naturais',
      foreignKey: 'naturalidadeId'
    })
  };
  return Cidade;
};
