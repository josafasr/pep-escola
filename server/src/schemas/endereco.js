/**
 * @file Descritores GraphQL para as operações sobre a tabela de endereços
 * @module src/schemas/endereco
 * @author Josafá Santos
 */
export default `

  type Endereco {
    id: ID
    tipoLogradouro: TipoLogradouro
    logradouro: String
    numero: String
    bairro: String
    complemento: String
    cep: String
    cidade: Cidade
    ativo: Boolean
  }

  type Query {
    enderecos: [Endereco]
    endereco(id: ID!): Endereco
  }

  type EnderecoResponse {
    ok: Boolean
    endereco: Endereco
    errors: [Error]
  }

  type Mutation {
    createEndereco(
      tipoLogradouroId: Int,
      logradouro: String,
      numero: Int,
      bairro: String,
      complemento: String,
      cep: String,
      cidadeId: Int,
      ativo: Boolean
    ): EnderecoResponse

    updateEndereco(
      id: ID!,
      tipoLogradouroId: Int,
      logradouro: String,
      numero: Int,
      bairro: String,
      complemento: String,
      cep: String,
      cidadeId: Int,
      ativo: Boolean
    ): EnderecoResponse

    deleteEndereco(id: ID!): Boolean
  }
`
