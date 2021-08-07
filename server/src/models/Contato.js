/**
 * @description Mapeamento da tabela de contato
 * @module src/models/Contato
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const Contato = sequelize.define('Contato', {
    celular: {
      type: DataTypes.STRING
    },
    telefone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'E-mail inválido'
        }
      }
    },
    pessoaId: {
      type: DataTypes.UUID,
      field: 'pessoa_id'
    }
  }, {
    tableName: 'gd_contato'
  })

  Contato.associate = (models) => {

    /**
     * Relacionamento com a tabela de pessoas
     * @see module: src/models/Pessoa
     */
    Contato.belongsTo(models.Pessoa, {
      as: 'pessoa',
      foreignKey: 'pessoaId'
    })
  }

  return Contato
}
