/**
 * @file Mapeamento do relacionamento (M:M) entre pessoas e endereços
 * @module src/models/PessoaEndereco
 * @author Josafá Santos
 */
export default (sequelize, DataTypes) => {
  const PessoaEndereco = sequelize.define('PessoaEndereco', {

    pessoaId: {
      type: DataTypes.INTEGER,
      field: 'pessoa_id',
      references: {
        model: 'pessoa',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    enderecoId: {
      type: DataTypes.INTEGER,
      field: 'endereco_id',
      references: {
        model: 'endereco',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {
    schema: 'dados_gerais',
    tableName: 'pessoa_endereco',
    timestamps: false
  });

  return PessoaEndereco;
};
