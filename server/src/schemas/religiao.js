/**
 * @file Descritores GraphQL para as operações sobre a tabela de religiões
 * @module schemas/religiao
 * @author Josafá Santos
 */
export default `
  type Religiao {
    id: ID
    nome: String
  }

  type Query {
    religioes: [Religiao]
    religiao(id: ID!): Religiao
  }

  type Mutation {
    createReligiao(nome: String): Religiao
    updateReligiao(id: ID!, nome: String): Religiao
    deleteReligiao(id: ID!): Int
  }
`
