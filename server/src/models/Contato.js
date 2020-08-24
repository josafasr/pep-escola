/**
 * @file Mapeamento da tabela de contato
 * @module src/models/Contato
 * @author Josafá Santos
 */
export default (sequelize, DataTypes) => {
  const Contato = sequelize.define('Contato', {
    celular: {
      type: DataTypes.STRING
    },
    telefone: {
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'E-mail inválido'
        }
      }
    }
  }, {
    schema: 'dados_gerais',
    tableName: 'contato'
  });

  Contato.associate = (models) => {

    /**
     * Relacionamento com a tabela de pessoas
     * @see module:models/Pessoa
     */
    Contato.hasOne(models.Pessoa, {
      as: 'pessoa',
      foreignKey: 'contatoId'
    })
  };
  return Contato;
};
