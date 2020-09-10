/**
 * @title Descritores GraphQL para as operações sobre a tabela de escolaridade
 * @module src/schemas/escolaridade
 * @author Josafá Santos dos Reis
 */
export default `
  type Escolaridade {
    id: ID
    nome: String
  }

  type Query {
    escolaridades: [Escolaridade]
    escolaridade(id: ID!): Escolaridade
  }

  type Mutation {
    createEscolaridade(nome: String): Escolaridade
    updateEscolaridade(id: ID!, nome: String): Escolaridade
    deleteEscolaridade(id: ID!): Int
  }
`
