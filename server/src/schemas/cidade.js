/**
 * @file Descritores GraphQL para as operações sobre a tabela de cidades
 * @module schemas/cidade
 * @author Josafá Santos
 */
export default `
  type Cidade {
    id: ID
    nome: String
    codigoIBGE: String
    estado: Estado
  }

  type Query {
    cidade(id: ID!): Cidade
    cidades: [Cidade]
  }

  type Mutation {
    createCidade(nome: String, codigoIBGE: String, estadoId: Int): Cidade
    updateCidade(id: ID!, nome: String, codigoIBGE: String, estadoId: Int): Cidade
    deleteCidade(id: ID!): Int
  }
`
