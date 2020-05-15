/**
 * @file Mapeamento da tabela de pessoas
 * @module src/models/Pessoa
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const Pessoa = sequelize.define('Pessoa', {
    nome: {
      type: DataTypes.STRING
    },
    dataNascimento: {
      type: DataTypes.DATE,
      field: 'data_nascimento'
    },
    sexo: {
      type: DataTypes.INTEGER
    },
    contatoId: {
      type: DataTypes.INTEGER,
      field: 'contato_id'
    }
  }, {
    schema: 'dados_gerais',
    tableName: 'pessoa'
  });

  Pessoa.associate = (models) => {
    /**
     * Relacionamento com a tabela de contatos
     * @see {@link Contato}
     */
    Pessoa.belongsTo(models.Contato, {
      as: 'contato',
      foreignKey: 'contatoId'
    }),

    /**
     * Relacionamento com a tabela de enderecos
     * @see module:models/Endereco
     */
    Pessoa.belongsToMany(models.Endereco, {
      through: models.PessoaEndereco,
      as: 'enderecos',
      foreignKey: 'pessoaId',
      otherKey: 'enderecoId'
    }),

    /**
     * Relacionamento com a tabela de usuários
     * @see {@link Usuario}
     */
    Pessoa.hasOne(models.Usuario, {
      as: 'usuario',
      foreignKey: 'pessoaId'
    })
  }
  return Pessoa
}
