/**
 * @file Descritores GraphQL para as operações sobre a tabela de tipos de logradouro
 * @module schemas/tipo-logradouro
 * @author Josafá Santos
 */
export default `
  type TipoLogradouro {
    id: ID
    nome: String
  }

  type Query {
    tiposLogradouro: [TipoLogradouro]
    tipoLogradouro(id: ID!): TipoLogradouro
  }

  type Mutation {
    createTipoLogradouro(nome: String): TipoLogradouro
    updateTipoLogradouro(id: ID!, nome: String): TipoLogradouro
    deleteTipoLogradouro(id: ID!): Int
  }
`
