/**
 * @file Descritores GraphQL para as operações sobre a tabela de pais
 * @module schemas/pais
 * @author Josafá Santos
 */
export default `
  type Pais {
    id: ID
    nome: String
    sigla: String
  }

  type Query {
    pais(id: ID!): Pais
    paises: [Pais]
  }

  type Mutation {
    createPais(nome: String, sigla: String): Pais
    updatePais(id: ID!, nome: String, sigla: String): Pais
    deletePais(id: ID!): Int
  }
`
