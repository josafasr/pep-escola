/**
 * @file Descritores GraphQL para as operações sobre a tabela de cores de pele
 * @module schemas/cor-pele
 * @author Josafá Santos
 */
export default `
  type CorPele {
    id: ID
    nome: String
  }

  type Query {
    coresPele: [CorPele]
    corPele(id: ID!): CorPele
  }

  type Mutation {
    createCorPele(nome: String): CorPele
    updateCorPele(id: ID!, nome: String): CorPele
    deleteCorPele(id: ID!): Int
  }
`
