/**
 * @description Mapeamento do relacionamento (M:M) entre pessoas e endereços
 * @module src/models/PessoaEndereco
 * @author Josafá Santos dos Reis
 */
export default (sequelize, DataTypes) => {
  const PessoaEndereco = sequelize.define('PessoaEndereco', {

    pessoaId: {
      type: DataTypes.UUID,
      field: 'pessoa_id'
    },
    enderecoId: {
      type: DataTypes.INTEGER,
      field: 'endereco_id'
    }
  }, {
    tableName: 'dg_pessoa_endereco',
    timestamps: false
  });

  return PessoaEndereco;
};
