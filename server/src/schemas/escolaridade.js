/**
 * @file Descritores GraphQL para as operações sobre a tabela de escolaridade
 * @module schemas/escolaridade
 * @author Josafá Santos
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
