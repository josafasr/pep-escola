/**
 * @title Descritores GraphQL para as operações sobre a tabela de tempo de estudo
 * @module src/schemas/tempo-estudo
 * @author Josafá Santos dos Reis
 */
export default `
  type TempoEstudo {
    id: ID
    nome: String
  }

  type Query {
    temposEstudo: [TempoEstudo]
    tempoEstudo(id: ID!): TempoEstudo
  }

  type Mutation {
    createTempoEstudo(nome: String): TempoEstudo
    updateTempoEstudo(id: ID!, nome: String): TempoEstudo
    deleteTempoEstudo(id: ID!): Boolean
  }
`
