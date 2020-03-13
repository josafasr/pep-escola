/**
 * @file Descritores GraphQL para as operações sobre a tabela de endereços
 * @module schemas/endereco
 * @author Josafá Santos
 */
export default `

  type Endereco {
    id: ID
    nome: String
    bairro: String
    complemento: String
    cep: String
    telefone: String
    telefoneOutro: String
    tipoLogradouro: TipoLogradouro
    cidade: Cidade
  }

  type Query {
    enderecos: [Endereco]
    endereco(id: ID!): Endereco
  }

  type Mutation {
    createEndereco(
      nome: String!,
      bairro: String,
      complemento: String,
      cep: String,
      telefone: String,
      telefoneOutro: String,
      tipoLogradouroId: Int,
      cidadeId: Int
    ): Endereco

    updateEndereco(
      id: ID!,
      nome: String,
      bairro: String,
      complemento: String,
      cep: String,
      telefone: String,
      telefoneOutro: String,
      tipoLogradouroId: Int,
      cidadeId: Int
    ): Endereco

    deleteEndereco(id: ID!): Int
  }
`
