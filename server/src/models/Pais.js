/**
 * @file Mapeamento da tabela de países
 * @module models/Pais
 * @author Josafá Santos
 */
export default (sequelize, DataTypes) => {
  const Pais = sequelize.define('Pais', {
    nome: {
      type: DataTypes.STRING
    },
    sigla: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 3],
        is: ['[A-Z]', 'i']
      }
    }
  }, {
    schema: 'dados_gerais',
    tableName: 'pais'
  });

  Pais.associate = (models) => {
    /**
     * Relacionamento com a tabela de estados
     * @see module:models/Estado
     */
    Pais.hasMany(models.Estado, {
      as: 'estados',
      foreignKey: 'paisId'
    }),

    /**
     * Relacionamento com a tabela de pessoas
     * @see module:models/Pessoa
     */
    Pais.hasMany(models.Pessoa, {
      as: 'nascidos',
      foreignKey: 'nacionalidadeId'
    })
  };
  return Pais;
};
